/**
 * FinFlow Pro - Main Application Controller
 * Handles UI interactions, tab switching, modals, filters, and rendering.
 * Fully integrated with i18n for English, Urdu, and Sindhi.
 */

class FinFlowApp {
  constructor() {
    this.store = window.finFlowStore;
    this.models = window.FinFlowModels;
    this.charts = window.finFlowCharts;
    this.i18n = window.FinFlowI18n;
    this.currentTab = 'dashboard';
    this.currentPeriod = 'all';
    this.incomeFilter = 'all';
    this.expenseFilter = 'all';
    this.searchQuery = '';

    this.init();
  }

  t(key, fallback = '') {
    return this.i18n ? this.i18n.t(key, fallback) : fallback;
  }

  init() {
    this.setupTheme();
    if (this.i18n) this.i18n.init();
    this.bindEvents();
    this.store.subscribe(() => {
      this.render();
    });
    this.render();
  }

  setupTheme() {
    const savedTheme = this.store.data.settings.theme || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = savedTheme === 'dark' 
        ? '<i class="fa-solid fa-sun text-amber-400"></i>' 
        : '<i class="fa-solid fa-moon text-indigo-400"></i>';
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    this.store.updateSettings({ theme: newTheme });
    this.setupTheme();
    this.charts.updateAll(this.store.data);
    this.showToast(this.t('settingsTitle') + `: ${newTheme}`, 'info');
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-indigo-600';
    const icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info';

    toast.className = `fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-white text-sm font-medium ${bg} transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

  triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#6366f1', '#06b6d4', '#f59e0b']
      });
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('bg-emerald-500/10', 'text-emerald-400', 'font-semibold', 'border-emerald-500');
        btn.classList.remove('text-slate-400', 'border-transparent');
      } else {
        btn.classList.remove('bg-emerald-500/10', 'text-emerald-400', 'font-semibold', 'border-emerald-500');
        btn.classList.add('text-slate-400', 'border-transparent');
      }
    });

    if (tabId === 'dashboard') {
      setTimeout(() => this.charts.updateAll(this.store.data), 50);
    }
  }

  bindEvents() {
    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Language switcher buttons
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-btn');
        if (this.i18n) {
          this.i18n.setLanguage(lang);
        }
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Period switcher
    const periodSelect = document.getElementById('periodFilterSelect');
    if (periodSelect) {
      periodSelect.addEventListener('change', (e) => {
        this.currentPeriod = e.target.value;
        this.render();
      });
    }

    // Search bar
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderRecentTransactions();
        if (this.currentTab === 'incomes') this.renderIncomesTable();
        if (this.currentTab === 'expenses') this.renderExpensesTable();
      });
    }

    // Modal listeners
    this.setupModals();

    // Hotkey: Escape to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  setupModals() {
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-open-modal');
        this.openModal(modalId);
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    document.querySelectorAll('.modal-wrapper').forEach(wrapper => {
      wrapper.addEventListener('click', (e) => {
        if (e.target === wrapper) {
          this.closeAllModals();
        }
      });
    });

    // Income Form Submit
    const incomeForm = document.getElementById('incomeForm');
    if (incomeForm) {
      incomeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(incomeForm);
        const newInc = {
          client: formData.get('client'),
          project: formData.get('project'),
          type: formData.get('type'),
          amount: parseFloat(formData.get('amount')) || 0,
          currency: this.store.data.settings.currency || 'PKR',
          date: formData.get('date'),
          status: formData.get('status'),
          platform: formData.get('platform'),
          invoiceNumber: formData.get('invoiceNumber') || `INV-${Date.now().toString().slice(-4)}`,
          notes: formData.get('notes')
        };
        this.store.addIncome(newInc);
        this.closeAllModals();
        incomeForm.reset();
        this.showToast(this.t('modalAddIncomeTitle') + ' ✓');
        this.triggerConfetti();
      });
    }

    // Expense Form Submit
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
      expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(expenseForm);
        const isDeductible = formData.get('taxDeductible') === 'on';
        const newExp = {
          title: formData.get('title'),
          category: formData.get('category'),
          amount: parseFloat(formData.get('amount')) || 0,
          date: formData.get('date'),
          taxDeductible: isDeductible,
          deductiblePercent: isDeductible ? (parseInt(formData.get('deductiblePercent')) || 100) : 0,
          paymentMethod: formData.get('paymentMethod'),
          recurring: formData.get('recurring'),
          notes: formData.get('notes')
        };
        this.store.addExpense(newExp);
        this.closeAllModals();
        expenseForm.reset();
        this.showToast(this.t('modalAddExpenseTitle') + ' ✓');
      });
    }

    // Loan Form Submit
    const loanForm = document.getElementById('loanForm');
    if (loanForm) {
      loanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(loanForm);
        const principal = parseFloat(formData.get('principal')) || 0;
        const newLoan = {
          title: formData.get('title'),
          type: formData.get('type'),
          lenderOrBorrower: formData.get('lenderOrBorrower'),
          principal: principal,
          balance: principal,
          monthlyPayment: parseFloat(formData.get('monthlyPayment')) || 0,
          interestRate: parseFloat(formData.get('interestRate')) || 0,
          startDate: formData.get('startDate'),
          endDate: formData.get('endDate'),
          status: "Active",
          notes: formData.get('notes')
        };
        this.store.addLoan(newLoan);
        this.closeAllModals();
        loanForm.reset();
        this.showToast(this.t('btnAddLoan') + ' ✓');
      });
    }

    // Goal Form Submit
    const goalForm = document.getElementById('goalForm');
    if (goalForm) {
      goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(goalForm);
        const newGoal = {
          title: formData.get('title'),
          category: formData.get('category'),
          targetAmount: parseFloat(formData.get('targetAmount')) || 0,
          currentAmount: parseFloat(formData.get('currentAmount')) || 0,
          targetDate: formData.get('targetDate'),
          icon: formData.get('icon') || 'fa-piggy-bank',
          color: formData.get('color') || '#10b981'
        };
        this.store.addGoal(newGoal);
        this.closeAllModals();
        goalForm.reset();
        this.showToast(this.t('btnAddGoal') + ' ✓');
      });
    }

    // Budget Form Submit
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
      budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(budgetForm);
        const newBudget = {
          category: formData.get('category'),
          monthlyLimit: parseFloat(formData.get('monthlyLimit')) || 0,
          color: formData.get('color') || '#6366f1'
        };
        this.store.addBudget(newBudget);
        this.closeAllModals();
        budgetForm.reset();
        this.showToast(this.t('btnAddBudget') + ' ✓');
      });
    }

    // Invoice Form Submit
    const invoiceForm = document.getElementById('invoiceForm');
    if (invoiceForm) {
      invoiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreateInvoiceSubmit();
      });
    }

    // Loan Payment Form Submit
    const loanPaymentForm = document.getElementById('loanPaymentForm');
    if (loanPaymentForm) {
      loanPaymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loanId = document.getElementById('payLoanId').value;
        const amount = parseFloat(document.getElementById('payLoanAmount').value) || 0;
        this.store.recordLoanPayment(loanId, amount);
        this.closeAllModals();
        loanPaymentForm.reset();
        this.showToast(this.t('btnConfirmPayment') + ' ✓');
        this.triggerConfetti();
      });
    }

    // Settings Form Submit
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currency = document.getElementById('settingCurrency').value;
        const taxRate = parseFloat(document.getElementById('settingTaxRate').value) || 15;
        const freelancerName = document.getElementById('settingFreelancerName').value;
        const businessName = document.getElementById('settingBusinessName').value;
        const email = document.getElementById('settingEmail').value;
        const avgBurn = parseFloat(document.getElementById('settingAvgBurn').value) || 180000;

        const currInfo = this.models.CURRENCIES[currency] || { symbol: '₨' };

        this.store.updateSettings({
          currency,
          currencySymbol: currInfo.symbol,
          taxRate,
          freelancerName,
          businessName,
          email,
          avgMonthlyLivingExpense: avgBurn
        });

        this.showToast(this.t('btnSavePreferences') + ' ✓');
      });
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  closeAllModals() {
    document.querySelectorAll('.modal-wrapper').forEach(m => {
      m.classList.add('hidden');
      m.classList.remove('flex');
    });
  }

  render() {
    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    const kpis = this.models.calculateKPIs(data, this.currentPeriod);

    if (this.i18n) this.i18n.translateDOM();

    // Profile header
    const headerName = document.getElementById('headerFreelancerName');
    if (headerName) headerName.textContent = data.settings.freelancerName || 'Mazhar';
    const headerBusiness = document.getElementById('headerBusinessName');
    if (headerBusiness) headerBusiness.textContent = data.settings.businessName || "Mazhar's Finances";

    // Dashboard Top KPIs
    this.updateElementText('kpiGrossIncome', this.models.formatCurrency(kpis.grossPaidIncome, currency));
    this.updateElementText('kpiTotalExpenses', this.models.formatCurrency(kpis.totalExpenses, currency));
    this.updateElementText('kpiNetCash', this.models.formatCurrency(kpis.netProfit, currency));
    this.updateElementText('kpiPendingReceivable', this.models.formatCurrency(kpis.pendingIncome, currency));
    this.updateElementText('kpiTaxReserve', this.models.formatCurrency(kpis.estimatedTaxReserve, currency));
    this.updateElementText('kpiTaxSavings', this.models.formatCurrency(kpis.taxSavingsFromWriteOffs, currency));
    this.updateElementText('kpiRunwayMonths', `${kpis.runwayMonths} mo`);
    this.updateElementText('kpiDebtLiability', this.models.formatCurrency(kpis.totalDebtLiability, currency));

    // Health Score
    const healthBadge = document.getElementById('kpiHealthScore');
    if (healthBadge) {
      healthBadge.textContent = `${kpis.healthScore}/100`;
      const healthBar = document.getElementById('kpiHealthProgressBar');
      if (healthBar) healthBar.style.width = `${kpis.healthScore}%`;
      const healthLabel = document.getElementById('kpiHealthLabel');
      if (healthLabel) {
        if (kpis.healthScore >= 80) {
          healthLabel.textContent = this.t('healthExcellent', 'Excellent Stability');
          healthLabel.className = "text-xs font-semibold text-emerald-400";
        } else if (kpis.healthScore >= 60) {
          healthLabel.textContent = this.t('healthGood', 'Healthy Cashflow');
          healthLabel.className = "text-xs font-semibold text-cyan-400";
        } else if (kpis.healthScore >= 40) {
          healthLabel.textContent = this.t('healthModerate', 'Moderate - Watch Expenses');
          healthLabel.className = "text-xs font-semibold text-amber-400";
        } else {
          healthLabel.textContent = this.t('healthWarning', 'Cushion Recommended');
          healthLabel.className = "text-xs font-semibold text-rose-400";
        }
      }
    }

    // Subviews
    this.renderRecentTransactions();
    this.renderIncomesTable();
    this.renderExpensesTable();
    this.renderInvoicesView();
    this.renderBudgetsView();
    this.renderLoansView();
    this.renderGoalsView();
    this.renderTaxVaultView(kpis);
    this.populateSettingsForm();

    this.charts.updateAll(data);
  }

  updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  renderRecentTransactions() {
    const container = document.getElementById('recentTransactionsList');
    if (!container) return;

    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    const transactions = [];

    data.incomes.forEach(i => {
      transactions.push({
        id: i.id,
        type: 'income',
        title: `${i.client} - ${i.project}`,
        category: i.type,
        amount: i.amount,
        date: i.date,
        status: i.status === 'Paid' ? this.t('statusPaid', 'Paid') : this.t('statusPending', 'Pending'),
        icon: 'fa-arrow-down-left',
        iconColor: 'text-emerald-400 bg-emerald-500/10'
      });
    });

    data.expenses.forEach(e => {
      transactions.push({
        id: e.id,
        type: 'expense',
        title: e.title,
        category: e.category,
        amount: e.amount,
        date: e.date,
        status: e.taxDeductible ? `${this.t('writeOffBadge', 'Write-Off')} (${e.deductiblePercent}%)` : this.t('personalNonDeductible', 'Personal'),
        icon: 'fa-arrow-up-right',
        iconColor: 'text-rose-400 bg-rose-500/10'
      });
    });

    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const filtered = this.searchQuery
      ? transactions.filter(t => t.title.toLowerCase().includes(this.searchQuery) || t.category.toLowerCase().includes(this.searchQuery))
      : transactions.slice(0, 8);

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-slate-500">${this.t('noTransactions', 'No transactions recorded yet.')}</div>`;
      return;
    }

