import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

// NewsData.io article shape
interface NewsDataArticle {
  title: string
  description: string | null
  content: string | null
  link: string
  image_url: string | null
  pubDate: string
  source_id: string
  source_name?: string
}

interface NewsArticle {
  title: string
  description: string
  url: string
  image: string | null
  source: string
  publishedAt: string
}

// ── Fallback articles shown when API key is missing or API fails ──────────────
const FALLBACK_NEWS: Record<string, NewsArticle[]> = {
  finance: [
    {
      title: "RBI Keeps Repo Rate Unchanged: What It Means for Borrowers",
      description: "The Reserve Bank of India held the repo rate steady. Here's how it affects your home loan and personal loan EMIs.",
      url: "https://www.rbi.org.in",
      image: null,
      source: "Reserve Bank of India",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "How to Reduce Your Home Loan EMI: 5 Proven Strategies",
      description: "From prepayments to balance transfers, discover practical ways to cut down your monthly mortgage burden.",
      url: "https://www.bankbazaar.com/home-loan.html",
      image: null,
      source: "BankBazaar",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Best Personal Loan Interest Rates in India 2025",
      description: "Compare personal loan rates across top Indian banks and NBFCs to find the most affordable option.",
      url: "https://www.paisabazaar.com/personal-loan",
      image: null,
      source: "PaisaBazaar",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "SIP vs Lump Sum: Which Investment Strategy Suits You?",
      description: "Mutual fund experts explain when to choose SIP over lump sum investing based on your financial goals.",
      url: "https://www.amfiindia.com",
      image: null,
      source: "AMFI India",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Fixed Deposit Rates: Which Banks Offer the Best Returns in 2025?",
      description: "A comprehensive comparison of FD interest rates from SBI, HDFC, ICICI, Axis, and small finance banks.",
      url: "https://www.bankbazaar.com/fixed-deposit.html",
      image: null,
      source: "BankBazaar",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Car Loan vs Personal Loan: Which is Better for Buying a Vehicle?",
      description: "Understand the key differences in rates, tenure, and tax benefits before choosing your vehicle finance option.",
      url: "https://www.moneycontrol.com",
      image: null,
      source: "Moneycontrol",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "How Your CIBIL Score Affects Your Loan Eligibility and Interest Rate",
      description: "A high credit score can save you lakhs on your home or personal loan. Here's how to improve yours.",
      url: "https://www.cibil.com",
      image: null,
      source: "CIBIL",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Understanding Loan Amortization: How Banks Calculate Your EMI",
      description: "A deep dive into how banks use reducing balance method to compute your monthly installment and interest.",
      url: "https://www.investopedia.com/terms/a/amortization.asp",
      image: null,
      source: "Investopedia",
      publishedAt: new Date().toISOString(),
    },
  ],
  bmi: [
    {
      title: "Understanding BMI: What Your Body Mass Index Really Means",
      description: "Learn how BMI is calculated and what the different categories mean for your health and fitness goals.",
      url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
      image: null,
      source: "World Health Organization",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "BMI vs Body Fat Percentage: Which is Better for Health Assessment?",
      description: "Experts debate whether BMI alone is sufficient for measuring overall health and fitness.",
      url: "https://www.healthline.com/health/bmi-for-women",
      image: null,
      source: "Healthline",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Healthy Weight Management: Tips from Nutrition Experts",
      description: "Sustainable strategies for maintaining a healthy weight and improving your BMI score.",
      url: "https://www.cdc.gov/healthyweight/index.html",
      image: null,
      source: "CDC",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "New Study Links BMI to Cardiovascular Disease Risk",
      description: "Research reveals how body mass index correlates with heart disease risk factors.",
      url: "https://www.heart.org/en/healthy-living/healthy-eating/losing-weight",
      image: null,
      source: "American Heart Association",
      publishedAt: new Date().toISOString(),
    },
  ],
  science: [
    {
      title: "Top Scientific Discoveries of 2025",
      description: "From quantum computing breakthroughs to new medical treatments, science is advancing rapidly.",
      url: "https://www.sciencenews.org",
      image: null,
      source: "Science News",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Trigonometry Applications in Engineering and Architecture",
      description: "Real-world uses of sin, cos, and tan in designing structures and solving engineering problems.",
      url: "https://www.engineeringtoolbox.com",
      image: null,
      source: "Engineering Toolbox",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "The Role of Logarithms in Modern Technology",
      description: "How logarithmic calculations power everything from audio engineering to machine learning.",
      url: "https://www.mathsisfun.com/algebra/logarithms.html",
      image: null,
      source: "Math Is Fun",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Using Scientific Calculators in Advanced Physics",
      description: "How modern scientific calculators power research in astrophysics and particle physics.",
      url: "https://www.physicsclassroom.com",
      image: null,
      source: "The Physics Classroom",
      publishedAt: new Date().toISOString(),
    },
  ],
  graph: [
    {
      title: "Data Visualization Trends Reshaping Business Intelligence",
      description: "How interactive graphs and charts are transforming decision-making in 2025.",
      url: "https://www.tableau.com/learn/articles/data-visualization",
      image: null,
      source: "Tableau",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Desmos: The Free Graphing Tool Revolutionizing Math Education",
      description: "How Desmos became the go-to graphing calculator for millions of students worldwide.",
      url: "https://www.desmos.com",
      image: null,
      source: "Desmos",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Function Graphing in Calculus: A Visual Approach",
      description: "Understanding derivatives and integrals through visual graph exploration.",
      url: "https://www.khanacademy.org/math/calculus-1",
      image: null,
      source: "Khan Academy",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "3D Graphing and Mathematical Visualization in Research",
      description: "Advanced graphing techniques used by mathematicians to visualize complex functions.",
      url: "https://www.wolfram.com/mathematica",
      image: null,
      source: "Wolfram",
      publishedAt: new Date().toISOString(),
    },
  ],
}

function getTopicKey(topic: string): string {
  const lower = topic.toLowerCase()
  if (lower.includes("bmi") || lower.includes("health") || lower.includes("weight")) return "bmi"
  if (lower.includes("scien") || lower.includes("trigon") || lower.includes("log"))   return "science"
  if (lower.includes("graph") || lower.includes("visual") || lower.includes("plot"))  return "graph"
  return "finance"
}

function getFallback(topic: string) {
  const key = getTopicKey(topic)
  return NextResponse.json(
    { articles: FALLBACK_NEWS[key] ?? FALLBACK_NEWS.finance, source: "fallback" },
    { headers: { "Cache-Control": "public, max-age=3600" } }
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const topic = searchParams.get("topic") || "finance"

  const apiKey = process.env.NEWSDATA_API_KEY
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
    return getFallback(topic)
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000) // 5-second timeout

    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(topic)}&language=en&size=8`,
      { signal: controller.signal }
    )
    clearTimeout(timeout)

    if (!response.ok) {
      console.error(`NewsData.io error: ${response.status}`)
      return getFallback(topic)
    }

    const data = await response.json()

    if (data.status !== "success" || !Array.isArray(data.results)) {
      return getFallback(topic)
    }

    const articles: NewsArticle[] = data.results.map((a: NewsDataArticle) => ({
      title: a.title,
      description: a.description || a.content?.slice(0, 180) || "",
      url: a.link,
      image: a.image_url || null,
      source: a.source_name || a.source_id || "News",
      publishedAt: a.pubDate,
    }))

    return NextResponse.json(
      { articles, source: "newsdata" },
      { headers: { "Cache-Control": "public, max-age=3600" } }
    )
  } catch {
    return getFallback(topic)
  }
}
