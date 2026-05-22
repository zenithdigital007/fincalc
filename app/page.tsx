import Link from "next/link"
import { Activity, Calculator, LineChart, FlaskConical, Building2, Car, Wallet, TrendingUp, PiggyBank, ArrowRight } from "lucide-react"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"

const CALCULATORS = [
  { title: "Home Loan EMI",     desc: "Plan your dream home purchase.",          link: "/home-loan",             icon: Building2   },
  { title: "Car Loan EMI",      desc: "Calculate your new car's monthly cost.",   link: "/car-loan",              icon: Car         },
  { title: "Personal Loan EMI", desc: "Estimate payments for personal expenses.", link: "/personal-loan",         icon: Wallet      },
  { title: "SIP Returns",       desc: "Forecast your mutual fund growth.",        link: "/sip",                   icon: TrendingUp  },
  { title: "Fixed Deposit",     desc: "Calculate compound interest gains.",       link: "/fd",                    icon: PiggyBank   },
  { title: "BMI Calculator",    desc: "Calculate your body mass index.",          link: "/bmi",                   icon: Activity    },
  { title: "Calculator",        desc: "Quick arithmetic with history.",           link: "/calculator",            icon: Calculator  },
  { title: "Scientific",        desc: "Trig, log, memory & more.",               link: "/scientific-calculator", icon: FlaskConical},
  { title: "Graphing",          desc: "Visualize mathematical functions.",        link: "/graphing-calculator",   icon: LineChart   },
]

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-foreground/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-border rounded-full text-xs font-medium text-muted-foreground mb-8 bg-muted/50">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-pulse" />
            9 calculators · Live news · Free forever
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.93]">
            Smart Decisions<br />
            <span className="text-muted-foreground font-light italic">Start Here.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Your all-in-one suite — loans, investments, BMI, scientific math, and function graphing — with live news on every page.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/home-loan" className="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background rounded-full font-semibold text-sm hover-lift shadow-lg">
              Calculate EMI <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/graphing-calculator" className="inline-flex items-center gap-2 px-7 py-3 border border-border rounded-full font-semibold text-sm hover-lift hover:bg-muted">
              Plot Functions
            </Link>
            <Link href="/bmi" className="inline-flex items-center gap-2 px-7 py-3 border border-border rounded-full font-semibold text-sm hover-lift hover:bg-muted">
              Check BMI
            </Link>
          </div>
        </div>
      </section>

      {/* ── Leaderboard ad below hero ── */}
      <div className="container mx-auto px-4 max-w-6xl">
        <AdBanner adSlot="1111111111" adFormat="horizontal" label="Advertisement" />
      </div>

      <div className="divider-gradient mx-auto w-full max-w-5xl my-2" />

      {/* ── Calculator grid ── */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">All Tools</p>
              <h2 className="text-3xl font-bold tracking-tight">Our Calculators</h2>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">Click any card to get started</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CALCULATORS.map((calc, idx) => {
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

      {/* ── Home page news: general finance ── */}
      <section className="container mx-auto px-4 max-w-6xl py-16">
        <NewsSection
          topic="finance economy investment India money"
          title="Finance & Economy News"
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
