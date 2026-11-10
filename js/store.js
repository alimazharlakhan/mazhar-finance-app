/**
 * FinFlow Pro - Central Data Store & LocalStorage Persistence
 * Tailored for Pakistani Rupee (PKR - ₨) and multi-currency freelancer workflows.
 */

const STORAGE_KEY = 'mazhars_finances_db_v1';

const DEFAULT_DEMO_DATA = {
  settings: {
    freelancerName: "Mazhar",
    businessName: "Mazhar's Finances",
    email: "mazhar@freelance.pro",
    currency: "PKR",
    currencySymbol: "₨",
    taxRate: 15, // Freelancer tax rate in Pakistan (15% standard withholding/income tax)
    theme: "dark",
    emergencyBufferTargetMonths: 6,
    avgMonthlyLivingExpense: 180000 // Monthly living burn in PKR
  },
  incomes: [
    {
      id: "inc-101",
      client: "FinTech Global Ltd",
      project: "Mobile Banking Design System",
      type: "Milestone",
      amount: 450000,
      currency: "PKR",
      date: "2026-11-02",
      status: "Paid",
      platform: "Direct Wire",
      invoiceNumber: "INV-2026-042",
      notes: "Sprint 2 Deliverables approved & wired directly."
    },
    {
      id: "inc-102",
      client: "Aura Health AI",
      project: "React Native Mobile App",
      type: "Hourly",
      amount: 320000,
      currency: "PKR",
      date: "2026-10-28",
      status: "Paid",
      platform: "Stripe",
      invoiceNumber: "INV-2026-039",
      notes: "40 hours logged @ ₨ 8,000/hr ($28/hr)"
    },
    {
      id: "inc-103",
      client: "Nordic E-Commerce",
      project: "Shopify Headless Architecture",
      type: "Retainer",
      amount: 250000,
      currency: "PKR",
      date: "2026-10-15",
      status: "Paid",
      platform: "Wise",
      invoiceNumber: "INV-2026-035",
      notes: "Monthly tech advisory & maintenance retainer"
    },
    {
      id: "inc-104",
      client: "Elevate Brand Agency",
      project: "SaaS Landing Page & 3D Assets",
      type: "Fixed Price",
      amount: 380000,
      currency: "PKR",
      date: "2026-11-04",
      status: "Pending",
      platform: "Upwork",
      invoiceNumber: "INV-2026-045",
      notes: "Awaiting final client signoff before escrow release."
    },
    {
      id: "inc-105",
      client: "HyperScale Ventures",
      project: "Pitch Deck UI Prototype",
      type: "Fixed Price",
      amount: 180000,
      currency: "PKR",
      date: "2026-11-05",
      status: "Overdue",
      platform: "Bank Transfer",
      invoiceNumber: "INV-2026-043",
      notes: "Net 15 terms expired 2 days ago. Friendly reminder sent."
    },
    {
      id: "inc-106",
      client: "Gumroad / Digital Store",
      project: "Tailwind UI Components Kit",
      type: "Passive / Royalties",
      amount: 68000,
      currency: "PKR",
      date: "2026-10-31",
      status: "Paid",
      platform: "PayPal",
      invoiceNumber: "GUM-OCT26",
      notes: "Monthly passive sales from marketplace kit"
    }
  ],
  expenses: [
    {
      id: "exp-201",
      title: "GitHub Copilot Enterprise + Claude API",
      category: "Software & AI Tools",
      amount: 28000,
      date: "2026-11-01",
      taxDeductible: true,
      deductiblePercent: 100,
      paymentMethod: "Business Credit Card",
      recurring: "Monthly",
      notes: "Developer tooling subscription ($100/mo)"
    },
    {
      id: "exp-202",
      title: "Figma Organization & Adobe CC",
      category: "Software & AI Tools",
      amount: 35000,
      date: "2026-11-02",
      taxDeductible: true,
      deductiblePercent: 100,
      paymentMethod: "Business Credit Card",
      recurring: "Monthly",
      notes: "Design team collaboration tools"
    },
    {
      id: "exp-203",
      title: "Coworking Space Dedicated Hot Desk",
      category: "Workspace & Office",
      amount: 45000,
      date: "2026-11-01",
      taxDeductible: true,
      deductiblePercent: 100,
      paymentMethod: "Bank Transfer",
      recurring: "Monthly",
      notes: "Monthly coworking membership with fiber internet"
    },
    {
      id: "exp-204",
      title: "Client Lunch & Q4 Strategy Meeting",
      category: "Meals & Entertainment",
      amount: 16500,
      date: "2026-10-24",
      taxDeductible: true,
      deductiblePercent: 50,
      paymentMethod: "Business Card",
      recurring: "One-Time",
      notes: "Client relationship meeting - 50% deductible rate"
    },
    {
      id: "exp-205",
      title: "Subcontractor - 3D Icon Designer",
      category: "Subcontractors",
      amount: 95000,
      date: "2026-10-20",
      taxDeductible: true,
      deductiblePercent: 100,
      paymentMethod: "Wise",
      recurring: "One-Time",
      notes: "Contracted for Elevate Brand pitch assets"
    },
    {
      id: "exp-206",
      title: "Vercel Pro & AWS Cloud Infrastructure",
      category: "Hosting & Infrastructure",
      amount: 24000,
      date: "2026-11-03",
      taxDeductible: true,
      deductiblePercent: 100,
      paymentMethod: "Business Card",
      recurring: "Monthly",
      notes: "Client demo sites & staging servers"
    },
    {
      id: "exp-207",
      title: "Logitech MX Master 3S & Mechanical Keyboard",
      category: "Hardware & Gear",
      amount: 48000,
      date: "2026-10-14",
      taxDeductible: true,
      deductiblePercent: 100,
      paymentMethod: "Business Card",
      recurring: "One-Time",
      notes: "Ergonomic equipment upgrade"
    },
    {
      id: "exp-208",
      title: "Personal Living, Groceries & Utilities",
      category: "Personal Living",
      amount: 95000,
      date: "2026-11-03",
      taxDeductible: false,
      deductiblePercent: 0,
      paymentMethod: "Personal Debit Card",
      recurring: "Monthly",
      notes: "Non-deductible personal baseline living expense"
    }
  ],
  budgets: [
    {
      id: "bgt-1",
      category: "Software & AI Tools",
      monthlyLimit: 75000,
      color: "#6366f1"
    },
    {
      id: "bgt-2",
      category: "Workspace & Office",
      monthlyLimit: 60000,
      color: "#10b981"
    },
    {
      id: "bgt-3",
      category: "Hosting & Infrastructure",
      monthlyLimit: 40000,
      color: "#06b6d4"
    },
    {
      id: "bgt-4",
      category: "Subcontractors",
      monthlyLimit: 200000,
      color: "#8b5cf6"
    },
    {
      id: "bgt-5",
      category: "Meals & Entertainment",
      monthlyLimit: 30000,
      color: "#f59e0b"
    },
    {
      id: "bgt-6",
      category: "Hardware & Gear",
      monthlyLimit: 80000,
      color: "#ec4899"
    },
    {
      id: "bgt-7",
      category: "Personal Living",
      monthlyLimit: 150000,
      color: "#64748b"
    }
  ],
  loans: [
    {
      id: "loan-1",
      title: "MacBook Pro M3 Max Studio Machine",
      type: "Liability (You Owe)",
      lenderOrBorrower: "Bank Alfalah / Easy Installments",
      principal: 650000,
      balance: 320000,
      monthlyPayment: 38000,
      interestRate: 0,
      startDate: "2025-12-01",
      endDate: "2027-06-01",
      status: "Active",
      notes: "0% markup 18-month installment plan on credit card"
    },
    {
      id: "loan-2",
      title: "Business Line of Credit / Working Capital",
      type: "Liability (You Owe)",
      lenderOrBorrower: "Habib Bank Ltd (HBL)",
      principal: 800000,
      balance: 240000,
      monthlyPayment: 45000,
      interestRate: 11.5,
      startDate: "2026-03-01",
      endDate: "2027-03-01",
      status: "Active",
      notes: "Maintained for emergency business buffer"
    },
    {
      id: "loan-3",
      title: "Studio Partner Equipment Advance (Owed to Me)",
      type: "Receivable (Owed to You)",
      lenderOrBorrower: "Bilal Tariq (Design Collaborator)",
      principal: 150000,
      balance: 60000,
      monthlyPayment: 20000,
      interestRate: 0,
      startDate: "2026-07-01",
      endDate: "2026-12-01",
      status: "Active",
      notes: "Bilal reimbursing for 4K video monitor purchase"
    }
  ],
  invoices: [
    {
      id: "inv-2026-042",
      invoiceNumber: "INV-2026-042",
      clientName: "FinTech Global Ltd",
      clientEmail: "billing@fintechglobal.io",
      issueDate: "2026-10-25",
      dueDate: "2026-11-02",
      status: "Paid",
      taxRate: 0,
      items: [
        { description: "Design System Architecture & Tokens", quantity: 1, rate: 250000, amount: 250000 },
        { description: "Interactive Figma Prototype & Micro-interactions", quantity: 1, rate: 200000, amount: 200000 }
      ],
      subtotal: 450000,
      taxAmount: 0,
      total: 450000,
      notes: "Thank you for partnering with Mazhar's Finances! Wire received."
    },
    {
      id: "inv-2026-045",
      invoiceNumber: "INV-2026-045",
      clientName: "Elevate Brand Agency",
      clientEmail: "finance@elevatebrand.co",
      issueDate: "2026-11-01",
      dueDate: "2026-11-15",
      status: "Sent",
      taxRate: 0,
      items: [
        { description: "High-Converting Next.js Landing Page", quantity: 1, rate: 260000, amount: 260000 },
        { description: "Three.js 3D Interactive Hero Section", quantity: 1, rate: 120000, amount: 120000 }
      ],
      subtotal: 380000,
      taxAmount: 0,
      total: 380000,
      notes: "Net 14 payment terms. Please remit payment via Bank Wire or Wise."
    },
    {
      id: "inv-2026-043",
      invoiceNumber: "INV-2026-043",
      clientName: "HyperScale Ventures",
      clientEmail: "ops@hyperscale.vc",
      issueDate: "2026-10-18",
      dueDate: "2026-11-03",
      status: "Overdue",
      taxRate: 0,
      items: [
        { description: "Seed Round Pitch Deck UI Screens (12 slides)", quantity: 12, rate: 15000, amount: 180000 }
      ],
      subtotal: 180000,
      taxAmount: 0,
      total: 180000,
      notes: "Invoice was due on Nov 3. Kindly process the payment."
    }
  ],
  goals: [
    {
      id: "gol-1",
      title: "6-Month Freelancer Runway Cushion / 6 مهينن جو هنگامي فنڊ",
      category: "Security Cushion",
      targetAmount: 1200000,
      currentAmount: 850000,
      targetDate: "2027-02-01",
      icon: "fa-shield-halved",
      color: "#10b981"
    },
    {
      id: "gol-2",
      title: "Apple Studio Display & Ergonomic Setup",
      category: "Gear Upgrade",
      targetAmount: 500000,
      currentAmount: 340000,
      targetDate: "2026-12-31",
      icon: "fa-desktop",
      color: "#6366f1"
    },
    {
      id: "gol-3",
      title: "Annual Tax Reserve Vault / ٽئڪس محفوظ فنڊ",
      category: "Tax Protection",
      targetAmount: 400000,
      currentAmount: 290000,
      targetDate: "2027-01-15",
      icon: "fa-building-columns",
      color: "#f59e0b"
    }
  ]
};

