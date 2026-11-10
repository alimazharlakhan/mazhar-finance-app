# ⚡ Mazhar's Finances - Freelancer Finance & Wealth Suite
### مظهر فنانسز (Sindhi) | مظہر فنانسز (Urdu) | English

**Mazhar's Finances** is an eye-catching, user-friendly, and comprehensive financial management web application engineered specifically for freelance management and tracking.

It now features **complete native trilingual support (Sindhi, Urdu, and English)** with dynamic **RTL (Right-to-Left)** layout adaptation and **Pakistani Rupee (PKR - ₨)** as the primary currency!

---

## 🇵🇰 Multilingual & Localized Features

### 1. 🌐 Trilingual Selection (Sindhi / Urdu / English)
- **سنڌي (Complete Sindhi)**: مڪمل سنڌي ترجمو ۽ سنڌي فونٽس (Noto Sans Arabic & Sindhi) سان گڏ. سڀئي ڊيش بورڊ، آمدني، خرچ، انوائس، قرض ۽ سيٽنگون سنڌي ۾ موجود آهن.
- **اردو (Complete Urdu)**: مکمل اردو ترجمہ اور خطِ نستعلیق/عربی فونٹس کے ساتھ۔ ڈیش بورڈ، انوائسز، کیش فلو اور بجٹ ٹریکر اردو میں دستیاب ہیں۔
- **English**: Full international English interface.
- **RTL & LTR Automatic Switching**: Changing the language instantly shifts the text direction (`dir="rtl"` or `dir="ltr"`), aligns tables, and updates charts smoothly.

### 2. ₨ Pakistani Rupee (PKR) Primary Currency
- All default calculations, KPIs, budgets, loans, and invoices are now calibrated in **Pakistani Rupees (₨)**.
- Localized payment channels supported: **Bank Transfer / Wire, Raast, Sadapay, Nayapay, JazzCash, Payoneer, Wise, and Stripe**.
- Built-in Lakhs / Crores / Thousands formatting (`formatCompactCurrency`).

---

## 🌟 Core Freelancer Modules

| Module | سنڌي (Sindhi) | اردو (Urdu) | Description |
| :--- | :--- | :--- | :--- |
| **📊 Dashboard** | **ڊيش بورڊ** | **ڈیش بورڈ** | Financial Health Index (0-100), Emergency Runway (Months), Gross Income, Total Expenses, and Net Profit. |
| **📈 Charts** | **ڪيش فلو چارٽس** | **کیش فلو چارٹس** | 6-Month Cash Flow trajectory (Bar + Line), Spending distribution donut, and top client revenue bar chart. |
| **💰 Incomes** | **آمدني جو کاتو** | **آمدنی کا کھاتہ** | Track Milestone, Hourly, Retainer, and Royalties. Instant "Mark as Paid" with confetti. |
| **🧾 Expenses** | **خرچن جو انتظام** | **اخراجات کا انتظام** | Tag 100% and 50% business tax write-offs (SaaS tools, coworking, hardware) and track tax savings. |
| **📄 Invoices** | **انوائس ۽ بلنگ** | **انوائس اور بلنگ** | Create client invoices with itemized rates and instant **Print-to-PDF** view. |
| **🎛️ Budgets** | **بجيٽ ٽريڪر** | **بجٹ ٹریکر** | Category spending limits with real-time progress bars and over-budget alerts. |
| **🏛️ Loans & Debt** | **قرض ۽ ادائيگيون** | **قرض اور ادائیگیاں** | Track equipment installments (Bank Alfalah, HBL) and friend advances. Log payments with instant balance update. |
| **🛡️ Tax Vault** | **ٽئڪس شيلڊ والٽ** | **ٹیکس شیلڈ والٹ** | Auto-calculate safe-harbor tax reserves (e.g. 15% standard/withholding tax) and generate accountant reports. |
| **🎯 Goals** | **بچت جا مقصد** | **بچت کے اہداف** | Emergency buffer, studio setup, and gear goals with visual progress rings. |
| **⚙️ Settings** | **سيٽنگون ۽ بئڪ اپ** | **سیٹنگز اور بیک اپ** | LocalStorage backup/restore, CSV export, theme toggle, and profile settings. |

---

## 🚀 How to Launch the Application

### Option 1: Direct Double Click
Double click [`start.bat`](file:///C:/Users/malik%20computer/.gemini/antigravity/scratch/finflow-pro/start.bat) or open [`index.html`](file:///C:/Users/malik%20computer/.gemini/antigravity/scratch/finflow-pro/index.html) in Chrome or Edge.

### Option 2: Local Server (Port 8080)
Open PowerShell in the folder and run:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

---

## 📁 Directory Structure

```
finflow-pro/
├── index.html          # Main HTML structure with i18n hooks and language switcher
├── start.bat           # 1-Click Windows browser launcher
├── server.ps1          # Lightweight PowerShell HTTP server
├── css/
│   └── style.css       # Glassmorphism, animations, print invoice, and RTL Arabic/Urdu typography
├── js/
│   ├── i18n.js         # Complete translation dictionary for Sindhi, Urdu, and English
│   ├── store.js        # LocalStorage store initialized with Pakistani Rupee (PKR) demo data
│   ├── models.js       # PKR currency formatting, KPI formulas & EMI calculator
│   ├── charts.js       # Multi-language responsive Chart.js engine
│   └── app.js          # App controller, tabs, modals, and reactive re-rendering
└── README.md           # Documentation
```
