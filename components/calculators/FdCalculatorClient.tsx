"use client"

import { useState, useMemo } from "react"
import { SliderInput } from "@/components/shared/SliderInput"
import { calculateFD } from "@/lib/math"
import { formatCurrency } from "@/lib/utils"
import { useCurrency } from "@/components/providers/currency-provider"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"

export function FdCalculatorClient() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(5)
  const { currency } = useCurrency()

  const { investedAmount, estimatedReturn, totalValue } = useMemo(
    () => calculateFD(principal, rate, years),
    [principal, rate, years]
  )

  const chartData = [
    { name: "Principal Amount", value: investedAmount, color: "hsl(var(--primary))" },
    { name: "Total Interest", value: estimatedReturn, color: "hsl(var(--secondary-foreground))" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inputs Section */}
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm hover:shadow-md smooth-transition">
        <h2 className="text-2xl font-bold mb-6">Calculate FD Returns</h2>
        <SliderInput
          label="Total Investment"
          value={principal}
          min={5000}
          max={10000000}
          step={5000}
          onChange={setPrincipal}
          formatValue={(val) => formatCurrency(val, currency)}
        />
        <SliderInput
          label="Interest Rate (p.a.)"
          value={rate}
          min={1}
          max={15}
          step={0.1}
          onChange={setRate}
          formatValue={(val) => `${val}%`}
        />
        <SliderInput
          label="Time Period (Years)"
          value={years}
          min={1}
          max={25}
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
            <span className="text-muted-foreground">Principal Amount</span>
            <span className="font-semibold">{formatCurrency(investedAmount, currency)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Interest</span>
            <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(estimatedReturn, currency)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Maturity Value</span>
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
