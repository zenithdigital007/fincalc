import { Metadata } from "next"
import Link from "next/link"
import { getSortedPostsData } from "@/lib/blog"
import { ArrowRight, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Personal Finance Blog — EMI, SIP, GST, Tax & Investment Guides India",
  description:
    "Expert personal finance guides for India — learn about EMI, SIP vs FD, home loans, GST, income tax, BMI, retirement planning, and more. Free actionable advice.",
  keywords: [
    "personal finance India", "EMI guide", "SIP vs FD", "home loan guide",
    "GST India explained", "income tax India guide", "BMI calculator guide",
    "retirement planning India", "mutual fund beginner guide",
  ],
  alternates: { canonical: "https://loancalculator-nu.vercel.app/blog" },
}

const CALCULATOR_LINKS: Record<string, { href: string; label: string }> = {
  "what-is-emi":                    { href: "/home-loan",          label: "Try EMI Calculator" },
  "sip-vs-fd":                      { href: "/sip",                label: "Try SIP Calculator" },
  "how-much-home-loan-can-i-afford":{ href: "/home-loan",          label: "Try Home Loan Calculator" },
  "fd-vs-mutual-fund":              { href: "/fd",                 label: "Try FD Calculator" },
  "bmi-calculator-guide":           { href: "/bmi",                label: "Try BMI Calculator" },
  "what-is-gst-in-india":           { href: "/gst-calculator",     label: "Try GST Calculator" },
  "understanding-home-loan-emi":    { href: "/home-loan",          label: "Try EMI Calculator" },
}

export default function BlogPage() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-border rounded-full text-xs font-medium text-muted-foreground mb-6 bg-muted/50">
          <BookOpen className="w-3 h-3" />
          {allPostsData.length} articles · Personal Finance India
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Finance & Calculator Guides</h1>
        <p className="text-lg text-muted-foreground">
          Practical guides on EMI, investments, taxes, health, and smart money decisions — written for Indian readers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {allPostsData.map(({ id, date, title, description }) => {
          const relatedCalc = CALCULATOR_LINKS[id]
          return (
            <article
              key={id}
              className="group p-8 bg-card text-card-foreground rounded-2xl border shadow-sm hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Link href={`/blog/${id}`} className="block">
                  <small className="text-xs text-muted-foreground block mb-3">
                    {new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </small>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
                </Link>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/blog/${id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {relatedCalc && (
                    <Link
                      href={relatedCalc.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground hover:bg-foreground hover:text-background transition-all"
                    >
                      {relatedCalc.label}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