    container.innerHTML = filtered.map(t => {
      const isInc = t.type === 'income';
      const sign = isInc ? '+' : '-';
      const amtClass = isInc ? 'text-emerald-400 font-semibold' : 'text-slate-200 font-medium';
      return `
        <div class="flex items-center justify-between p-3.5 hover:bg-white/[0.03] transition-colors rounded-xl border border-transparent hover:border-slate-800">
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${t.iconColor} text-sm">
              <i class="fa-solid ${t.icon}"></i>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-100 line-clamp-1">${t.title}</p>
              <div class="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                <span>${t.category}</span>
                <span>•</span>
                <span>${this.models.formatDate(t.date)}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] ${isInc ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-300'}">${t.status}</span>
              </div>
            </div>
          </div>
          <div class="text-right font-numeric text-sm ${amtClass}">
            ${sign}${this.models.formatCurrency(t.amount, currency)}
          </div>
        </div>
      `;
    }).join('');
  }

  renderIncomesTable() {
    const tbody = document.getElementById('incomesTableBody');
    if (!tbody) return;

    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    let incomes = [...data.incomes];

    if (this.searchQuery) {
      incomes = incomes.filter(i => 
        i.client.toLowerCase().includes(this.searchQuery) ||
        i.project.toLowerCase().includes(this.searchQuery) ||
        (i.invoiceNumber && i.invoiceNumber.toLowerCase().includes(this.searchQuery))
      );
    }

    if (this.incomeFilter !== 'all') {
      incomes = incomes.filter(i => i.status.toLowerCase() === this.incomeFilter.toLowerCase() || i.type.toLowerCase() === this.incomeFilter.toLowerCase());
    }

    if (incomes.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">${this.t('noTransactions', 'No records found')}</td></tr>`;
      return;
    }

    tbody.innerHTML = incomes.map(inc => {
      const isPaid = inc.status === 'Paid';
      const statusBadge = isPaid 
        ? `<span class="badge-status bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"><i class="fa-solid fa-check text-[10px]"></i> ${this.t('statusPaid', 'Paid')}</span>`
        : inc.status === 'Overdue'
        ? `<span class="badge-status bg-rose-500/15 text-rose-400 border border-rose-500/20"><i class="fa-solid fa-clock text-[10px]"></i> ${this.t('statusOverdue', 'Overdue')}</span>`
        : `<span class="badge-status bg-amber-500/15 text-amber-400 border border-amber-500/20"><i class="fa-solid fa-hourglass-half text-[10px]"></i> ${this.t('statusPending', 'Pending')}</span>`;

      return `
        <tr class="border-b border-slate-800/60 hover:bg-white/[0.02] transition-colors text-sm">
          <td class="py-3.5 px-4 font-medium text-slate-100">
            <div>${inc.client}</div>
            <div class="text-xs text-slate-400 font-normal">${inc.project}</div>
          </td>
          <td class="py-3.5 px-4">
            <span class="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">${inc.type}</span>
          </td>
          <td class="py-3.5 px-4 text-slate-300 text-xs">
            <div>${inc.platform || 'Direct'}</div>
            <div class="text-[11px] text-slate-500 font-numeric">${inc.invoiceNumber || '-'}</div>
          </td>
          <td class="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
            ${this.models.formatDate(inc.date)}
          </td>
          <td class="py-3.5 px-4 font-numeric font-semibold text-emerald-400 whitespace-nowrap">
            +${this.models.formatCurrency(inc.amount, currency)}
          </td>
          <td class="py-3.5 px-4 whitespace-nowrap">
            ${statusBadge}
          </td>
          <td class="py-3.5 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              ${!isPaid ? `
                <button onclick="window.finFlowApp.markIncomePaid('${inc.id}')" title="${this.t('btnMarkPaid', 'Mark Paid')}" class="p-1.5 text-xs text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors">
                  <i class="fa-solid fa-check-double"></i>
                </button>
              ` : ''}
              <button onclick="window.finFlowApp.deleteIncome('${inc.id}')" title="Delete" class="p-1.5 text-xs text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  markIncomePaid(id) {
    this.store.updateIncome(id, { status: 'Paid' });
    this.showToast(this.t('statusPaid', 'Paid') + ' ✓');
    this.triggerConfetti();
  }

  deleteIncome(id) {
    if (confirm('Delete this income entry?')) {
      this.store.deleteIncome(id);
      this.showToast('Removed', 'info');
    }
  }

  renderExpensesTable() {
    const tbody = document.getElementById('expensesTableBody');
    if (!tbody) return;

    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    let expenses = [...data.expenses];

    if (this.searchQuery) {
      expenses = expenses.filter(e => 
        e.title.toLowerCase().includes(this.searchQuery) ||
        e.category.toLowerCase().includes(this.searchQuery) ||
        (e.notes && e.notes.toLowerCase().includes(this.searchQuery))
      );
    }

    if (this.expenseFilter === 'deductible') {
      expenses = expenses.filter(e => e.taxDeductible);
    } else if (this.expenseFilter === 'personal') {
      expenses = expenses.filter(e => !e.taxDeductible);
    }

    if (expenses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">${this.t('noTransactions', 'No records found')}</td></tr>`;
      return;
    }

    tbody.innerHTML = expenses.map(exp => {
      const isDed = exp.taxDeductible;
      const taxBadge = isDed 
        ? `<span class="badge-status bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]"><i class="fa-solid fa-file-invoice text-[10px]"></i> ${exp.deductiblePercent || 100}% ${this.t('writeOffBadge', 'Write-Off')}</span>`
        : `<span class="badge-status bg-slate-800 text-slate-400 text-[11px]">${this.t('personalNonDeductible', 'Personal')}</span>`;

      return `
        <tr class="border-b border-slate-800/60 hover:bg-white/[0.02] transition-colors text-sm">
          <td class="py-3.5 px-4 font-medium text-slate-100">
            <div>${exp.title}</div>
            <div class="text-xs text-slate-400 font-normal">${exp.notes || '-'}</div>
          </td>
          <td class="py-3.5 px-4">
            <span class="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">${exp.category}</span>
          </td>
          <td class="py-3.5 px-4 text-xs text-slate-300">
            <div>${exp.paymentMethod || 'Card'}</div>
            <div class="text-[10px] text-indigo-400">${exp.recurring || 'One-Time'}</div>
          </td>
          <td class="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
            ${this.models.formatDate(exp.date)}
          </td>
          <td class="py-3.5 px-4 font-numeric font-semibold text-rose-400 whitespace-nowrap">
            -${this.models.formatCurrency(exp.amount, currency)}
          </td>
          <td class="py-3.5 px-4 whitespace-nowrap">
            ${taxBadge}
          </td>
          <td class="py-3.5 px-4 text-right whitespace-nowrap">
            <button onclick="window.finFlowApp.deleteExpense('${exp.id}')" title="Delete" class="p-1.5 text-xs text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  deleteExpense(id) {
    if (confirm('Delete this expense?')) {
      this.store.deleteExpense(id);
      this.showToast('Removed', 'info');
    }
  }

  renderBudgetsView() {
    const container = document.getElementById('budgetsGrid');
    if (!container) return;

    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    const budgets = data.budgets || [];
    const expenses = data.expenses || [];

    const now = new Date();
    const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const spentMap = {};
    expenses.forEach(e => {
      if (e.date && e.date.startsWith(currentMonthPrefix)) {
        spentMap[e.category] = (spentMap[e.category] || 0) + (parseFloat(e.amount) || 0);
      }
    });

    container.innerHTML = budgets.map(bgt => {
      const spent = spentMap[bgt.category] || 0;
      const limit = bgt.monthlyLimit || 1;
      const pct = Math.round((spent / limit) * 100);
      const remaining = Math.max(0, limit - spent);
      const isOver = spent > limit;

      let statusColor = 'bg-emerald-500';
      let textColor = 'text-emerald-400';
      if (pct > 100) {
        statusColor = 'bg-rose-500';
        textColor = 'text-rose-400';
      } else if (pct >= 80) {
        statusColor = 'bg-amber-500';
        textColor = 'text-amber-400';
      }

      return `
        <div class="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div class="flex items-start justify-between mb-4">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">${bgt.category}</span>
              <h4 class="text-lg font-bold text-slate-100 mt-0.5">${this.models.formatCurrency(spent, currency)} <span class="text-xs font-normal text-slate-400 font-sans">/ ${this.models.formatCurrency(limit, currency)}</span></h4>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-bold font-numeric px-2.5 py-1 rounded-full ${isOver ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-300'}">
                ${pct}%
              </span>
              <button onclick="window.finFlowApp.deleteBudget('${bgt.id}')" class="text-slate-500 hover:text-rose-400 text-xs p-1">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>

          <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
            <div class="${statusColor} h-full transition-all duration-500 rounded-full" style="width: ${Math.min(100, pct)}%"></div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>${isOver ? this.t('overBudgetBy', 'Over budget by') : this.t('remainingAllowance', 'Remaining allowance')}</span>
            <span class="font-numeric font-semibold ${textColor}">
              ${isOver ? '+' + this.models.formatCurrency(spent - limit, currency) : this.models.formatCurrency(remaining, currency)}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  deleteBudget(id) {
    if (confirm('Delete this budget limit?')) {
      this.store.deleteBudget(id);
      this.showToast('Budget deleted', 'info');
    }
  }

  renderLoansView() {
    const container = document.getElementById('loansGrid');
    if (!container) return;

    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    const loans = data.loans || [];

    if (loans.length === 0) {
      container.innerHTML = `<div class="col-span-full p-8 text-center text-slate-500">${this.t('noTransactions', 'No active loans on record.')}</div>`;
      return;
    }

    container.innerHTML = loans.map(loan => {
      const isLiability = loan.type.includes('Liability');
      const principal = loan.principal || 1;
      const balance = loan.balance || 0;
      const paid = Math.max(0, principal - balance);
      const paidPct = Math.round((paid / principal) * 100);
      const isPaidOff = balance <= 0;

      return `
        <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between mb-3">
              <span class="badge-status ${isLiability ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}">
                <i class="fa-solid ${isLiability ? 'fa-arrow-up-right' : 'fa-arrow-down-left'}"></i> ${isLiability ? this.t('liabilityYouOwe', loan.type) : this.t('receivableOwedToYou', loan.type)}
              </span>
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-semibold ${isPaidOff ? 'text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full' : 'text-slate-400'}">${isPaidOff ? this.t('paidInFull', 'Paid in Full') : loan.status}</span>
                <button onclick="window.finFlowApp.deleteLoan('${loan.id}')" class="text-slate-500 hover:text-rose-400 text-xs p-1">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>

            <h4 class="text-base font-bold text-slate-100">${loan.title}</h4>
            <p class="text-xs text-slate-400 mt-0.5"><span class="text-slate-200 font-medium">${loan.lenderOrBorrower}</span></p>

            <div class="grid grid-cols-2 gap-3 my-4 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <div>
                <p class="text-[11px] text-slate-400">${this.t('currentBalance', 'Current Balance')}</p>
                <p class="text-base font-bold font-numeric ${isLiability ? 'text-rose-400' : 'text-emerald-400'}">
                  ${this.models.formatCurrency(balance, currency)}
                </p>
              </div>
              <div>
                <p class="text-[11px] text-slate-400">${this.t('monthlyEMI', 'Monthly EMI')}</p>
                <p class="text-base font-bold font-numeric text-slate-100">
                  ${this.models.formatCurrency(loan.monthlyPayment, currency)}
                </p>
              </div>
              <div>
                <p class="text-[11px] text-slate-400">${this.t('interestRate', 'Interest (APR)')}</p>
                <p class="text-xs font-semibold font-numeric text-slate-300">${loan.interestRate}%</p>
              </div>
              <div>
                <p class="text-[11px] text-slate-400">${this.t('principal', 'Principal')}</p>
                <p class="text-xs font-semibold font-numeric text-slate-300">${this.models.formatCurrency(principal, currency)}</p>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>${this.t('repaid', 'Repaid')}: ${paidPct}%</span>
                <span>${this.models.formatCurrency(paid, currency)}</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="${isLiability ? 'bg-indigo-500' : 'bg-emerald-500'} h-full rounded-full transition-all" style="width: ${paidPct}%"></div>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-[11px] text-slate-500">${loan.endDate || '-'}</span>
            ${!isPaidOff ? `
              <button onclick="window.finFlowApp.promptLoanPayment('${loan.id}', '${loan.title}', ${loan.monthlyPayment})" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-all">
                <i class="fa-solid fa-money-bill-transfer mr-1"></i> ${this.t('btnLogPayment', 'Log Payment')}
              </button>
            ` : `
              <span class="text-xs text-emerald-400 font-semibold"><i class="fa-solid fa-circle-check mr-1"></i> ${this.t('paidInFull', 'Paid')}</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  promptLoanPayment(loanId, title, defaultAmount) {
    document.getElementById('payLoanId').value = loanId;
    document.getElementById('payLoanTitle').textContent = title;
    document.getElementById('payLoanAmount').value = defaultAmount;
    this.openModal('modalLoanPayment');
  }

  deleteLoan(id) {
    if (confirm('Delete this loan?')) {
      this.store.deleteLoan(id);
      this.showToast('Deleted', 'info');
    }
  }

  renderInvoicesView() {
    const tbody = document.getElementById('invoicesTableBody');
    if (!tbody) return;

    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    const invoices = data.invoices || [];

    if (invoices.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-slate-500">${this.t('noTransactions', 'No invoices')}</td></tr>`;
      return;
    }

    tbody.innerHTML = invoices.map(inv => {
      const isPaid = inv.status === 'Paid';
      const badge = isPaid 
        ? `<span class="badge-status bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">${this.t('statusPaid', 'Paid')}</span>`
        : inv.status === 'Overdue'
        ? `<span class="badge-status bg-rose-500/15 text-rose-400 border border-rose-500/20">${this.t('statusOverdue', 'Overdue')}</span>`
        : `<span class="badge-status bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">${this.t('statusPending', 'Pending')}</span>`;

      return `
        <tr class="border-b border-slate-800/60 hover:bg-white/[0.02] transition-colors text-sm">
          <td class="py-3.5 px-4 font-numeric font-semibold text-indigo-400">
            ${inv.invoiceNumber}
          </td>
          <td class="py-3.5 px-4 font-medium text-slate-100">
            <div>${inv.clientName}</div>
            <div class="text-xs text-slate-400 font-normal">${inv.clientEmail || ''}</div>
          </td>
          <td class="py-3.5 px-4 text-xs text-slate-400">
            <div>${this.models.formatDate(inv.dueDate)}</div>
            <div class="text-[11px] text-slate-500">${this.models.formatDate(inv.issueDate)}</div>
          </td>
          <td class="py-3.5 px-4 font-numeric font-bold text-slate-100">
            ${this.models.formatCurrency(inv.total, currency)}
          </td>
          <td class="py-3.5 px-4">
            ${badge}
          </td>
          <td class="py-3.5 px-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <button onclick="window.finFlowApp.viewInvoicePreview('${inv.id}')" title="Preview" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors">
                <i class="fa-solid fa-eye mr-1"></i> ${this.t('btnPreview', 'Preview')}
              </button>
              ${!isPaid ? `
                <button onclick="window.finFlowApp.markInvoicePaid('${inv.id}')" title="Mark Paid" class="p-1.5 text-xs text-emerald-400 hover:bg-emerald-500/10 rounded-lg">
                  <i class="fa-solid fa-check"></i>
                </button>
              ` : ''}
              <button onclick="window.finFlowApp.deleteInvoice('${inv.id}')" title="Delete" class="p-1.5 text-xs text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  viewInvoicePreview(id) {
    const inv = this.store.data.invoices.find(i => i.id === id);
    if (!inv) return;
    const settings = this.store.data.settings;
    const currency = settings.currency || 'PKR';

    const container = document.getElementById('invoicePreviewContent');

    const itemsHtml = (inv.items || []).map(item => `
      <tr class="border-b border-slate-700/50">
        <td class="py-3 text-sm">${item.description}</td>
        <td class="py-3 text-sm text-center font-numeric">${item.quantity}</td>
        <td class="py-3 text-sm text-right font-numeric">${this.models.formatCurrency(item.rate, currency)}</td>
        <td class="py-3 text-sm text-right font-numeric font-semibold">${this.models.formatCurrency(item.amount, currency)}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div id="printableInvoiceSection" class="p-8 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800">
        <div class="flex justify-between items-start pb-6 border-b border-slate-800">
          <div>
            <h2 class="text-2xl font-extrabold text-emerald-400 tracking-tight">${settings.businessName || 'Freelance Studio'}</h2>
            <p class="text-sm text-slate-300 mt-1">${settings.freelancerName}</p>
            <p class="text-xs text-slate-400">${settings.email}</p>
          </div>
          <div class="text-right">
            <span class="text-xs uppercase font-bold tracking-widest text-slate-400">${this.t('invPrintTitle', 'INVOICE')}</span>
            <h3 class="text-xl font-bold font-numeric text-slate-100 mt-0.5">${inv.invoiceNumber}</h3>
            <p class="text-xs text-slate-400 mt-1">${inv.status}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 my-6 text-sm">
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">${this.t('invBilledTo', 'Billed To')}</p>
            <p class="font-bold text-slate-200">${inv.clientName}</p>
            <p class="text-xs text-slate-400">${inv.clientEmail || ''}</p>
          </div>
          <div class="text-right space-y-1">
            <p class="text-xs text-slate-400">${this.t('lblIssueDate', 'Issue Date')}: <span class="font-numeric text-slate-200">${this.models.formatDate(inv.issueDate)}</span></p>
            <p class="text-xs text-slate-400">${this.t('lblDueDate', 'Due Date')}: <span class="font-numeric text-amber-400">${this.models.formatDate(inv.dueDate)}</span></p>
          </div>
        </div>

        <table class="w-full text-left my-6">
          <thead>
            <tr class="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
              <th class="py-2.5">${this.t('invItemTh', 'Item & Description')}</th>
              <th class="py-2.5 text-center">${this.t('invQtyTh', 'Qty')}</th>
              <th class="py-2.5 text-right">${this.t('invRateTh', 'Rate')}</th>
              <th class="py-2.5 text-right">${this.t('invAmountTh', 'Amount')}</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="flex justify-end pt-4 border-t border-slate-800">
          <div class="w-64 space-y-2 text-sm">
            <div class="flex justify-between text-slate-400">
              <span>${this.t('invSubtotal', 'Subtotal')}</span>
              <span class="font-numeric font-medium text-slate-200">${this.models.formatCurrency(inv.subtotal, currency)}</span>
            </div>
            ${inv.taxRate > 0 ? `
              <div class="flex justify-between text-slate-400">
                <span>${this.t('invTax', 'Tax')} (${inv.taxRate}%)</span>
                <span class="font-numeric font-medium text-slate-200">${this.models.formatCurrency(inv.taxAmount, currency)}</span>
              </div>
            ` : ''}
            <div class="flex justify-between text-base font-bold text-slate-100 pt-2 border-t border-slate-800">
              <span>${this.t('invTotalDue', 'Total Due')}</span>
              <span class="font-numeric text-emerald-400">${this.models.formatCurrency(inv.total, currency)}</span>
            </div>
          </div>
        </div>

        ${inv.notes ? `
          <div class="mt-8 p-4 bg-slate-800/40 rounded-xl text-xs text-slate-400 border border-slate-800">
            <p class="font-semibold text-slate-300 mb-1">${this.t('invPaymentNotesTitle', 'Payment Instructions:')}</p>
            <p>${inv.notes}</p>
          </div>
        ` : ''}
      </div>
    `;

    this.openModal('modalInvoicePreview');
  }

  markInvoicePaid(id) {
    const inv = this.store.data.invoices.find(i => i.id === id);
    if (!inv) return;
    this.store.updateInvoice(id, { status: 'Paid' });

    this.store.addIncome({
      client: inv.clientName,
      project: `Invoice: ${inv.invoiceNumber}`,
      type: "Invoice Payment",
      amount: inv.total,
      currency: this.store.data.settings.currency || 'PKR',
      date: new Date().toISOString().split("T")[0],
      status: "Paid",
      platform: "Direct Wire",
      invoiceNumber: inv.invoiceNumber,
      notes: `Reconciled for invoice ${inv.invoiceNumber}`
    });

    this.showToast(this.t('statusPaid', 'Paid') + ' ✓');
    this.triggerConfetti();
  }

  deleteInvoice(id) {
    if (confirm('Delete this invoice?')) {
      this.store.deleteInvoice(id);
      this.showToast('Deleted', 'info');
    }
  }

  handleCreateInvoiceSubmit() {
    const clientName = document.getElementById('invClientName').value;
    const clientEmail = document.getElementById('invClientEmail').value;
    const invNumber = document.getElementById('invNumber').value || `INV-${Date.now().toString().slice(-4)}`;
    const issueDate = document.getElementById('invIssueDate').value;
    const dueDate = document.getElementById('invDueDate').value;
    const notes = document.getElementById('invNotes').value;

    const desc = document.getElementById('invItemDesc').value;
    const qty = parseFloat(document.getElementById('invItemQty').value) || 1;
    const rate = parseFloat(document.getElementById('invItemRate').value) || 0;
    const subtotal = qty * rate;
    const taxRate = parseFloat(document.getElementById('invTaxRate').value) || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;

    const newInvoice = {
      invoiceNumber: invNumber,
      clientName,
      clientEmail,
      issueDate,
      dueDate,
      status: "Sent",
      taxRate,
      items: [{ description: desc, quantity: qty, rate, amount: subtotal }],
      subtotal,
      taxAmount,
      total,
      notes
    };

    this.store.addInvoice(newInvoice);

    this.store.addIncome({
      client: clientName,
      project: desc,
      type: "Invoice",
      amount: total,
      currency: this.store.data.settings.currency || 'PKR',
      date: issueDate,
      status: "Pending",
      platform: "Invoice",
      invoiceNumber: invNumber,
      notes: `Invoice issued to ${clientName}`
    });

    this.closeAllModals();
    document.getElementById('invoiceForm').reset();
    this.showToast(this.t('btnCreateInvoice') + ' ✓');
  }

  renderGoalsView() {
    const container = document.getElementById('goalsGrid');
    if (!container) return;

    const data = this.store.data;
    const currency = data.settings.currency || 'PKR';
    const goals = data.goals || [];

    if (goals.length === 0) {
      container.innerHTML = `<div class="col-span-full p-8 text-center text-slate-500">${this.t('noTransactions', 'No goals yet')}</div>`;
      return;
    }

    container.innerHTML = goals.map(goal => {
      const target = goal.targetAmount || 1;
      const current = goal.currentAmount || 0;
      const pct = Math.min(100, Math.round((current / target) * 100));

      return `
        <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 text-lg">
                <i class="fa-solid ${goal.icon || 'fa-piggy-bank'}"></i>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-xs font-numeric font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  ${pct}%
                </span>
                <button onclick="window.finFlowApp.deleteGoal('${goal.id}')" class="text-slate-500 hover:text-rose-400 text-xs p-1">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>

            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">${goal.category}</span>
            <h4 class="text-lg font-bold text-slate-100 mt-0.5">${goal.title}</h4>

            <div class="flex items-baseline justify-between mt-3 mb-1">
              <span class="text-xl font-bold font-numeric text-emerald-400">${this.models.formatCurrency(current, currency)}</span>
              <span class="text-xs text-slate-400">${this.t('target', 'Target')}: ${this.models.formatCurrency(target, currency)}</span>
            </div>

            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden my-3">
              <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-xs text-slate-400 font-numeric">${this.models.formatDate(goal.targetDate)}</span>
            <button onclick="window.finFlowApp.promptContributeGoal('${goal.id}', '${goal.title}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-all">
              <i class="fa-solid fa-plus mr-1"></i> ${this.t('btnAddFunds', 'Add Funds')}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  promptContributeGoal(id, title) {
    const amtStr = prompt(`${this.t('btnAddFunds')}: "${title}":`);
    if (amtStr) {
      const amt = parseFloat(amtStr);
      if (!isNaN(amt) && amt > 0) {
        const goal = this.store.data.goals.find(g => g.id === id);
        if (goal) {
          goal.currentAmount = (goal.currentAmount || 0) + amt;
          this.store.save();
          this.showToast(`+${this.models.formatCurrency(amt, this.store.data.settings.currency || 'PKR')}`);
          this.triggerConfetti();
        }
      }
    }
  }

  deleteGoal(id) {
    if (confirm('Delete this goal?')) {
      this.store.deleteGoal(id);
      this.showToast('Deleted', 'info');
    }
  }

  renderTaxVaultView(kpis) {
    const currency = this.store.data.settings.currency || 'PKR';
    const rate = this.store.data.settings.taxRate || 15;

    this.updateElementText('taxVaultRate', `${rate}%`);
    this.updateElementText('taxVaultGross', this.models.formatCurrency(kpis.grossPaidIncome, currency));
    this.updateElementText('taxVaultDeductions', this.models.formatCurrency(kpis.deductibleExpenses, currency));
    this.updateElementText('taxVaultTaxable', this.models.formatCurrency(kpis.taxableIncome, currency));
    this.updateElementText('taxVaultRequiredReserve', this.models.formatCurrency(kpis.estimatedTaxReserve, currency));
    this.updateElementText('taxVaultSavingsEarned', this.models.formatCurrency(kpis.taxSavingsFromWriteOffs, currency));

    const tbody = document.getElementById('taxDeductionsTableBody');
    if (!tbody) return;

    const deductibleList = (this.store.data.expenses || []).filter(e => e.taxDeductible);
    if (deductibleList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-slate-500">${this.t('noTransactions', 'No write-offs logged yet')}</td></tr>`;
      return;
    }

    tbody.innerHTML = deductibleList.map(e => {
      const amt = parseFloat(e.amount) || 0;
      const pct = (parseFloat(e.deductiblePercent) || 100) / 100;
      const deductibleValue = amt * pct;
      const taxShield = deductibleValue * (rate / 100);

      return `
        <tr class="border-b border-slate-800 text-sm hover:bg-white/[0.02]">
          <td class="py-3 px-4 font-medium text-slate-100">${e.title}</td>
          <td class="py-3 px-4 text-xs text-slate-400">${e.category}</td>
          <td class="py-3 px-4 font-numeric text-slate-300">${this.models.formatCurrency(amt, currency)}</td>
          <td class="py-3 px-4 font-numeric text-emerald-400 font-semibold">${this.models.formatCurrency(deductibleValue, currency)} (${e.deductiblePercent}%)</td>
          <td class="py-3 px-4 font-numeric text-teal-400 font-bold text-right">+${this.models.formatCurrency(taxShield, currency)}</td>
        </tr>
      `;
    }).join('');
  }

  populateSettingsForm() {
    const settings = this.store.data.settings;
    const currSelect = document.getElementById('settingCurrency');
    if (currSelect) currSelect.value = settings.currency || 'PKR';
    const taxInput = document.getElementById('settingTaxRate');
    if (taxInput) taxInput.value = settings.taxRate || 15;
    const nameInput = document.getElementById('settingFreelancerName');
    if (nameInput) nameInput.value = settings.freelancerName || '';
    const bizInput = document.getElementById('settingBusinessName');
    if (bizInput) bizInput.value = settings.businessName || '';
    const emailInput = document.getElementById('settingEmail');
    if (emailInput) emailInput.value = settings.email || '';
    const burnInput = document.getElementById('settingAvgBurn');
    if (burnInput) burnInput.value = settings.avgMonthlyLivingExpense || 180000;
  }

  exportDataJSON() {
    const json = this.store.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finflow-freelancer-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('JSON Backup downloaded!');
  }

  importDataJSON(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const success = this.store.importJSON(e.target.result);
      if (success) {
        this.showToast('Data imported successfully!');
      } else {
        this.showToast('Invalid JSON file!', 'error');
      }
    };
    reader.readAsText(file);
  }

  exportDataCSV(type = 'all') {
    const csv = this.store.exportCSV(type);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finflow-${type}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast(`CSV Exported!`);
  }

  resetDemo() {
    if (confirm('Reset to sample demo data in PKR?')) {
      this.store.resetToDemo();
      this.showToast('Demo data restored!');
    }
  }

  clearAllData() {
    if (confirm('Clear all records?')) {
      this.store.clearAll();
      this.showToast('All records cleared', 'info');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.finFlowApp = new FinFlowApp();
});
