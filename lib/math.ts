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