class FinFlowStore {
  constructor() {
    this.subscribers = [];
    this.data = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("FinFlow: Failed to parse stored state, falling back to demo.", e);
    }
    const initial = JSON.parse(JSON.stringify(DEFAULT_DEMO_DATA));
    this.save(initial);
    return initial;
  }

  save(data = this.data) {
    this.data = data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("FinFlow: Could not save to localStorage", e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => {
      try {
        cb(this.data);
      } catch (err) {
        console.error("Subscriber notification error", err);
      }
    });
  }

  resetToDemo() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DEMO_DATA));
    this.save();
  }

  clearAll() {
    this.data = {
      settings: { ...DEFAULT_DEMO_DATA.settings },
      incomes: [],
      expenses: [],
      budgets: [
        { id: "bgt-1", category: "Software & AI Tools", monthlyLimit: 40000, color: "#6366f1" },
        { id: "bgt-2", category: "Workspace & Office", monthlyLimit: 50000, color: "#10b981" },
        { id: "bgt-3", category: "Hardware & Gear", monthlyLimit: 40000, color: "#f59e0b" },
        { id: "bgt-4", category: "Personal Living", monthlyLimit: 120000, color: "#64748b" }
      ],
      loans: [],
      invoices: [],
      goals: []
    };
    this.save();
  }

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.incomes && parsed.expenses && parsed.settings) {
        this.data = parsed;
        this.save();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Invalid JSON import", err);
      return false;
    }
  }

  exportCSV(entityType = 'transactions') {
    let rows = [];
    if (entityType === 'incomes') {
      rows.push(["ID", "Client", "Project", "Type", "Amount", "Currency", "Date", "Status", "Platform", "InvoiceNumber", "Notes"]);
      this.data.incomes.forEach(i => {
        rows.push([i.id, `"${i.client}"`, `"${i.project}"`, i.type, i.amount, i.currency, i.date, i.status, i.platform, i.invoiceNumber, `"${i.notes || ''}"`]);
      });
    } else if (entityType === 'expenses') {
      rows.push(["ID", "Title", "Category", "Amount", "Date", "TaxDeductible", "DeductiblePercent", "PaymentMethod", "Recurring", "Notes"]);
      this.data.expenses.forEach(e => {
        rows.push([e.id, `"${e.title}"`, `"${e.category}"`, e.amount, e.date, e.taxDeductible, e.deductiblePercent, e.paymentMethod, e.recurring, `"${e.notes || ''}"`]);
      });
    } else {
      rows.push(["Type", "ID", "Party/Vendor", "Title/Project", "Category", "Amount", "Date", "Status/TaxDeductible"]);
      this.data.incomes.forEach(i => {
        rows.push(["INCOME", i.id, `"${i.client}"`, `"${i.project}"`, i.type, i.amount, i.date, i.status]);
      });
      this.data.expenses.forEach(e => {
        rows.push(["EXPENSE", e.id, `"${e.title}"`, `"${e.notes || ''}"`, e.category, -e.amount, e.date, e.taxDeductible ? `Deductible (${e.deductiblePercent}%)` : 'Non-deductible']);
      });
    }
    return rows.map(r => r.join(",")).join("\n");
  }

  addIncome(income) {
    income.id = "inc-" + Date.now();
    income.amount = parseFloat(income.amount) || 0;
    this.data.incomes.unshift(income);
    this.save();
    return income;
  }

  updateIncome(id, updatedFields) {
    const idx = this.data.incomes.findIndex(i => i.id === id);
    if (idx !== -1) {
      if (updatedFields.amount) updatedFields.amount = parseFloat(updatedFields.amount);
      this.data.incomes[idx] = { ...this.data.incomes[idx], ...updatedFields };
      this.save();
    }
  }

  deleteIncome(id) {
    this.data.incomes = this.data.incomes.filter(i => i.id !== id);
    this.save();
  }

  addExpense(expense) {
    expense.id = "exp-" + Date.now();
    expense.amount = parseFloat(expense.amount) || 0;
    this.data.expenses.unshift(expense);
    this.save();
    return expense;
  }

  updateExpense(id, updatedFields) {
    const idx = this.data.expenses.findIndex(e => e.id === id);
    if (idx !== -1) {
      if (updatedFields.amount) updatedFields.amount = parseFloat(updatedFields.amount);
      this.data.expenses[idx] = { ...this.data.expenses[idx], ...updatedFields };
      this.save();
    }
  }

  deleteExpense(id) {
    this.data.expenses = this.data.expenses.filter(e => e.id !== id);
    this.save();
  }

  addBudget(budget) {
    budget.id = "bgt-" + Date.now();
    budget.monthlyLimit = parseFloat(budget.monthlyLimit) || 0;
    this.data.budgets.push(budget);
    this.save();
    return budget;
  }

  updateBudget(id, updatedFields) {
    const idx = this.data.budgets.findIndex(b => b.id === id);
    if (idx !== -1) {
      if (updatedFields.monthlyLimit) updatedFields.monthlyLimit = parseFloat(updatedFields.monthlyLimit);
      this.data.budgets[idx] = { ...this.data.budgets[idx], ...updatedFields };
      this.save();
    }
  }

  deleteBudget(id) {
    this.data.budgets = this.data.budgets.filter(b => b.id !== id);
    this.save();
  }

  addLoan(loan) {
    loan.id = "loan-" + Date.now();
    loan.principal = parseFloat(loan.principal) || 0;
    loan.balance = parseFloat(loan.balance !== undefined ? loan.balance : loan.principal) || 0;
    loan.monthlyPayment = parseFloat(loan.monthlyPayment) || 0;
    loan.interestRate = parseFloat(loan.interestRate) || 0;
    this.data.loans.push(loan);
    this.save();
    return loan;
  }

  updateLoan(id, updatedFields) {
    const idx = this.data.loans.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.data.loans[idx] = { ...this.data.loans[idx], ...updatedFields };
      this.save();
    }
  }

  deleteLoan(id) {
    this.data.loans = this.data.loans.filter(l => l.id !== id);
    this.save();
  }

  recordLoanPayment(loanId, paymentAmount) {
    const loan = this.data.loans.find(l => l.id === loanId);
    if (!loan) return;
    const payment = parseFloat(paymentAmount) || 0;
    loan.balance = Math.max(0, loan.balance - payment);
    if (loan.balance <= 0) {
      loan.status = "Paid Off";
    }
    if (loan.type.includes("Liability")) {
      this.addExpense({
        title: `قرض ادائيگي / Debt Payment: ${loan.title}`,
        category: "Loan & Debt Service",
        amount: payment,
        date: new Date().toISOString().split("T")[0],
        taxDeductible: false,
        deductiblePercent: 0,
        paymentMethod: "Bank Transfer",
        recurring: "Monthly",
        notes: `Loan payment toward principal & interest on ${loan.lenderOrBorrower}`
      });
    } else {
      this.addIncome({
        client: loan.lenderOrBorrower,
        project: `قرض وصولي / Debt Repayment: ${loan.title}`,
        type: "Loan Return",
        amount: payment,
        currency: this.data.settings.currency,
        date: new Date().toISOString().split("T")[0],
        status: "Paid",
        platform: "Direct Wire",
        invoiceNumber: "RECV-" + Date.now().toString().slice(-4),
        notes: `Received loan repayment from ${loan.lenderOrBorrower}`
      });
    }
    this.save();
  }

  addInvoice(invoice) {
    invoice.id = invoice.invoiceNumber ? invoice.invoiceNumber.toLowerCase() : "inv-" + Date.now();
    invoice.total = parseFloat(invoice.total) || 0;
    this.data.invoices.unshift(invoice);
    this.save();
    return invoice;
  }

  updateInvoice(id, updatedFields) {
    const idx = this.data.invoices.findIndex(inv => inv.id === id);
    if (idx !== -1) {
      this.data.invoices[idx] = { ...this.data.invoices[idx], ...updatedFields };
      this.save();
    }
  }

  deleteInvoice(id) {
    this.data.invoices = this.data.invoices.filter(inv => inv.id !== id);
    this.save();
  }

  addGoal(goal) {
    goal.id = "gol-" + Date.now();
    goal.targetAmount = parseFloat(goal.targetAmount) || 0;
    goal.currentAmount = parseFloat(goal.currentAmount) || 0;
    this.data.goals.push(goal);
    this.save();
    return goal;
  }

  updateGoal(id, updatedFields) {
    const idx = this.data.goals.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.data.goals[idx] = { ...this.data.goals[idx], ...updatedFields };
      this.save();
    }
  }

  deleteGoal(id) {
    this.data.goals = this.data.goals.filter(g => g.id !== id);
    this.save();
  }

  updateSettings(settings) {
    this.data.settings = { ...this.data.settings, ...settings };
    this.save();
  }
}

window.finFlowStore = new FinFlowStore();
