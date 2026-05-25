import Link from "next/link"
import { BarChart3 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-10 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-background" />
              </div>
              <span className="font-bold text-lg tracking-tight">Loan Calculator</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-[200px] text-center md:text-left">
              Free, fast, and privacy-first calculator suite.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link href="/home-loan"             className="hover:text-foreground transition-colors">Home Loan</Link>
            <Link href="/car-loan"              className="hover:text-foreground transition-colors">Car Loan</Link>
            <Link href="/personal-loan"         className="hover:text-foreground transition-colors">Personal Loan</Link>
            <Link href="/sip"                   className="hover:text-foreground transition-colors">SIP</Link>
            <Link href="/fd"                    className="hover:text-foreground transition-colors">Fixed Deposit</Link>
            <Link href="/bmi"                   className="hover:text-foreground transition-colors">BMI</Link>
            <Link href="/calculator"            className="hover:text-foreground transition-colors">Calculator</Link>
            <Link href="/scientific-calculator" className="hover:text-foreground transition-colors">Scientific</Link>
            <Link href="/graphing-calculator"   className="hover:text-foreground transition-colors">Graphing</Link>
            <Link href="/blog"                  className="hover:text-foreground transition-colors">Blog</Link>
          </div>
        </div>

        <div className="divider-gradient my-6" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Loan Calculator · Built for smart financial decisions
        </p>
      </div>
    </footer>
  )
}
