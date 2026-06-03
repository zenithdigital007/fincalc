import Link from "next/link"
import { Activity, Calculator, LineChart, FlaskConical, Building2, Car, Wallet, TrendingUp, PiggyBank, ArrowRight, Percent, IndianRupee, BarChart2, Briefcase, Leaf, Fuel, CalendarDays, Ruler, Clock, PieChart, Landmark, Heart, UserCircle, RefreshCcw } from "lucide-react"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { HomepageEmiWidget } from "@/components/shared/HomepageEmiWidget"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free EMI, SIP, FD, GST, Income Tax & 27 Calculators Online — Loan Calculator",
  description:
    "India's most complete free calculator suite. Calculate EMI for home loan, car loan, personal loan, SIP returns, FD interest, GST, income tax, CAGR, PPF, NPS, gratuity, BMI, age, percentage, salary & more — instant results, no signup.",
  alternates: { canonical: "https://loancalculator-nu.vercel.app" },
}

const FINANCIAL_CALCULATORS = [
  { title: "Home Loan EMI",      desc: "Calculate monthly home loan EMI & interest.",  link: "/home-loan",                   icon: Building2     },
  { title: "Car Loan EMI",       desc: "Estimate monthly payments for your car loan.",  link: "/car-loan",                    icon: Car           },
  { title: "Personal Loan EMI",  desc: "Quickly estimate personal loan EMI.",           link: "/personal-loan",               icon: Wallet        },
  { title: "SIP Returns",        desc: "Forecast your mutual fund SIP growth.",         link: "/sip",                         icon: TrendingUp    },
  { title: "Fixed Deposit",      desc: "Calculate FD maturity & interest earned.",      link: "/fd",                          icon: PiggyBank     },
  { title: "GST Calculator",     desc: "Add or remove GST from any amount instantly.",  link: "/gst-calculator",              icon: Percent       },
  { title: "Income Tax",         desc: "Estimate your India income tax (new regime).",  link: "/income-tax-calculator",       icon: IndianRupee   },
  { title: "CAGR Calculator",    desc: "Calculate compounded annual growth rate.",      link: "/cagr-calculator",             icon: BarChart2     },
  { title: "Compound Interest",  desc: "Grow wealth with compound interest math.",      link: "/compound-interest-calculator",icon: RefreshCcw    },
  { title: "Simple Interest",    desc: "Calculate simple interest for any term.",       link: "/simple-interest-calculator",  icon: Calculator    },
  { title: "PPF Calculator",     desc: "Plan your Public Provident Fund returns.",      link: "/ppf-calculator",              icon: Landmark      },
  { title: "NPS Calculator",     desc: "Estimate National Pension Scheme corpus.",      link: "/nps-calculator",              icon: Briefcase     },
  { title: "Gratuity",           desc: "Calculate your gratuity payout on retirement.",link: "/gratuity-calculator",         icon: Leaf          },
  { title: "Retirement Planner", desc: "See how much corpus you need to retire.",      link: "/retirement-calculator",       icon: UserCircle    },
  { title: "SWP Calculator",     desc: "Plan systematic withdrawals from your fund.",  link: "/swp-calculator",              icon: PieChart      },
  { title: "Lumpsum Calculator", desc: "Estimate returns on one-time investments.",     link: "/lumpsum-calculator",          icon: TrendingUp    },
  { title: "Salary Calculator",  desc: "Compute in-hand salary after all deductions.", link: "/salary-calculator",           icon: IndianRupee   },
]

