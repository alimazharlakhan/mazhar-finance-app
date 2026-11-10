/**
 * FinFlow Pro - Complete Internationalization (i18n) Engine
 * Full support for English (en), Urdu (ur), and Sindhi (sd) with RTL/LTR layout management.
 */

const FinFlowI18n = {
  currentLang: 'en', // default, can be 'en', 'ur', 'sd'

  languages: {
    en: { name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
    ur: { name: 'Urdu', nativeName: 'اردو', dir: 'rtl', flag: '🇵🇰' },
    sd: { name: 'Sindhi', nativeName: 'سنڌي', dir: 'rtl', flag: '🇵🇰' }
  },

  translations: {
    en: {
      appName: "Mazhar's Finances",
      appBadge: 'PRO',
      appSubtitle: 'Freelancer Finance',
      searchPlaceholder: 'Search clients, projects, categories, invoices...',
      
      // Periods
      periodAll: 'All Time',
      periodThisMonth: 'This Month',
      periodLastMonth: 'Last Month',
      periodThisYear: 'This Year (2026)',

      // Header Actions
      addIncome: 'Add Income',
      addExpense: 'Add Expense',

      // Navigation
      navDashboard: 'Dashboard',
      navIncomes: 'Income Record',
      navExpenses: 'Expense Manager',
      navInvoices: 'Invoices & Billing',
      navBudgets: 'Budget Tracker',
      navLoans: 'Loans & Debts',
      navTaxVault: 'Tax Shield Vault',
      navGoals: 'Savings & Gear',
      navSettings: 'Settings & Backup',

      // Health Meter
      healthMeterBadge: 'Financial Health Meter',
      healthExcellent: 'Excellent Stability',
      healthGood: 'Healthy Cashflow',
      healthModerate: 'Moderate - Watch Expenses',
      healthWarning: 'Cushion Recommended',
      healthGoalText: 'Goal: >80',
      bannerTitle: 'Freelancer Net Position & Runway',
      bannerDesc: 'Automatic calculation of safe-harbor tax reserves, liquid emergency runway cushion, and cash flow velocity.',
      stabilityIndex: 'Stability Index',

      // KPIs
      kpiGrossIncomeTitle: 'Realized Gross Income',
      kpiGrossIncomeSub: 'Cash collected in bank',
      kpiExpensesTitle: 'Total Business Expenses',
      kpiExpensesSub: 'Includes SaaS & gear write-offs',
      kpiNetProfitTitle: 'Net Freelancer Profit',
      kpiNetProfitSub: 'Gross - Total Expenses',
      kpiPendingTitle: 'Pending Receivables',
      kpiPendingSub: 'Uncollected client invoices',
      kpiTaxReserveTitle: 'Tax Safe-Harbor Reserve',
      kpiTaxSavingsTitle: 'Tax Write-Off Savings',
      kpiRunwayTitle: 'Emergency Buffer Runway',
      kpiDebtTitle: 'Active Debt Liabilities',

      // Dashboard Charts & Activity
      cashFlowTitle: 'Cash Flow & Monthly Trends',
      cashFlowSub: 'Income vs Expense vs Net Profit trajectory over last 6 months',
      spendingTitle: 'Spending Distribution',
      spendingSub: 'Categories & SaaS tool breakdowns',
      spendingFooter: 'Hover slices for category details and tax deductible share',
      topClientTitle: 'Top Client Revenue',
      topClientSub: 'Revenue share by client contract',
      recentLedgerTitle: 'Recent Ledger Activity',
      recentLedgerSub: 'Latest income receipts, write-offs, and expenditures',
      viewAllLedger: 'View All Ledger →',
      noTransactions: 'No transactions recorded yet.',

      // Incomes
      incomesTitle: 'Freelance Income Ledger',
      incomesSub: 'Track milestone payments, hourly contracts, retainers, and marketplace royalties',
      btnLogIncome: 'Log New Income',
      filterAllIncomes: 'All Incomes',
      filterPaid: 'Paid Only',
      filterPending: 'Pending',
      filterRetainers: 'Retainers',
      filterHourly: 'Hourly',
      thClientProject: 'Client & Project',
      thBillingModel: 'Billing Model',
      thPlatformInvoice: 'Platform & Invoice',
      thDate: 'Date',
      thAmount: 'Amount',
      thStatus: 'Status',
      thActions: 'Actions',
      statusPaid: 'Paid',
      statusPending: 'Pending',
      statusOverdue: 'Overdue',
      btnMarkPaid: 'Mark Paid',

      // Expenses
      expensesTitle: 'Expense & Tax Write-Off Tracker',
      expensesSub: 'Deduct software, office equipment, cloud hosting, and contractor payments to lower taxable income',
      btnLogExpense: 'Log Expense',
      filterAllExpenses: 'All Expenses',
      filterTaxDeductible: '100% / 50% Tax Write-Offs',
      filterPersonal: 'Personal Non-Deductible',
      thExpenseItem: 'Item & Description',
      thCategory: 'Category',
      thPaymentCycle: 'Payment & Cycle',
      thDeductibility: 'Tax Deductibility',
      writeOffBadge: 'Write-off',
      personalNonDeductible: 'Personal / Non-deductible',

      // Invoices
      invoicesTitle: 'Freelancer Invoices & Billing',
      invoicesSub: 'Generate branded client invoices, monitor due dates, and print PDF invoices',
      btnCreateInvoice: 'Create Invoice',
      thInvoiceNum: 'Invoice #',
      thClient: 'Client',
      thDates: 'Dates',
      thTotal: 'Total Amount',
      btnPreview: 'Preview',
      btnMarkInvoicePaid: 'Mark Paid',

      // Budgets
      budgetsTitle: 'Monthly Budget Limits',
      budgetsSub: 'Keep overhead and personal living costs within predetermined parameters',
      btnAddBudget: 'Add Category Budget',
      overBudgetBy: 'Over budget by',
      remainingAllowance: 'Remaining allowance',

      // Loans
      loansTitle: 'Loan & Debt Management',
      loansSub: 'Track hardware leases, bank credit lines, and money owed to you by collaborators',
      btnAddLoan: 'Add Loan / Debt',
      currentBalance: 'Current Balance',
      monthlyEMI: 'Monthly Payment (EMI)',
      interestRate: 'Interest (APR)',
      principal: 'Original Principal',
      repaid: 'Repaid',
      paidAmount: 'Paid',
      matures: 'Matures',
      btnLogPayment: 'Log Payment',
      paidInFull: 'Paid in Full',
      liabilityYouOwe: 'Liability (You Owe)',
      receivableOwedToYou: 'Receivable (Owed to You)',

      // Tax Vault
      taxVaultBadge: 'Freelancer Tax Safe-Harbor',
      taxVaultTitle: 'Tax Reserve & Write-Off Summary',
      taxVaultDesc: 'Freelancers are responsible for self-employment taxes. FinFlow automatically calculates your estimated quarterly tax obligations after accounting for legal deductions.',
      taxBracket: 'Assumed Tax Bracket',
      taxGross: 'Gross Paid Revenue',
      taxDeductions: 'Total Deductions',
      taxTaxable: 'Net Taxable Base',
      taxRecommended: 'Recommended Tax Vault',
      taxSaved: 'Tax Dollars Saved',
      taxTableTitle: 'Itemized Business Deductions for Accountant',
      btnExportScheduleC: 'Export Schedule C (CSV)',
      thGrossPaid: 'Gross Paid',
      thAllowable: 'Allowable Deduction',
      thTaxSavedCol: 'Tax Saved',

      // Goals
      goalsTitle: 'Savings & Studio Gear Goals',
      goalsSub: 'Set milestones for emergency cushions, equipment upgrades, and vacations',
      btnAddGoal: 'Add New Goal',
      target: 'Target',
      btnAddFunds: 'Add Funds',

      // Settings
      settingsTitle: 'Settings & Data Management',
      settingsSub: 'Configure your currency, tax parameters, business profile, and local backups',
      profileDefaults: 'Freelancer Profile & Defaults',
      lblFullName: 'Your Full Name',
      lblBusinessName: 'Business / Studio Name',
      lblEmail: 'Business Email',
      lblCurrency: 'Base Currency',
      lblTaxRate: 'Estimated Tax Rate Reserve (%)',
      lblBurnRate: 'Avg. Monthly Burn (for Runway calculation)',
      btnSavePreferences: 'Save Preferences',
      dataPortability: 'Data Portability & Local Backups',
      dataPortabilitySub: 'All data is kept 100% private in your browser LocalStorage. You can export complete snapshots anytime.',
      btnDownloadJSON: 'Download Full JSON Backup',
      btnExportCSV: 'Export All Transactions (CSV)',
      btnRestoreJSON: 'Restore from JSON',
      btnResetDemo: 'Reset to Sample Demo Data',
      btnClearAll: 'Clear All Data',

      // Modals
      modalAddIncomeTitle: 'Record Freelance Income',
      lblClientName: 'Client Name *',
      lblProjectName: 'Project / Contract *',
      lblAmount: 'Amount *',
      lblBillingType: 'Billing Type',
      lblStatus: 'Status',
      lblPaymentMethod: 'Payment Method',
      lblInvoiceNumber: 'Invoice Number',
      lblDate: 'Date *',
      lblNotes: 'Notes',
      btnCancel: 'Cancel',
      btnSaveIncome: 'Save Income',

      modalAddExpenseTitle: 'Record Business / Personal Expense',
      lblExpenseDesc: 'Expense Description *',
      lblCategory: 'Category *',
      lblFrequency: 'Frequency',
      chkTaxDeductible: 'Tax Deductible Business Expense',
      chkTaxDeductibleSub: 'Lowers your taxable freelance income',
      lblReceiptNotes: 'Receipt / Invoice Notes',
      btnSaveExpense: 'Save Expense',

      modalCreateInvoiceTitle: 'New Freelancer Invoice',
      lblClientEmail: 'Client Email',
      lblIssueDate: 'Issue Date',
      lblDueDate: 'Due Date',
      lblServiceDesc: 'Deliverable / Service',
      lblTaxRateOpt: 'Tax Rate % (Optional)',
      lblPaymentTerms: 'Payment Instructions',
      btnIssueInvoice: 'Create & Issue',

      modalLoanPaymentTitle: 'Log Loan Repayment',
      lblPaymentAmt: 'Payment Amount *',
      btnConfirmPayment: 'Confirm Payment',

      modalAddBudgetTitle: 'Add Budget Limit',
      lblMonthlyCap: 'Monthly Cap *',
      lblColor: 'Highlight Color',
      btnCreateBudget: 'Create Budget',

      modalAddGoalTitle: 'New Savings / Gear Goal',
      lblGoalTitle: 'Goal Title *',
      lblTargetAmt: 'Target *',
      lblSavedAmt: 'Saved So Far',
      lblTargetDate: 'Target Date',
      btnSaveGoal: 'Save Goal',

      // Invoices Preview
      invPrintTitle: 'INVOICE',
      invBilledTo: 'Billed To',
      invItemTh: 'Item & Description',
      invQtyTh: 'Qty',
      invRateTh: 'Rate',
      invAmountTh: 'Amount',
      invSubtotal: 'Subtotal',
      invTax: 'Tax',
      invTotalDue: 'Total Due',
      invPaymentNotesTitle: 'Payment Instructions & Notes:',
      btnPrintPDF: 'Print / Save as PDF'
    },

    ur: {
      appName: 'مظہر فنانسز',
      appBadge: 'پرو',
      appSubtitle: 'فری لانسر فنانس',
      searchPlaceholder: 'کلائنٹس، پروجیکٹس، کیٹیگریز اور انوائسز تلاش کریں...',

      // Periods
      periodAll: 'تمام وقت',
      periodThisMonth: 'اس مہینے',
      periodLastMonth: 'پچھلے مہینے',
      periodThisYear: 'اس سال (2026)',

      // Header Actions
      addIncome: 'آمدنی شامل کریں',
      addExpense: 'خرچ شامل کریں',

      // Navigation
      navDashboard: 'ڈیش بورڈ',
      navIncomes: 'آمدنی کا ریکارڈ',
      navExpenses: 'اخراجات کا انتظام',
      navInvoices: 'انوائس اور بلنگ',
      navBudgets: 'بجٹ ٹریکر',
      navLoans: 'قرض اور ادائیگیاں',
      navTaxVault: 'ٹیکس شیلڈ والٹ',
      navGoals: 'بچت اور آلات کے اہداف',
      navSettings: 'سیٹنگز اور بیک اپ',

      // Health Meter
      healthMeterBadge: 'مالی استحکام کا میٹر',
      healthExcellent: 'شاندار استحکام',
      healthGood: 'بہترین کیش فلو',
      healthModerate: 'معتدل - اخراجات پر نظر رکھیں',
      healthWarning: 'اضافی بچت کی ضرورت ہے',
      healthGoalText: 'ہدف: >80',
      bannerTitle: 'فری لانسر کی خالص مالی حیثیت اور رن وے',
      bannerDesc: 'ٹیکس محفوظ ذخائر، ہنگامی مالی کشن اور کیش فلو کی خودکار جانچ۔',
      stabilityIndex: 'استحکام انڈیکس',

      // KPIs
      kpiGrossIncomeTitle: 'وصول شدہ کل آمدنی',
      kpiGrossIncomeSub: 'بینک میں وصول شدہ نقد رقم',
      kpiExpensesTitle: 'کل کاروباری اخراجات',
      kpiExpensesSub: 'سافٹ ویئر اور آلات کے کٹوتی والے اخراجات',
      kpiNetProfitTitle: 'خالص فری لانسر منافع',
      kpiNetProfitSub: 'کل آمدنی منہا کل اخراجات',
      kpiPendingTitle: 'غیر وصول شدہ رقم',
      kpiPendingSub: 'کلائنٹس کے ذمے بقایا انوائسز',
      kpiTaxReserveTitle: 'ٹیکس محفوظ فنڈ',
      kpiTaxSavingsTitle: 'ٹیکس کٹوتیوں سے بچت',
      kpiRunwayTitle: 'ہنگامی فنڈ رن وے',
      kpiDebtTitle: 'واجب الادا قرضے',

      // Dashboard Charts & Activity
      cashFlowTitle: 'کیش فلو اور ماہانہ رجحانات',
      cashFlowSub: 'آمدنی، اخراجات اور خالص منافع کا پچھلے 6 ماہ کا تقابل',
      spendingTitle: 'اخراجات کی تقسیم',
      spendingSub: 'کیٹیگریز اور ٹولز کی بنیاد پر تفصیل',
      spendingFooter: 'تفصیلات اور ٹیکس کٹوتی دیکھنے کے لیے گراف پر ماؤس لائیں',
      topClientTitle: 'سب سے بڑے کلائنٹس کی آمدنی',
      topClientSub: 'کلائنٹس کے معاہدوں سے حاصل ہونے والی آمدنی',
      recentLedgerTitle: 'حالیہ لین دین کا ریکارڈ',
      recentLedgerSub: 'حالیہ وصولیاں، اخراجات اور ادائیگیاں',
      viewAllLedger: 'مکمل ریکارڈ دیکھیں ←',
      noTransactions: 'ابھی تک کوئی لین دین درج نہیں ہوا۔',

      // Incomes
      incomesTitle: 'فری لانس آمدنی کا کھاتہ',
      incomesSub: 'مائل اسٹونز، فی گھنٹہ آمدنی، ماہانہ ریٹینر اور رائلٹیز ٹریک کریں',
      btnLogIncome: 'نئی آمدنی درج کریں',
      filterAllIncomes: 'تمام آمدنی',
      filterPaid: 'صرف ادا شدہ',
      filterPending: 'زیر التواء',
      filterRetainers: 'ریٹینرز',
      filterHourly: 'فی گھنٹہ',
      thClientProject: 'کلائنٹ اور پروجیکٹ',
      thBillingModel: 'بلنگ کا طریقہ',
      thPlatformInvoice: 'پلیٹ فارم اور انوائس',
      thDate: 'تاریخ',
      thAmount: 'رقم',
      thStatus: 'حیثیت',
      thActions: 'اقدامات',
      statusPaid: 'ادا شدہ',
      statusPending: 'زیر التواء',
      statusOverdue: 'زائد المیعاد',
      btnMarkPaid: 'ادا شدہ نشان لگائیں',

      // Expenses
      expensesTitle: 'اخراجات اور ٹیکس کٹوتی ٹریکر',
      expensesSub: 'سافٹ ویئر، آفس کے سامان، ہوسٹنگ اور کنٹریکٹرز کے اخراجات درج کریں',
      btnLogExpense: 'خرچ درج کریں',
      filterAllExpenses: 'تمام اخراجات',
      filterTaxDeductible: '100% / 50% ٹیکس چھوٹ والے',
      filterPersonal: 'ذاتی (غیر کٹوتی والے)',
      thExpenseItem: 'مد اور تفصیل',
      thCategory: 'کیٹیگری',
      thPaymentCycle: 'ادائیگی اور مدت',
      thDeductibility: 'ٹیکس چھوٹ کی شرح',
      writeOffBadge: 'ٹیکس چھوٹ',
      personalNonDeductible: 'ذاتی / ٹیکس چھوٹ نہیں',

      // Invoices
      invoicesTitle: 'فری لانسر انوائسز اور بلنگ',
      invoicesSub: 'کلائنٹس کے لیے پیشہ ورانہ انوائسز بنائیں اور پی ڈی ایف پرنٹ کریں',
      btnCreateInvoice: 'نیا انوائس بنائیں',
      thInvoiceNum: 'انوائس نمبر',
      thClient: 'کلائنٹ',
      thDates: 'تواریخ',
      thTotal: 'کل رقم',
      btnPreview: 'معائنہ',
      btnMarkInvoicePaid: 'ادا شدہ قرار دیں',

      // Budgets
      budgetsTitle: 'ماہانہ بجٹ کی حدود',
      budgetsSub: 'اپنے ذاتی اور کاروباری اخراجات کو حدود میں رکھیں',
      btnAddBudget: 'نیا بجٹ شامل کریں',
      overBudgetBy: 'بجٹ سے تجاوز',
      remainingAllowance: 'باقی ماندہ گنجائش',

      // Loans
      loansTitle: 'قرض اور ادائیگیوں کا انتظام',
      loansSub: 'ہارڈ ویئر کی قسطیں، بینک قرض اور ساتھیوں کو دی گئی رقم ٹریک کریں',
      btnAddLoan: 'قرض شامل کریں',
      currentBalance: 'موجودہ واجب الادا رقم',
      monthlyEMI: 'ماہانہ قسط (EMI)',
      interestRate: 'سود کی شرح (APR)',
      principal: 'اصل رقم',
      repaid: 'ادا شدہ',
      paidAmount: 'ادا کردہ',
      matures: 'آخری تاریخ',
      btnLogPayment: 'قسط جمع کریں',
      paidInFull: 'مکمل ادا ہو چکا',
      liabilityYouOwe: 'قرض جو آپ نے دینا ہے (Liability)',
      receivableOwedToYou: 'رقم جو آپ کو ملنی ہے (Receivable)',

      // Tax Vault
      taxVaultBadge: 'فری لانسر ٹیکس سیف ہارڈ',
      taxVaultTitle: 'ٹیکس محفوظ فنڈ اور کٹوتیوں کا خلاصہ',
      taxVaultDesc: 'فری لانسرز خود اپنے ٹیکسز کے ذمہ دار ہوتے ہیں۔ فن فلو قانونی کٹوتیوں کے بعد آپ کے ٹیکس فنڈ کا خودکار حساب لگاتا ہے۔',
      taxBracket: 'متوقع ٹیکس بریکٹ',
      taxGross: 'کل وصول شدہ آمدنی',
      taxDeductions: 'کل قابلِ چھوٹ اخراجات',
      taxTaxable: 'خالص قابلِ ٹیکس رقم',
      taxRecommended: 'تجویز کردہ ٹیکس فنڈ',
      taxSaved: 'ٹیکس کٹوتیوں سے بچت',
      taxTableTitle: 'اکاؤنٹنٹ کے لیے تفصیلی کاروباری کٹوتیاں',
      btnExportScheduleC: 'شیڈول سی برآمد کریں (CSV)',
      thGrossPaid: 'کل ادا شدہ',
      thAllowable: 'مجاز ٹیکس کٹوتی',
      thTaxSavedCol: 'بچایا گیا ٹیکس',

      // Goals
      goalsTitle: 'بچت اور آلات کے اہداف',
      goalsSub: 'ایمرجنسی فنڈ، نئے لیپ ٹاپ اور آلات کی خریداری کے لیے اہداف مقرر کریں',
      btnAddGoal: 'نیا ہدف شامل کریں',
      target: 'ہدف',
      btnAddFunds: 'رقم شامل کریں',

      // Settings
      settingsTitle: 'سیٹنگز اور ڈیٹا مینجمنٹ',
      settingsSub: 'کرنسی، ٹیکس کی شرح، کاروباری پروفائل اور بیک اپ سیٹ کریں',
      profileDefaults: 'فری لانسر پروفائل اور بنیادی ترتیبات',
      lblFullName: 'آپ کا پورا نام',
      lblBusinessName: 'کاروبار یا اسٹوڈیو کا نام',
      lblEmail: 'کاروباری ای میل',
      lblCurrency: 'بنیادی کرنسی',
      lblTaxRate: 'متوقع ٹیکس کی شرح (%)',
      lblBurnRate: 'اوسط ماہانہ اخراجات (رن وے کے حساب کے لیے)',
      btnSavePreferences: 'ترتیبات محفوظ کریں',
      dataPortability: 'ڈیٹا کا تحفظ اور مقامی بیک اپ',
      dataPortabilitySub: 'آپ کا تمام ڈیٹا مکمل طور پر آپ کے براؤزر کے لوکل اسٹوریج میں نجی اور محفوظ رہتا ہے۔',
      btnDownloadJSON: 'مکمل JSON بیک اپ ڈاؤن لوڈ کریں',
      btnExportCSV: 'تمام ٹرانزیکشنز CSV میں برآمد کریں',
      btnRestoreJSON: 'JSON بیک اپ بحال کریں',
      btnResetDemo: 'نمونہ ڈیمو ڈیٹا بحال کریں',
      btnClearAll: 'تمام ڈیٹا صاف کریں',

      // Modals
      modalAddIncomeTitle: 'فری لانس آمدنی درج کریں',
      lblClientName: 'کلائنٹ کا نام *',
      lblProjectName: 'پروجیکٹ یا معاہدہ *',
      lblAmount: 'رقم *',
      lblBillingType: 'بلنگ کا طریقہ',
      lblStatus: 'حیثیت',
      lblPaymentMethod: 'ادائیگی کا ذریعہ',
      lblInvoiceNumber: 'انوائس نمبر',
      lblDate: 'تاریخ *',
      lblNotes: 'نوٹس',
      btnCancel: 'منسوخ کریں',
      btnSaveIncome: 'آمدنی محفوظ کریں',

      modalAddExpenseTitle: 'کاروباری یا ذاتی خرچ درج کریں',
      lblExpenseDesc: 'خرچ کی تفصیل *',
      lblCategory: 'کیٹیگری *',
      lblFrequency: 'تعدد (بار بار ہونے والا)',
      chkTaxDeductible: 'کاروباری ٹیکس کٹوتی کے لیے مجاز',
      chkTaxDeductibleSub: 'آپ کی قابلِ ٹیکس آمدنی کو کم کرتا ہے',
      lblReceiptNotes: 'رسید یا انوائس کا حوالہ',
      btnSaveExpense: 'خرچ محفوظ کریں',

      modalCreateInvoiceTitle: 'نیا فری لانسر انوائس',
      lblClientEmail: 'کلائنٹ کا ای میل',
      lblIssueDate: 'جاری کرنے کی تاریخ',
      lblDueDate: 'ادائیگی کی آخری تاریخ',
      lblServiceDesc: 'خدمات یا ڈلیوریبل کی تفصیل',
      lblTaxRateOpt: 'ٹیکس شرح % (اختیاری)',
      lblPaymentTerms: 'ادائیگی کی ہدایات',
      btnIssueInvoice: 'انوائس جاری کریں',

      modalLoanPaymentTitle: 'قرض کی قسط درج کریں',
      lblPaymentAmt: 'قسط کی رقم *',
      btnConfirmPayment: 'ادائیگی کی تصدیق کریں',

      modalAddBudgetTitle: 'بجٹ کی حد مقرر کریں',
      lblMonthlyCap: 'ماہانہ حد *',
      lblColor: 'نمایاں رنگ',
      btnCreateBudget: 'بجٹ محفوظ کریں',

      modalAddGoalTitle: 'نیا بچت کا ہدف',
      lblGoalTitle: 'ہدف کا عنوان *',
      lblTargetAmt: 'مطلوبہ ہدف *',
      lblSavedAmt: 'اب تک کی بچت',
      lblTargetDate: 'ہدف کی تاریخ',
      btnSaveGoal: 'ہدف محفوظ کریں',

      // Invoices Preview
      invPrintTitle: 'انوائس',
      invBilledTo: 'بل بنام',
      invItemTh: 'مد اور تفصیل',
      invQtyTh: 'تعداد',
      invRateTh: 'شرح',
      invAmountTh: 'رقم',
      invSubtotal: 'سب ٹوٹل',
      invTax: 'ٹیکس',
      invTotalDue: 'کل واجب الادا رقم',
      invPaymentNotesTitle: 'ادائیگی کی ہدایات اور نوٹس:',
      btnPrintPDF: 'پرنٹ کریں / PDF محفوظ کریں'
    },

    sd: {
      appName: 'مظهر فنانسز',
      appBadge: 'پرو',
      appSubtitle: 'فري لانسر فنانس',
      searchPlaceholder: 'ڪلائنٽ، پروجيڪٽ، ڪيٽيگريز ۽ انوائس ڳوليو...',

      // Periods
      periodAll: 'سڀئي وقت',
      periodThisMonth: 'هن مهيني',
      periodLastMonth: 'گذريل مهيني',
      periodThisYear: 'هن سال (2026)',

      // Header Actions
      addIncome: 'آمدني شامل ڪريو',
      addExpense: 'خرچ شامل ڪريو',

      // Navigation
      navDashboard: 'ڊيش بورڊ',
      navIncomes: 'آمدني جو رڪارڊ',
      navExpenses: 'خرچن جو انتظام',
      navInvoices: 'انوائس ۽ بلنگ',
      navBudgets: 'بجيٽ ٽريڪر',
      navLoans: 'قرض ۽ ادائيگيون',
      navTaxVault: 'ٽئڪس شيلڊ والٽ',
      navGoals: 'بچت ۽ سامان جا مقصد',
      navSettings: 'سيٽنگون ۽ بئڪ اپ',

      // Health Meter
      healthMeterBadge: 'مالي استحڪام جو ميٽر',
      healthExcellent: 'شاندار استحڪام',
      healthGood: 'بهترين ڪيش فلو',
      healthModerate: 'معتدل - خرچن تي نظر رکو',
      healthWarning: 'اضافي بچت جي ضرورت آهي',
      healthGoalText: 'مقصد: >80',
      bannerTitle: 'فري لانسر جي خالص مالي حيثيت ۽ رن وي',
      bannerDesc: 'ٽئڪس جا محفوظ ذخيرا، هنگامي مالي پٺڀرائي ۽ ڪيش فلو جو خودڪار حساب ڪتاب۔',
      stabilityIndex: 'استحڪام انڊيڪس',

      // KPIs
      kpiGrossIncomeTitle: 'مليل ڪل آمدني',
      kpiGrossIncomeSub: 'بئنڪ ۾ وصول ٿيل روڪ رقم',
      kpiExpensesTitle: 'ڪل ڪاروباري خرچ',
      kpiExpensesSub: 'سافٽ ويئر ۽ اوزارن جي ڪٽوتي وارا خرچ',
      kpiNetProfitTitle: 'خالص فري لانسر منافعو',
      kpiNetProfitSub: 'ڪل آمدني مان ڪل خرچ ڪڍي',
      kpiPendingTitle: 'اڻ مليل رقم / بقايا',
      kpiPendingSub: 'ڪلائنٽس وٽ باقي رهيل انوائسز',
      kpiTaxReserveTitle: 'ٽئڪس محفوظ فنڊ',
      kpiTaxSavingsTitle: 'ٽئڪس ڇوٽ مان بچت',
      kpiRunwayTitle: 'هنگامي فنڊ رن وي',
      kpiDebtTitle: 'واجب الادا قرض',

      // Dashboard Charts & Activity
      cashFlowTitle: 'ڪيش فلو ۽ ماهوار لاڙا',
      cashFlowSub: 'آمدني، خرچن ۽ خالص منافعي جو گذريل 6 مهينن جو جائزو',
      spendingTitle: 'خرچن جي ورڇ',
      spendingSub: 'ڪيٽيگريز ۽ ٽولز جي بنياد تي ورهاست',
      spendingFooter: 'تفصيل ۽ ٽئڪس ڪٽوتي ڏسڻ لاءِ گراف تي ماؤس آڻيو',
      topClientTitle: 'مکيه ڪلائنٽس مان آمدني',
      topClientSub: 'ڪلائنٽس جي معاهدن مان مليل آمدني',
      recentLedgerTitle: 'تازو کاتو ۽ ڏيتي ليتي',
      recentLedgerSub: 'تازيون آمدنيون، خرچ ۽ ادائيگيون',
      viewAllLedger: 'مڪمل رڪارڊ ڏسو ←',
      noTransactions: 'في الحال ڪو به ڏيتي ليتي رڪارڊ ٿيل ناهي۔',

      // Incomes
      incomesTitle: 'فري لانس آمدني جو کاتو',
      incomesSub: 'مائل اسٽون، في ڪلاڪ آمدني، ماهوار رٽينر ۽ رائلٽيز ٽريڪ ڪريو',
      btnLogIncome: 'نئين آمدني درج ڪريو',
      filterAllIncomes: 'سڀئي آمدنيون',
      filterPaid: 'صرف ادا ٿيل',
      filterPending: 'باقي رهيل',
      filterRetainers: 'رٽينرز',
      filterHourly: 'في ڪلاڪ',
      thClientProject: 'ڪلائنٽ ۽ پروجيڪٽ',
      thBillingModel: 'بلنگ جو نمونو',
      thPlatformInvoice: 'پليٽ فارم ۽ انوائس',
      thDate: 'تاريخ',
      thAmount: 'رقم',
      thStatus: 'حالت',
      thActions: 'ڪارروائي',
      statusPaid: 'ادا ٿيل',
      statusPending: 'باقي',
      statusOverdue: 'مدي خارج',
      btnMarkPaid: 'ادا ٿيل لکو',

      // Expenses
      expensesTitle: 'خرچ ۽ ٽئڪس ڪٽوتي ٽريڪر',
      expensesSub: 'سافٽ ويئر، آفيس سامان، هوسٽنگ ۽ ٺيڪيدارن جا خرچ درج ڪري ٽئڪس گهٽايو',
      btnLogExpense: 'خرچ درج ڪريو',
      filterAllExpenses: 'سڀئي خرچ',
      filterTaxDeductible: '100% / 50% ٽئڪس ڇوٽ وارا',
      filterPersonal: 'ذاتي (غير ڪٽوتي وارا)',
      thExpenseItem: 'خرچ جي مد ۽ تفصيل',
      thCategory: 'ڪيٽيگري',
      thPaymentCycle: 'ادائيگي جو طريقو',
      thDeductibility: 'ٽئڪس ڇوٽ جي شرح',
      writeOffBadge: 'ٽئڪس ڇوٽ',
      personalNonDeductible: 'ذاتي / ٽئڪس ڇوٽ ناهي',

      // Invoices
      invoicesTitle: 'فري لانسر انوائسز ۽ بلنگ',
      invoicesSub: 'ڪلائنٽس لاءِ پيشيوراڻا انوائسز ٺاهيو ۽ پي ڊي ايف پرنٽ ڪريو',
      btnCreateInvoice: 'نئون انوائس ٺاهيو',
      thInvoiceNum: 'انوائس نمبر',
      thClient: 'ڪلائنٽ',
      thDates: 'تاريخون',
      thTotal: 'ڪل رقم',
      btnPreview: 'معائنو',
      btnMarkInvoicePaid: 'ادا ٿيل لکو',

      // Budgets
      budgetsTitle: 'ماهوار بجيٽ جون حدون',
      budgetsSub: 'پنهنجي ذاتي ۽ ڪاروباري خرچن کي حدن اندر رکو',
      btnAddBudget: 'نئين بجيٽ حد ٺاهيو',
      overBudgetBy: 'بجيٽ کان مٿي خرچ',
      remainingAllowance: 'باقي بچيل گنجائش',

      // Loans
      loansTitle: 'قرض ۽ ادائيگين جو انتظام',
      loansSub: 'هارڊويئر قسطون، بئنڪ قرض ۽ دوستن کي ڏنل قرض جو رڪارڊ',
      btnAddLoan: 'قرض شامل ڪريو',
      currentBalance: 'موجوده واجب الادا رقم',
      monthlyEMI: 'ماهوار قسط (EMI)',
      interestRate: 'سود جي شرح (APR)',
      principal: 'اصل رقم',
      repaid: 'ادا ٿيل',
      paidAmount: 'ادا ڪيل',
      matures: 'آخري تاريخ',
      btnLogPayment: 'قسط ادا ڪريو',
      paidInFull: 'مڪمل ادا ٿي ويو',
      liabilityYouOwe: 'قرض جيڪو توهان تي آهي (Liability)',
      receivableOwedToYou: 'رقم جيڪا توهان کي ملڻي آهي (Receivable)',

      // Tax Vault
      taxVaultBadge: 'فري لانسر ٽئڪس سيف گارڊ',
      taxVaultTitle: 'ٽئڪس محفوظ فنڊ ۽ ڪٽوتين جو تت',
      taxVaultDesc: 'فري لانسرز پاڻ پنهنجي ٽئڪس جا ذميوار هوندا آهن. فن فلو قانوني ڪٽوتين کان پوءِ توهان جي محفوظ ٽئڪس جو پاڻمرادو حساب لڳائي ٿو.',
      taxBracket: 'اندازيل ٽئڪس بريڪٽ',
      taxGross: 'ڪل وصول ٿيل آمدني',
      taxDeductions: 'ڪل ٽئڪس ڇوٽ وارا خرچ',
      taxTaxable: 'خالص ٽئڪس لائق رقم',
      taxRecommended: 'تجويز ڪيل ٽئڪس فنڊ',
      taxSaved: 'ٽئڪس ڇوٽ مان بچت',
      taxTableTitle: 'اڪائونٽنٽ لاءِ تفصيلي ڪاروباري ڪٽوتيون',
      btnExportScheduleC: 'شيڊول سي ايڪسپورٽ ڪريو (CSV)',
      thGrossPaid: 'ڪل ادا ٿيل',
      thAllowable: 'مجاز ٽئڪس ڪٽوتي',
      thTaxSavedCol: 'بچايل ٽئڪس',

      // Goals
      goalsTitle: 'بچت ۽ سامان جا مقصد',
      goalsSub: 'هنگامي فنڊ، نئين ليپ ٽاپ ۽ اسٽوڊيو سامان جي خريداري جا مقصد',
      btnAddGoal: 'نئون مقصد شامل ڪريو',
      target: 'مقصد',
      btnAddFunds: 'رقم وڌايو',

      // Settings
      settingsTitle: 'سيٽنگون ۽ ڊيٽا انتظام',
      settingsSub: 'ڪرنسي، ٽئڪس شرح، پروفائل ۽ مقامي بيڪ اپ محفوظ ڪريو',
      profileDefaults: 'فري لانسر پروفائل ۽ بنيادي ترتيبيون',
      lblFullName: 'توهان جو پورو نالو',
      lblBusinessName: 'ڪاروبار يا اسٽوڊيو جو نالو',
      lblEmail: 'ڪاروباري اي ميل',
      lblCurrency: 'بنيادي ڪرنسي',
      lblTaxRate: 'اندازيل ٽئڪس جي شرح (%)',
      lblBurnRate: 'سراسري ماهوار خرچ (رن وي حساب لاءِ)',
      btnSavePreferences: 'ترتيبيون محفوظ ڪريو',
      dataPortability: 'ڊيٽا جو تحفظ ۽ مقامي بيڪ اپ',
      dataPortabilitySub: 'توهان جو سمورو ڊيٽا براؤزر جي لوڪل اسٽوريج ۾ پرائيويٽ ۽ محفوظ رهندو آهي.',
      btnDownloadJSON: 'مڪمل JSON بيڪ اپ ڊائون لوڊ ڪريو',
      btnExportCSV: 'سموري ڏيتي ليتي CSV ۾ برآمد ڪريو',
      btnRestoreJSON: 'JSON مان بيڪ اپ بحال ڪريو',
      btnResetDemo: 'نمونو ڊيمو ڊيٽا وري لوڊ ڪريو',
      btnClearAll: 'سمورو ڊيٽا ختم ڪريو',

      // Modals
      modalAddIncomeTitle: 'فري لانس آمدني درج ڪريو',
      lblClientName: 'ڪلائنٽ جو نالو *',
      lblProjectName: 'پروجيڪٽ يا معاهدو *',
      lblAmount: 'رقم *',
      lblBillingType: 'بلنگ جو طريقو',
      lblStatus: 'حالت',
      lblPaymentMethod: 'ادائيگي جو ذريعو',
      lblInvoiceNumber: 'انوائس نمبر',
      lblDate: 'تاريخ *',
      lblNotes: 'نوٽس',
      btnCancel: 'رد ڪريو',
      btnSaveIncome: 'آمدني محفوظ ڪريو',

      modalAddExpenseTitle: 'ڪاروباري يا ذاتي خرچ درج ڪريو',
      lblExpenseDesc: 'خرچ جي تفصيل *',
      lblCategory: 'ڪيٽيگري *',
      lblFrequency: 'تعدد (بار بار ٿيندڙ)',
      chkTaxDeductible: 'ڪاروباري ٽئڪس ڇوٽ لائق',
      chkTaxDeductibleSub: 'توهان جي ٽئڪس لائق آمدني کي گهٽائي ٿو',
      lblReceiptNotes: 'رسيد يا انوائس جو حوالو',
      btnSaveExpense: 'خرچ محفوظ ڪريو',

      modalCreateInvoiceTitle: 'نئون فري لانسر انوائس',
      lblClientEmail: 'ڪلائنٽ جي اي ميل',
      lblIssueDate: 'جاري ڪرڻ جي تاريخ',
      lblDueDate: 'آخري تاريخ',
      lblServiceDesc: 'خدمتون يا ڪم جي تفصيل',
      lblTaxRateOpt: 'ٽئڪس جي شرح % (اختياري)',
      lblPaymentTerms: 'ادائيگي جون هدايتون',
      btnIssueInvoice: 'انوائس جاري ڪريو',

      modalLoanPaymentTitle: 'قرض جي قسط درج ڪريو',
      lblPaymentAmt: 'قسط جي رقم *',
      btnConfirmPayment: 'ادائيگي جي تصديق ڪريو',

      modalAddBudgetTitle: 'بجيٽ جي حد مقرر ڪريو',
      lblMonthlyCap: 'ماهوار حد *',
      lblColor: 'رنگ چونڊيو',
      btnCreateBudget: 'بجيٽ محفوظ ڪريو',

      modalAddGoalTitle: 'نئون بچت جو مقصد',
      lblGoalTitle: 'مقصد جو عنوان *',
      lblTargetAmt: 'مطلوب رقم *',
      lblSavedAmt: 'هن وقت تائين بچايل رقم',
      lblTargetDate: 'آخري تاريخ',
      btnSaveGoal: 'مقصد محفوظ ڪريو',

      // Invoices Preview
      invPrintTitle: 'انوائس',
      invBilledTo: 'بل ڏانهن',
      invItemTh: 'مد ۽ تفصيل',
      invQtyTh: 'تعداد',
      invRateTh: 'شرح',
      invAmountTh: 'رقم',
      invSubtotal: 'سب ٽوٽل',
      invTax: 'ٽئڪس',
      invTotalDue: 'ڪل واجب الادا رقم',
      invPaymentNotesTitle: 'ادائيگي جون هدايتون ۽ نوٽس:',
      btnPrintPDF: 'پرنٽ ڪريو / PDF محفوظ ڪريو'
    }
  },

  init() {
    const saved = localStorage.getItem('finflow_lang') || 'en';
    this.setLanguage(saved, false);
  },

  setLanguage(langCode, triggerRender = true) {
    if (!this.languages[langCode]) langCode = 'en';
    this.currentLang = langCode;
    localStorage.setItem('finflow_lang', langCode);

    const langInfo = this.languages[langCode];
    document.documentElement.lang = langCode;
    document.documentElement.dir = langInfo.dir;

    if (langInfo.dir === 'rtl') {
      document.documentElement.classList.add('rtl-layout');
      document.body.classList.add('font-urdu-sindhi');
    } else {
      document.documentElement.classList.remove('rtl-layout');
      document.body.classList.remove('font-urdu-sindhi');
    }

    // Update active state on language buttons
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const code = btn.getAttribute('data-lang-btn');
      if (code === langCode) {
        btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'font-bold', 'border-emerald-500/40');
        btn.classList.remove('text-slate-400', 'border-transparent');
      } else {
        btn.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'font-bold', 'border-emerald-500/40');
        btn.classList.add('text-slate-400', 'border-transparent');
      }
    });

    this.translateDOM();

    if (triggerRender && window.finFlowApp) {
      window.finFlowApp.render();
    }
  },

  t(key, fallback = '') {
    const dict = this.translations[this.currentLang] || this.translations.en;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to English
    if (this.translations.en && this.translations.en[key] !== undefined) {
      return this.translations.en[key];
    }
    return fallback || key;
  },

  translateDOM() {
    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation) {
        el.title = translation;
      }
    });
  }
};

window.FinFlowI18n = FinFlowI18n;
