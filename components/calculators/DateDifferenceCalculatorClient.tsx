"use client"
import { useState } from "react"

export function DateDifferenceCalculatorClient() {
  const today = new Date().toISOString().split('T')[0]
  const [dateA, setDateA] = useState("2020-01-01")
  const [dateB, setDateB] = useState(today)

  const d1 = new Date(dateA)
  const d2 = new Date(dateB)
  const isValid = !isNaN(d1.getTime()) && !isNaN(d2.getTime())

  const diff = isValid ? Math.abs(d2.getTime() - d1.getTime()) : 0
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalHours = Math.floor(diff / (1000 * 60 * 60))
  const totalMinutes = Math.floor(diff / (1000 * 60))

  // Months and remaining days
  let monthsDiff = 0
  let yearsDiff = 0
  let dayRemainder = 0
  if (isValid) {
    const start = d1 < d2 ? d1 : d2
    const end   = d1 < d2 ? d2 : d1
    yearsDiff = end.getFullYear() - start.getFullYear()
    monthsDiff = end.getMonth() - start.getMonth()
    dayRemainder = end.getDate() - start.getDate()
    if (dayRemainder < 0) { monthsDiff--; dayRemainder += new Date(end.getFullYear(), end.getMonth(), 0).getDate() }
    if (monthsDiff < 0) { yearsDiff--; monthsDiff += 12 }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Date Difference Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Count days, weeks, months & years between any two dates</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">Start Date</label>
            <input
              type="date"
              value={dateA}
              onChange={(e) => setDateA(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">End Date</label>
            <input
              type="date"
              value={dateB}
              onChange={(e) => setDateB(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
          Useful for calculating: loan tenure, project duration, age difference, contract periods & more.
        </div>
      </div>

      <div className="space-y-4 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-2">Date Difference</h3>
        {isValid ? (
          <>
            <div className="text-center py-2">
              <p className="text-4xl font-black text-primary">{totalDays.toLocaleString()}</p>
              <p className="text-muted-foreground text-sm mt-1">Total Days</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Exact Difference</span>
                <span className="font-semibold text-sm">{yearsDiff}y {monthsDiff}m {dayRemainder}d</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Total Weeks</span>
                <span className="font-semibold">{totalWeeks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Total Hours</span>
                <span className="font-semibold">{totalHours.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Total Minutes</span>
                <span className="font-semibold">{totalMinutes.toLocaleString()}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">Enter two valid dates to see the difference.</p>
        )}
      </div>
    </div>
  )
}