const UTILITY_CALCULATORS = [
  { title: "BMI Calculator",     desc: "Check your Body Mass Index quickly.",          link: "/bmi",                         icon: Activity      },
  { title: "Age Calculator",     desc: "Find your exact age in years, months & days.", link: "/age-calculator",              icon: Clock         },
  { title: "Percentage Calc",    desc: "Solve percentage problems in one step.",        link: "/percentage-calculator",       icon: Percent       },
  { title: "Discount Calc",      desc: "Find the final price after any discount.",     link: "/discount-calculator",         icon: Percent       },
  { title: "Fuel Cost Calc",     desc: "Estimate trip fuel cost instantly.",           link: "/fuel-cost-calculator",        icon: Fuel          },
  { title: "Date Difference",    desc: "Count days between any two dates.",            link: "/date-difference-calculator",  icon: CalendarDays  },
  { title: "Unit Converter",     desc: "Convert length, weight, temp & more.",         link: "/unit-converter",              icon: Ruler         },
  { title: "Calculator",         desc: "Quick arithmetic with history.",                link: "/calculator",                  icon: Calculator    },
  { title: "Scientific Calc",    desc: "Trig, log, memory & advanced math.",           link: "/scientific-calculator",       icon: FlaskConical  },
  { title: "Graphing Calc",      desc: "Visualize mathematical functions.",            link: "/graphing-calculator",         icon: LineChart     },
]

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── Hero with inline EMI widget ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-16 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-foreground/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-border rounded-full text-xs font-medium text-muted-foreground mb-6 bg-muted/50">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-pulse" />
            27 calculators · Live news · Free forever
          </div>

          {/* SEO-focused H1 */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.95]">
            Free EMI, SIP, FD &amp; Tax<br />
            <span className="text-muted-foreground font-light italic">Calculators, Free Forever.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            27 free calculators — loans, investments, taxes, health &amp; utilities — with live financial news on every page.
          </p>

          {/* Inline EMI Widget */}
          <HomepageEmiWidget />

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/home-loan" className="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background rounded-full font-semibold text-sm hover-lift shadow-lg">
              Full EMI Calculator <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/gst-calculator" className="inline-flex items-center gap-2 px-7 py-3 border border-border rounded-full font-semibold text-sm hover-lift hover:bg-muted">
              GST Calculator
            </Link>
            <Link href="/income-tax-calculator" className="inline-flex items-center gap-2 px-7 py-3 border border-border rounded-full font-semibold text-sm hover-lift hover:bg-muted">
              Income Tax
            </Link>
            <Link href="/bmi" className="inline-flex items-center gap-2 px-7 py-3 border border-border rounded-full font-semibold text-sm hover-lift hover:bg-muted">
              BMI Check
            </Link>
          </div>
        </div>
      </section>

      {/* ── Leaderboard ad below hero ── */}
      <div className="container mx-auto px-4 max-w-6xl">
        <AdBanner adSlot="1111111111" adFormat="horizontal" label="Advertisement" />
      </div>

      <div className="divider-gradient mx-auto w-full max-w-5xl my-2" />

      {/* ── Financial Calculator grid ── */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Financial Tools</p>
              <h2 className="text-3xl font-bold tracking-tight">Financial Calculators</h2>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">17 tools · Click any card</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FINANCIAL_CALCULATORS.map((calc, idx) => {
              const Icon = calc.icon
              return (
                <>
                  <Link key={calc.link} href={calc.link} className="block group">
                    <div className="h-full p-6 bg-card rounded-2xl border border-border hover-lift smooth-transition group-hover:border-foreground/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-[0.02] smooth-transition rounded-2xl" />
                      <div className="relative flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-foreground/8 smooth-transition">
                          <Icon className="w-5 h-5 text-foreground/70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base mb-1">{calc.title}</h3>
                          <p className="text-sm text-muted-foreground leading-snug">{calc.desc}</p>
                        </div>
                        <ArrowRight className="shrink-0 w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground smooth-transition mt-1" />
                      </div>
                    </div>
                  </Link>
                  {/* Ad after every 6th card */}
                  {(idx + 1) % 6 === 0 && (
                    <div key={`ad-${idx}`} className="sm:col-span-2 lg:col-span-3">
                      <AdBanner adSlot="2222222222" adFormat="auto" label="Advertisement" />
                    </div>
                  )}
                </>
              )
            })}
          </div>
        </div>
      </section>

      <div className="divider-gradient mx-auto w-full max-w-5xl" />

      {/* ── Utility Calculator grid ── */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Everyday Tools</p>
              <h2 className="text-3xl font-bold tracking-tight">Utility Calculators</h2>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">10 tools · Click any card</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {UTILITY_CALCULATORS.map((calc) => {
              const Icon = calc.icon
              return (
                <Link key={calc.link} href={calc.link} className="block group">
                  <div className="h-full p-6 bg-card rounded-2xl border border-border hover-lift smooth-transition group-hover:border-foreground/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-[0.02] smooth-transition rounded-2xl" />
                    <div className="relative flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-foreground/8 smooth-transition">
                        <Icon className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-1">{calc.title}</h3>
                        <p className="text-sm text-muted-foreground leading-snug">{calc.desc}</p>
                      </div>
                      <ArrowRight className="shrink-0 w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground smooth-transition mt-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <div className="divider-gradient mx-auto w-full max-w-5xl" />

      {/* ── Home page news: general finance ── */}
      <section className="container mx-auto px-4 max-w-6xl py-16">
        <NewsSection
          topic="finance economy investment India money"
          title="Finance &amp; Economy News"
          adSlot="3333333333"
        />
      </section>

      {/* ── Bottom leaderboard ── */}
      <div className="container mx-auto px-4 max-w-6xl pb-8">
        <AdBanner adSlot="4444444444" adFormat="horizontal" label="Advertisement" />
      </div>

    </div>
  )
}
