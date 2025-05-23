export function calculateHelpRepayment(incomeVal) {
    const thresholds = [
      { min:151201, rate:0.10 },
      { min:125000, rate:0.09 },
      { min:110000, rate:0.08 },
      { min:100000, rate:0.07 },
      { min: 90000, rate:0.06 },
      { min: 83000, rate:0.05 },
      { min: 75000, rate:0.04 },
      { min: 68000, rate:0.03 },
      { min: 59618, rate:0.02 },
      { min: 51550, rate:0.01 }
    ];
    for (const t of thresholds) {
      if (incomeVal > t.min) return incomeVal * t.rate;
    }
    return 0;
  }
  