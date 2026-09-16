import Link from "next/link"
import { BarChart3, Shield, Award } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12 mt-16 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-background" />
              </div>
              <span className="font-bold text-lg tracking-tight">Loan Calculator</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Precision financial algorithms, EMI amortisation schedules, tax estimators, and scientific math tools. 100% free, privacy-first, and client-side processed.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> Client-Side Privacy</span>
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-primary" /> Verified Formulas</span>
            </div>
          </div>

          {/* Column 1: Loans & Credit */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">Loans & Credit</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/home-loan" className="hover:text-foreground transition-colors">Home Loan EMI</Link></li>
              <li><Link href="/car-loan" className="hover:text-foreground transition-colors">Car Loan EMI</Link></li>
              <li><Link href="/personal-loan" className="hover:text-foreground transition-colors">Personal Loan EMI</Link></li>
              <li><Link href="/simple-interest-calculator" className="hover:text-foreground transition-colors">Simple Interest</Link></li>
              <li><Link href="/compound-interest-calculator" className="hover:text-foreground transition-colors">Compound Interest</Link></li>
            </ul>
          </div>

          {/* Column 2: Investments & Tax */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">Invest & Tax</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/sip" className="hover:text-foreground transition-colors">SIP Calculator</Link></li>
              <li><Link href="/lumpsum-calculator" className="hover:text-foreground transition-colors">Lumpsum Returns</Link></li>
              <li><Link href="/fd" className="hover:text-foreground transition-colors">Fixed Deposit (FD)</Link></li>
              <li><Link href="/income-tax-calculator" className="hover:text-foreground transition-colors">Income Tax</Link></li>
              <li><Link href="/gst-calculator" className="hover:text-foreground transition-colors">GST Calculator</Link></li>
              <li><Link href="/ppf-calculator" className="hover:text-foreground transition-colors">PPF & NPS</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">Company & Legal</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Financial Guides</Link></li>
            </ul>
          </div>
        </div>

        <div className="divider-gradient my-6" />

        {/* Financial Disclaimer Banner */}
        <div className="bg-muted/30 border border-border/70 rounded-xl p-4 mb-6 text-xs text-muted-foreground leading-relaxed text-center md:text-left">
          <strong>Financial & Legal Notice:</strong> Calculators and guides provided on Loan Calculator are for educational and illustrative purposes only. Interest rates, loan eligibility, taxes, and mutual fund returns are estimates and may vary depending on financial institutions and prevailing regulations. Please read our full <Link href="/disclaimer" className="underline hover:text-foreground">Disclaimer</Link> and <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Loan Calculator · All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
