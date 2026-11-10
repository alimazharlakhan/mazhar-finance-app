/**
 * FinFlow Pro - Financial Calculations & Business Logic Models
 * Prioritizes Pakistani Rupee (PKR - ₨) and multi-currency formatting.
 */

const FinFlowModels = {
  CURRENCIES: {
    PKR: { symbol: "₨", name: "Pakistani Rupee", locale: "en-PK" },
    USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
    EUR: { symbol: "€", name: "Euro", locale: "de-DE" },
    GBP: { symbol: "£", name: "British Pound", locale: "en-GB" },
    CAD: { symbol: "CA$", name: "Canadian Dollar", locale: "en-CA" },
    AUD: { symbol: "AU$", name: "Australian Dollar", locale: "en-AU" },
    INR: { symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
    JPY: { symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
    AED: { symbol: "AED", name: "UAE Dirham", locale: "en-AE" }
  },

  formatCurrency(amount, currencyCode = 'PKR') {
    const val = parseFloat(amount) || 0;
    const curr = this.CURRENCIES[currencyCode] || this.CURRENCIES.PKR;
    try {
      // Standard clean format with symbol and commas
      const formatted = Math.round(val).toLocaleString('en-US');
      return `${curr.symbol} ${formatted}`;
    } catch (e) {
      return `${curr.symbol} ${val.toLocaleString()}`;
    }
  },

  formatCompactCurrency(amount, currencyCode = 'PKR') {
    const val = parseFloat(amount) || 0;
    const curr = this.CURRENCIES[currencyCode] || this.CURRENCIES.PKR;
    if (Math.abs(val) >= 10000000) {
      return `${curr.symbol} ${(val / 10000000).toFixed(1)} Cr`; // Crore for South Asia
    }
    if (Math.abs(val) >= 1000000) {
      return `${curr.symbol} ${(val / 1000000).toFixed(1)}M`;
    }
    if (Math.abs(val) >= 100000) {
      return `${curr.symbol} ${(val / 100000).toFixed(1)} Lakh`;
    }
    if (Math.abs(val) >= 1000) {
      return `${curr.symbol} ${(val / 1000).toFixed(0)}k`;
    }
    return `${curr.symbol} ${val.toFixed(0)}`;
  },

  formatDate(dateString) {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  calculateKPIs(data, timeFrame = 'all') {
    const now = new Date();
    const filterByDate = (itemDate) => {
      if (timeFrame === 'all') return true;
      const d = new Date(itemDate);
      if (isNaN(d.getTime())) return true;
      if (timeFrame === 'this_month') {
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      }
      if (timeFrame === 'last_month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return d.getFullYear() === lastMonth.getFullYear() && d.getMonth() === lastMonth.getMonth();
      }
      if (timeFrame === 'this_year') {
        return d.getFullYear() === now.getFullYear();
      }
      return true;
    };

    const incomes = (data.incomes || []).filter(i => filterByDate(i.date));
    const expenses = (data.expenses || []).filter(e => filterByDate(e.date));

    // Gross paid income
    const grossPaidIncome = incomes
      .filter(i => i.status === 'Paid')
      .reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);

    // Pending / Uncollected income
    const pendingIncome = incomes
      .filter(i => i.status === 'Pending' || i.status === 'Overdue')
      .reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);

    // Expenses breakdown
    let totalExpenses = 0;
    let deductibleExpenses = 0;
    let personalExpenses = 0;

    expenses.forEach(e => {
      const amt = parseFloat(e.amount) || 0;
      totalExpenses += amt;
      if (e.taxDeductible) {
        const pct = (parseFloat(e.deductiblePercent) || 100) / 100;
        deductibleExpenses += amt * pct;
      } else {
        personalExpenses += amt;
      }
    });

    const netProfit = grossPaidIncome - totalExpenses;
    const profitMargin = grossPaidIncome > 0 ? Math.round((netProfit / grossPaidIncome) * 100) : 0;

    // Freelancer Tax Vault
    const taxRate = (parseFloat(data.settings?.taxRate) || 15) / 100;
    const taxableIncome = Math.max(0, grossPaidIncome - deductibleExpenses);
    const estimatedTaxReserve = taxableIncome * taxRate;
    const taxSavingsFromWriteOffs = deductibleExpenses * taxRate;

    // Debt liabilities & receivables
    let totalDebtLiability = 0;
    let totalReceivables = 0;
    let totalMonthlyDebtService = 0;

    (data.loans || []).forEach(l => {
      if (l.status === 'Active') {
        const bal = parseFloat(l.balance) || 0;
        if (l.type.includes("Liability")) {
          totalDebtLiability += bal;
          totalMonthlyDebtService += parseFloat(l.monthlyPayment) || 0;
        } else {
          totalReceivables += bal;
        }
      }
    });

    // Freelancer Runway (Emergency Cushion)
    const totalSavingsSaved = (data.goals || []).reduce((sum, g) => sum + (parseFloat(g.currentAmount) || 0), 0);
    const avgMonthlyBurn = data.settings?.avgMonthlyLivingExpense || 180000;
    const liquidCash = Math.max(0, totalSavingsSaved + Math.max(0, netProfit));
    const runwayMonths = avgMonthlyBurn > 0 ? (liquidCash / avgMonthlyBurn).toFixed(1) : "N/A";

    // Health Score (0 - 100)
    let healthScore = 0;
    const runwayNum = parseFloat(runwayMonths) || 0;
    healthScore += Math.min(35, Math.round((runwayNum / 6) * 35));

    if (profitMargin >= 50) healthScore += 25;
    else if (profitMargin >= 30) healthScore += 20;
    else if (profitMargin >= 10) healthScore += 12;
    else if (profitMargin > 0) healthScore += 5;

    const monthlyIncomeEst = grossPaidIncome > 0 ? grossPaidIncome : 250000;
    const debtRatio = totalDebtLiability / monthlyIncomeEst;
    if (debtRatio === 0) healthScore += 20;
    else if (debtRatio < 1.0) healthScore += 16;
    else if (debtRatio < 2.5) healthScore += 10;
    else healthScore += 4;

    const totalBilled = grossPaidIncome + pendingIncome;
    const collectionRate = totalBilled > 0 ? (grossPaidIncome / totalBilled) : 1;
    healthScore += Math.round(collectionRate * 20);

    healthScore = Math.min(100, Math.max(10, healthScore));

    return {
      grossPaidIncome,
      pendingIncome,
      totalExpenses,
      deductibleExpenses,
      personalExpenses,
      netProfit,
      profitMargin,
      taxRate: taxRate * 100,
      taxableIncome,
      estimatedTaxReserve,
      taxSavingsFromWriteOffs,
      totalDebtLiability,
      totalReceivables,
      totalMonthlyDebtService,
      runwayMonths,
      liquidCash,
      healthScore
    };
  },

  getCashFlowTrend(incomes = [], expenses = [], monthsBack = 6) {
    const months = [];
    const now = new Date();

    for (let i = monthsBack - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en-US', { month: 'short' });
      months.push({ key, label, income: 0, expense: 0, net: 0 });
    }

    incomes.forEach(inc => {
      if (inc.status === 'Paid' && inc.date) {
        const key = inc.date.substring(0, 7);
        const target = months.find(m => m.key === key);
        if (target) {
          target.income += parseFloat(inc.amount) || 0;
        }
      }
    });

    expenses.forEach(exp => {
      if (exp.date) {
        const key = exp.date.substring(0, 7);
        const target = months.find(m => m.key === key);
        if (target) {
          target.expense += parseFloat(exp.amount) || 0;
        }
      }
    });

    months.forEach(m => {
      m.net = m.income - m.expense;
    });

    return months;
  },

  getCategoryBreakdown(expenses = []) {
    const map = {};
    expenses.forEach(e => {
      const cat = e.category || 'Other';
      const amt = parseFloat(e.amount) || 0;
      map[cat] = (map[cat] || 0) + amt;
    });

    const labels = Object.keys(map);
    const data = labels.map(l => map[l]);
    const palette = [
      '#6366f1', '#10b981', '#06b6d4', '#f59e0b',
      '#ec4899', '#8b5cf6', '#3b82f6', '#14b8a6', '#64748b'
    ];

    return {
      labels,
      data,
      colors: labels.map((_, i) => palette[i % palette.length])
    };
  },

  getClientRevenueBreakdown(incomes = []) {
    const map = {};
    incomes.forEach(i => {
      const client = i.client || 'Direct Client';
      const amt = parseFloat(i.amount) || 0;
      map[client] = (map[client] || 0) + amt;
    });

    const sortedClients = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return {
      labels: sortedClients.map(c => c[0]),
      data: sortedClients.map(c => c[1])
    };
  },

  calculateEMI(principal, annualRate, months) {
    if (!principal || !months) return 0;
    if (annualRate === 0) return principal / months;
    const r = (annualRate / 100) / 12;
    const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return Math.round(emi * 100) / 100;
  }
};

window.FinFlowModels = FinFlowModels;
