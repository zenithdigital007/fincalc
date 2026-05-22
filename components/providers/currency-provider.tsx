"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "AUD" | "CAD" | "SGD"

interface CurrencyContextType {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCurrency = localStorage.getItem("fincalc-currency") as CurrencyCode
    if (savedCurrency) {
      setCurrencyState(savedCurrency)
    }
  }, [])

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("fincalc-currency", newCurrency)
  }

  // Prevent hydration mismatch by returning a stable default render until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  // If used before mount or outside provider, default to USD
  if (context === undefined) {
    return { currency: "USD" as CurrencyCode, setCurrency: () => {} }
  }
  return context
}
