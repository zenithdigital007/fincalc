"use client"

import { useState, useMemo } from "react"
import { SliderInput } from "@/components/shared/SliderInput"
import { calculateEMI } from "@/lib/math"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/components/providers/currency-provider"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"

export function EmiCalculatorClient({
  defaultPrincipal = 500000,
  defaultRate = 7.5,
  defaultYears = 20,
}: {
  defaultPrincipal?: number
  defaultRate?: number
  defaultYears?: number
}) {
  const [principal, setPrincipal] = useState(defaultPrincipal)
  const [rate, setRate] = useState(defaultRate)
  const [years, setYears] = useState(defaultYears)
  const { currency } = useCurrency()

  const { emi, totalInterest, totalPayment } = useMemo(
    () => calculateEMI(principal, rate, years * 12),
    [principal, rate, years]
  )



  const chartData = [
    { name: "Principal", value: principal, color: "hsl(var(--primary))" },
    { name: "Total Interest", value: totalInterest, color: "hsl(var(--destructive))" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inputs Section */}
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm hover:shadow-md smooth-transition">
        <h2 className="text-2xl font-bold mb-6">Calculate your EMI</h2>
        <SliderInput
          label="Loan Amount"
          value={principal}
          min={10000}
          max={5000000}
          step={10000}
          onChange={setPrincipal}
          formatValue={(val) => formatCurrency(val, currency)}
        />
        <SliderInput
          label="Interest Rate (p.a.)"
          value={rate}
          min={1}
          max={20}
          step={0.1}
          onChange={setRate}
          formatValue={(val) => `${val}%`}
        />
        <SliderInput
          label="Loan Tenure (Years)"
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={setYears}
          formatValue={(val) => `${val} Yr`}
        />
      </div>

      {/* Results Section */}
      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm hover:shadow-md smooth-transition relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Monthly EMI</span>
            <span className="font-bold text-lg text-primary">{formatCurrency(emi, currency)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Principal Amount</span>
            <span className="font-semibold">{formatCurrency(principal, currency)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Interest</span>
            <span className="font-semibold text-destructive">{formatCurrency(totalInterest, currency)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-semibold">{formatCurrency(totalPayment, currency)}</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value: number) => formatCurrency(value, currency)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
