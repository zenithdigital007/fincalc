"use client"

import { useState, useMemo } from "react"
import { SliderInput } from "@/components/shared/SliderInput"
import { calculateSIP } from "@/lib/math"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/components/providers/currency-provider"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"

export function SipCalculatorClient() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const { currency } = useCurrency()

  const { investedAmount, estimatedReturn, totalValue } = useMemo(
    () => calculateSIP(monthlyInvestment, rate, years),
    [monthlyInvestment, rate, years]
  )

  const chartData = [
    { name: "Invested Amount", value: investedAmount, color: "hsl(var(--primary))" },
    { name: "Estimated Return", value: estimatedReturn, color: "hsl(var(--secondary-foreground))" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inputs Section */}
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm hover:shadow-md smooth-transition">
        <h2 className="text-2xl font-bold mb-6">Calculate your SIP Returns</h2>
        <SliderInput
          label="Monthly Investment"
          value={monthlyInvestment}
          min={50}
          max={100000}
          step={50}
          onChange={setMonthlyInvestment}
          formatValue={(val) => formatCurrency(val, currency)}
        />
        <SliderInput
          label="Expected Return Rate (p.a.)"
          value={rate}
          min={1}
          max={30}
          step={0.1}
          onChange={setRate}
          formatValue={(val) => `${val}%`}
        />
        <SliderInput
          label="Time Period (Years)"
          value={years}
          min={1}
          max={40}
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
            <span className="text-muted-foreground">Invested Amount</span>
            <span className="font-semibold">{formatCurrency(investedAmount, currency)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Est. Returns</span>
            <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(estimatedReturn, currency)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Value</span>
            <span className="font-bold text-lg text-primary">{formatCurrency(totalValue, currency)}</span>
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
