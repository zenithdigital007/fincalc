"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { CurrencySelector } from "./currency-selector"
import { BarChart3 } from "lucide-react"

const TABS = [
  { href: "/home-loan",             label: "Home Loan" },
  { href: "/car-loan",              label: "Car Loan" },
  { href: "/personal-loan",         label: "Personal Loan" },
  { href: "/sip",                   label: "SIP" },
  { href: "/fd",                    label: "Fixed Deposit" },
  { href: "/bmi",                   label: "BMI" },
  { href: "/calculator",            label: "Calculator" },
  { href: "/scientific-calculator", label: "Scientific" },
  { href: "/graphing-calculator",   label: "Graphing" },
  { href: "/blog",                  label: "Blog" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b">
      {/* Top bar: logo + controls */}
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-background" />
            </div>
            <span className="font-bold text-lg tracking-tight">Loan Calculator</span>
          </Link>

          <div className="flex items-center gap-3">
            <CurrencySelector />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-t border-border/60">
        <div className="container mx-auto px-4">
          <nav
            className="flex items-center gap-1 overflow-x-auto scrollbar-thin py-2"
            aria-label="Calculator navigation"
          >
            {TABS.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
