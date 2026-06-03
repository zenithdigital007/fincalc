export function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: principal }
  }

  const monthlyRate = annualRate / 12 / 100
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)

  const totalPayment = emi * tenureMonths
  const totalInterest = totalPayment - principal

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  }
}

export function generateAmortizationSchedule(principal: number, annualRate: number, tenureMonths: number, emi: number) {
  let balance = principal
  const monthlyRate = annualRate / 12 / 100
  const schedule = []

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPaid = balance * monthlyRate
    let principalPaid = emi - interestPaid

    // Adjust for the last month due to rounding differences
    if (month === tenureMonths) {
      principalPaid = balance
      balance = 0
    } else {
      balance -= principalPaid
    }

    schedule.push({
      month,
      principalPaid: Math.round(principalPaid),
      interestPaid: Math.round(interestPaid),
      balance: Math.max(0, Math.round(balance)),
    })
  }

  return schedule
}

export function calculateSIP(monthlyInvestment: number, annualRate: number, tenureYears: number) {
  if (monthlyInvestment <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return { investedAmount: 0, estimatedReturn: 0, totalValue: 0 }
  }

  const monthlyRate = annualRate / 12 / 100
  const months = tenureYears * 12

  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate)

  const investedAmount = monthlyInvestment * months
  const estimatedReturn = futureValue - investedAmount

  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturn: Math.round(estimatedReturn),
    totalValue: Math.round(futureValue),
  }
}

export function calculateFD(principal: number, annualRate: number, tenureYears: number) {
  if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return { investedAmount: principal, estimatedReturn: 0, totalValue: principal }
  }

  // Assuming quarterly compounding (most common for FD)
  const compoundingFrequency = 4
  const amount =
    principal *
    Math.pow(1 + annualRate / 100 / compoundingFrequency, compoundingFrequency * tenureYears)

  const estimatedReturn = amount - principal

  return {
    investedAmount: Math.round(principal),
    estimatedReturn: Math.round(estimatedReturn),
    totalValue: Math.round(amount),
  }
}

export function calculateGST(amount: number, gstRate: number, mode: 'add' | 'remove') {
  if (amount <= 0 || gstRate <= 0) {
    return { baseAmount: amount, gstAmount: 0, totalAmount: amount }
  }
  if (mode === 'add') {
    const gstAmount = (amount * gstRate) / 100
    return {
      baseAmount: Math.round(amount),
      gstAmount: Math.round(gstAmount),
      totalAmount: Math.round(amount + gstAmount),
    }
  } else {
    const baseAmount = amount / (1 + gstRate / 100)
    const gstAmount = amount - baseAmount
    return {
      baseAmount: Math.round(baseAmount),
      gstAmount: Math.round(gstAmount),
      totalAmount: Math.round(amount),
    }
  }
}

export function calculateCAGR(initialValue: number, finalValue: number, years: number) {
  if (initialValue <= 0 || finalValue <= 0 || years <= 0) {
    return { cagr: 0, absoluteReturn: 0, absoluteReturnPct: 0 }
  }
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
  const absoluteReturn = finalValue - initialValue
  const absoluteReturnPct = ((finalValue - initialValue) / initialValue) * 100
  return {
    cagr: Math.round(cagr * 100) / 100,
    absoluteReturn: Math.round(absoluteReturn),
    absoluteReturnPct: Math.round(absoluteReturnPct * 100) / 100,
  }
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  frequency: number // 1=annually, 2=semi, 4=quarterly, 12=monthly
) {
  if (principal <= 0 || annualRate <= 0 || years <= 0) {
    return { totalAmount: principal, interestEarned: 0 }
  }
  const totalAmount = principal * Math.pow(1 + annualRate / 100 / frequency, frequency * years)
  return {
    totalAmount: Math.round(totalAmount),
    interestEarned: Math.round(totalAmount - principal),
  }
}

export function calculateSimpleInterest(principal: number, annualRate: number, years: number) {
  if (principal <= 0 || annualRate <= 0 || years <= 0) {
    return { interest: 0, totalAmount: principal }
  }
  const interest = (principal * annualRate * years) / 100
  return {
    interest: Math.round(interest),
    totalAmount: Math.round(principal + interest),
  }
}

export function calculatePPF(annualInvestment: number, years: number) {
  // PPF: 7.1% p.a. compounded annually (current rate)
  const rate = 7.1 / 100
  if (annualInvestment <= 0 || years <= 0) {
    return { investedAmount: 0, interestEarned: 0, maturityValue: 0 }
  }
  let balance = 0
  for (let i = 0; i < years; i++) {
    balance = (balance + annualInvestment) * (1 + rate)
  }
  const investedAmount = annualInvestment * years
  return {
    investedAmount: Math.round(investedAmount),
    interestEarned: Math.round(balance - investedAmount),
    maturityValue: Math.round(balance),
  }
}

export function calculateNPS(
  monthlyContribution: number,
  annualReturnRate: number,
  years: number,
  annuityPercentage: number // % of corpus used for annuity (min 40%)
) {
  if (monthlyContribution <= 0 || years <= 0) {
    return { corpus: 0, lumpSum: 0, annuityCorpus: 0, monthlyPension: 0 }
  }
  const monthlyRate = annualReturnRate / 12 / 100
  const months = years * 12
  const corpus =
    monthlyContribution *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate)
  const annuityCorpus = corpus * (annuityPercentage / 100)
  const lumpSum = corpus - annuityCorpus
  const monthlyPension = (annuityCorpus * 0.06) / 12 // assume 6% annuity rate
  return {
    corpus: Math.round(corpus),
    lumpSum: Math.round(lumpSum),
    annuityCorpus: Math.round(annuityCorpus),
    monthlyPension: Math.round(monthlyPension),
  }
}

