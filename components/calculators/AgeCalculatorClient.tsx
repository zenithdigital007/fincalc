"use client"
import { useState } from "react"

export function AgeCalculatorClient() {
  const [dob, setDob] = useState("1995-01-15")

  const today = new Date()
  const birth = new Date(dob)

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  const isValid = !isNaN(birth.getTime()) && birth < today

  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday <= today) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
  const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Age Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Find your exact age in years, months, days, weeks & more</p>
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Date of Birth</label>
          <input
            type="date"
            value={dob}
            max={today.toISOString().split('T')[0]}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
          Today's date: <strong>{today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
        </div>
      </div>

      {isValid ? (
        <div className="space-y-4 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <h3 className="text-xl font-bold mb-2">Your Age</h3>
          <div className="text-center py-4">
            <p className="text-5xl font-black text-primary">{years}</p>
            <p className="text-muted-foreground text-sm mt-1">years old</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Exact Age</span>
              <span className="font-semibold">{years} yr {months} mo {days} d</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Total Months</span>
              <span className="font-semibold">{totalMonths.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Total Weeks</span>
              <span className="font-semibold">{totalWeeks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Total Days</span>
              <span className="font-semibold">{totalDays.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Next Birthday</span>
              <span className="font-semibold text-primary">{daysToNextBirthday === 365 ? '🎂 Today!' : `in ${daysToNextBirthday} days`}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card text-card-foreground p-8 rounded-2xl border shadow-sm flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Enter a valid date of birth to see your age.</p>
        </div>
      )}
    </div>
  )
}
