"use client"

import * as React from "react"
import { useCurrency, CurrencyCode } from "@/components/providers/currency-provider"

const currencies: { code: CurrencyCode; symbol: string; name: string }[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
]

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="relative inline-block text-left">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="block w-full appearance-none rounded-md border border-border bg-background px-3 py-1.5 pr-8 text-sm font-medium text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/50 smooth-transition cursor-pointer"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} ({c.symbol})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  )
}