export function calculateGratuity(
  lastSalary: number, // basic + DA
  yearsOfService: number
) {
  // Formula: (Last Salary × 15/26) × Years of Service
  if (lastSalary <= 0 || yearsOfService < 5) {
    return { gratuity: 0, taxFreeLimit: 2000000 }
  }
  const gratuity = (lastSalary * 15 * yearsOfService) / 26
  return {
    gratuity: Math.round(gratuity),
    taxFreeLimit: 2000000,
  }
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  expectedReturn: number, // % p.a.
  inflationRate: number,  // % p.a.
  monthlyExpensesAtRetirement: number
) {
  const yearsToRetire = retirementAge - currentAge
  const monthlyRate = expectedReturn / 12 / 100
  const months = yearsToRetire * 12
  // Future value of current savings
  const fvCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetire)
  // Future value of monthly contributions (SIP-like)
  const fvContributions =
    monthlyContribution *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate)
  const projectedCorpus = fvCurrentSavings + fvContributions
  // Required corpus = monthly expenses (inflation-adjusted) × 25 years × 12
  const inflationMultiplier = Math.pow(1 + inflationRate / 100, yearsToRetire)
  const futureMonthlyExpenses = monthlyExpensesAtRetirement * inflationMultiplier
  const requiredCorpus = futureMonthlyExpenses * 12 * 25
  return {
    projectedCorpus: Math.round(projectedCorpus),
    requiredCorpus: Math.round(requiredCorpus),
    shortfall: Math.round(Math.max(0, requiredCorpus - projectedCorpus)),
    surplus: Math.round(Math.max(0, projectedCorpus - requiredCorpus)),
    futureMonthlyExpenses: Math.round(futureMonthlyExpenses),
  }
}

export function calculateSWP(
  corpus: number,
  withdrawalPerMonth: number,
  annualReturn: number
) {
  const monthlyRate = annualReturn / 12 / 100
  let balance = corpus
  let months = 0
  const MAX_MONTHS = 600
  while (balance > 0 && months < MAX_MONTHS) {
    balance = balance * (1 + monthlyRate) - withdrawalPerMonth
    months++
  }
  const totalWithdrawn = withdrawalPerMonth * months
  return {
    durationMonths: months,
    durationYears: Math.round((months / 12) * 10) / 10,
    totalWithdrawn: Math.round(totalWithdrawn),
    corpusExhausted: balance <= 0,
  }
}

export function calculateLumpsum(
  principal: number,
  annualReturnRate: number,
  years: number
) {
  if (principal <= 0 || years <= 0) {
    return { investedAmount: principal, estimatedReturn: 0, totalValue: principal }
  }
  const totalValue = principal * Math.pow(1 + annualReturnRate / 100, years)
  return {
    investedAmount: principal,
    estimatedReturn: Math.round(totalValue - principal),
    totalValue: Math.round(totalValue),
  }
}

export function calculateSalary(ctc: number) {
  // Approximate Indian salary breakdown from CTC
  const basic = ctc * 0.40
  const hra = basic * 0.50
  const specialAllowance = ctc * 0.20
  const epfEmployee = Math.min(basic * 0.12, 21600) // capped at ₹1800/month = ₹21600/yr
  const epfEmployer = epfEmployee
  const professionalTax = 2400 // flat ₹200/month for most states
  const grossSalary = basic + hra + specialAllowance
  const deductions = epfEmployee + professionalTax
  const inHandAnnual = grossSalary - deductions
  return {
    ctc: Math.round(ctc),
    grossSalary: Math.round(grossSalary),
    basic: Math.round(basic),
    hra: Math.round(hra),
    specialAllowance: Math.round(specialAllowance),
    epfEmployee: Math.round(epfEmployee),
    epfEmployer: Math.round(epfEmployer),
    professionalTax,
    deductions: Math.round(deductions),
    inHandAnnual: Math.round(inHandAnnual),
    inHandMonthly: Math.round(inHandAnnual / 12),
  }
}

export function calculateIncomeTax(annualIncome: number, regime: 'new' | 'old') {
  // FY 2024-25 / AY 2025-26
  let tax = 0
  if (regime === 'new') {
    // New tax regime slabs
    const slabs = [
      { limit: 300000,  rate: 0    },
      { limit: 600000,  rate: 0.05 },
      { limit: 900000,  rate: 0.10 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ]
    let remaining = annualIncome
    let prev = 0
    for (const slab of slabs) {
      const taxable = Math.min(remaining, slab.limit - prev)
      tax += taxable * slab.rate
      remaining -= taxable
      prev = slab.limit
      if (remaining <= 0) break
    }
    // Rebate u/s 87A for income <= 7L
    if (annualIncome <= 700000) tax = 0
  } else {
    // Old tax regime slabs (no standard deduction applied here — user sets income)
    const slabs = [
      { limit: 250000,  rate: 0    },
      { limit: 500000,  rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ]
    let remaining = annualIncome
    let prev = 0
    for (const slab of slabs) {
      const taxable = Math.min(remaining, slab.limit - prev)
      tax += taxable * slab.rate
      remaining -= taxable
      prev = slab.limit
      if (remaining <= 0) break
    }
    // Rebate u/s 87A for income <= 5L
    if (annualIncome <= 500000) tax = 0
  }
  const cess = tax * 0.04
  return {
    taxBeforeCess: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(tax + cess),
    effectiveRate: annualIncome > 0 ? Math.round(((tax + cess) / annualIncome) * 10000) / 100 : 0,
    inHandMonthly: Math.round((annualIncome - tax - cess) / 12),
  }
}

