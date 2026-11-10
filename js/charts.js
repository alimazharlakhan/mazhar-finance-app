/**
 * FinFlow Pro - Interactive Chart.js Engine
 * Multilingual-aware, responsive, dark/light aware.
 */

class FinFlowCharts {
  constructor() {
    this.cashFlowChart = null;
    this.expenseDonutChart = null;
    this.clientBarChart = null;
  }

  isDark() {
    return document.documentElement.classList.contains('dark');
  }

  getThemeColors() {
    const dark = this.isDark();
    return {
      textColor: dark ? '#94a3b8' : '#475569',
      gridColor: dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
      tooltipBg: dark ? '#0f172a' : '#ffffff',
      tooltipText: dark ? '#f8fafc' : '#0f172a',
      tooltipBorder: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    };
  }

  renderCashFlowChart(canvasId, trends, currency = 'PKR') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = this.getThemeColors();
    const t = (k, def) => window.FinFlowI18n ? window.FinFlowI18n.t(k, def) : def;

    if (this.cashFlowChart) {
      this.cashFlowChart.destroy();
    }

    const labels = trends.map(t => t.label);
    const incomeData = trends.map(t => t.income);
    const expenseData = trends.map(t => t.expense);
    const netData = trends.map(t => t.net);

    this.cashFlowChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: t('kpiGrossIncomeTitle', 'Income Received'),
            data: incomeData,
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
            borderRadius: 6,
            borderSkipped: false,
            order: 2
          },
          {
            label: t('kpiExpensesTitle', 'Expenses Paid'),
            data: expenseData,
            backgroundColor: 'rgba(239, 68, 68, 0.75)',
            hoverBackgroundColor: 'rgba(239, 68, 68, 1)',
            borderRadius: 6,
            borderSkipped: false,
            order: 2
          },
          {
            label: t('kpiNetProfitTitle', 'Net Cash Flow'),
            data: netData,
            type: 'line',
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            borderWidth: 2.5,
            pointBackgroundColor: '#818cf8',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.35,
            fill: false,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: colors.textColor,
              font: { family: "'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif", size: 12, weight: 500 },
              usePointStyle: true,
              boxWidth: 8,
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${FinFlowModels.formatCurrency(context.parsed.y, currency)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: colors.textColor,
              font: { family: "'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif", size: 11 }
            }
          },
          y: {
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.textColor,
              font: { family: "'JetBrains Mono', monospace", size: 11 },
              callback: function(val) {
                return FinFlowModels.formatCompactCurrency(val, currency);
              }
            }
          }
        }
      }
    });
  }

  renderExpenseDonut(canvasId, breakdown, currency = 'PKR') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = this.getThemeColors();

    if (this.expenseDonutChart) {
      this.expenseDonutChart.destroy();
    }

    if (!breakdown || breakdown.labels.length === 0) {
      return;
    }

    this.expenseDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: breakdown.labels,
        datasets: [{
          data: breakdown.data,
          backgroundColor: breakdown.colors,
          borderWidth: 2,
          borderColor: this.isDark() ? '#111827' : '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const val = context.parsed;
                const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                return ` ${context.label}: ${FinFlowModels.formatCurrency(val, currency)} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }

  renderClientBarChart(canvasId, clientData, currency = 'PKR') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = this.getThemeColors();
    const t = (k, def) => window.FinFlowI18n ? window.FinFlowI18n.t(k, def) : def;

    if (this.clientBarChart) {
      this.clientBarChart.destroy();
    }

    const labels = clientData.labels.slice(0, 5);
    const data = clientData.data.slice(0, 5);

    this.clientBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: t('thAmount', 'Revenue'),
          data: data,
          backgroundColor: [
            'rgba(99, 102, 241, 0.85)',
            'rgba(16, 185, 129, 0.85)',
            'rgba(6, 182, 212, 0.85)',
            'rgba(245, 158, 11, 0.85)',
            'rgba(139, 92, 246, 0.85)'
          ],
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${t('thAmount', 'Revenue')}: ${FinFlowModels.formatCurrency(ctx.parsed.x, currency)}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.textColor,
              font: { family: "'JetBrains Mono', monospace", size: 10 },
              callback: (val) => FinFlowModels.formatCompactCurrency(val, currency)
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: colors.textColor,
              font: { family: "'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif", size: 11, weight: 500 }
            }
          }
        }
      }
    });
  }

  updateAll(data) {
    const currency = data.settings.currency || 'PKR';
    const trends = FinFlowModels.getCashFlowTrend(data.incomes, data.expenses, 6);
    this.renderCashFlowChart('cashFlowChart', trends, currency);

    const expenseBreakdown = FinFlowModels.getCategoryBreakdown(data.expenses);
    this.renderExpenseDonut('expenseDonutChart', expenseBreakdown, currency);

    const clientBreakdown = FinFlowModels.getClientRevenueBreakdown(data.incomes);
    this.renderClientBarChart('clientRevenueChart', clientBreakdown, currency);
  }
}

window.finFlowCharts = new FinFlowCharts();
