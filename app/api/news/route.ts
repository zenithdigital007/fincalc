import { NextRequest, NextResponse } from "next/server"

export const revalidate = 3600 // Cache for 1 hour

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

const FALLBACK_NEWS: Record<string, NewsArticle[]> = {
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
  calculator: [
    {
      title: "The History of the Calculator: From Abacus to Smartphone",
      description: "A journey through 5,000 years of calculating devices and how they shaped mathematics.",
      url: "https://en.wikipedia.org/wiki/Calculator",
      image: null,
      source: "Wikipedia",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Mental Math vs Calculators: What Education Research Says",
      description: "Exploring the balance between mental calculation skills and reliance on digital tools.",
      url: "https://www.khanacademy.org/math",
      image: null,
      source: "Khan Academy",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Best Calculator Apps of 2025 for Students and Professionals",
      description: "Top-rated calculator applications reviewed for accuracy, features, and ease of use.",
      url: "https://www.pcmag.com/picks/best-calculator-apps",
      image: null,
      source: "PC Magazine",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "How Calculators Changed Mathematics Education Forever",
      description: "The debate over calculator use in classrooms and its long-term impact on math proficiency.",
      url: "https://www.edweek.org/teaching-learning/calculators-in-math-education",
      image: null,
      source: "Education Week",
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
      title: "Using Scientific Calculators in Advanced Physics",
      description: "How modern scientific calculators power research in astrophysics and particle physics.",
      url: "https://www.physicsclassroom.com",
      image: null,
      source: "The Physics Classroom",
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
  // Finance & loans
  if (lower.includes("home loan") || lower.includes("mortgage") || lower.includes("housing")) return "calculator"
  if (lower.includes("car loan") || lower.includes("auto") || lower.includes("automobile"))   return "calculator"
  if (lower.includes("personal loan") || lower.includes("credit"))                            return "calculator"
  if (lower.includes("sip") || lower.includes("mutual fund") || lower.includes("invest"))     return "calculator"
  if (lower.includes("fixed deposit") || lower.includes("rbi") || lower.includes("bank"))     return "calculator"
  // Health
  if (lower.includes("bmi") || lower.includes("health") || lower.includes("weight"))          return "bmi"
  // Science / math
  if (lower.includes("scien") || lower.includes("trigon") || lower.includes("log"))           return "science"
  // Graphing
  if (lower.includes("graph") || lower.includes("visual") || lower.includes("plot"))          return "graph"
  return "calculator"
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const topic = searchParams.get("topic") || "finance"

  const apiKey = process.env.NEWSDATA_API_KEY

  if (!apiKey || apiKey === "your_api_key_here") {
    const key = getTopicKey(topic)
    return NextResponse.json({ articles: FALLBACK_NEWS[key] || FALLBACK_NEWS.calculator, source: "fallback" })
  }

  try {
    const query = encodeURIComponent(topic)
    // size=8 to fill two rows of 4 cards
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}&language=en&size=8`,
      { next: { revalidate: 3600 } }
    )

    if (!response.ok) {
      throw new Error(`NewsData.io API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== "success") {
      throw new Error(`NewsData.io returned status: ${data.status}`)
    }

    const articles: NewsArticle[] = (data.results || []).map((a: NewsDataArticle) => ({
      title: a.title,
      description: a.description || a.content?.slice(0, 180) || "",
      url: a.link,
      image: a.image_url || null,
      source: a.source_name || a.source_id || "News",
      publishedAt: a.pubDate,
    }))

    return NextResponse.json({ articles, source: "newsdata" })
  } catch {
    const key = getTopicKey(topic)
    return NextResponse.json({ articles: FALLBACK_NEWS[key] || FALLBACK_NEWS.calculator, source: "fallback" })
  }
}
