import { Metadata } from "next"
import { BmiCalculatorClient } from "@/components/calculators/BmiCalculatorClient"
import { NewsSection } from "@/components/shared/NewsSection"
import { AdBanner } from "@/components/ads/AdBanner"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/bmi`

export const metadata: Metadata = {
  title: "BMI Calculator — Calculate Body Mass Index Online Free",
  description:
    "Calculate your BMI (Body Mass Index) instantly in metric or imperial units. Get your BMI score, weight category (underweight, normal, overweight, obese), and ideal weight range. Free BMI calculator.",
  keywords: [
    "BMI calculator", "body mass index calculator", "BMI calculator India",
    "BMI calculator kg cm", "BMI calculator metric", "BMI calculator imperial",
    "ideal weight calculator", "overweight BMI", "obesity BMI calculator",
    "BMI for adults", "healthy weight calculator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "BMI Calculator — Calculate Body Mass Index Online Free",
    description:
      "Calculate your Body Mass Index instantly. Get BMI score, weight category and ideal weight range. Free online BMI calculator in metric and imperial.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "BMI Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator — FinCalc",
    description: "Calculate your BMI instantly. Get weight category and ideal weight range. Free BMI calculator.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BMI Calculator",
    url: PAGE_URL,
    description:
      "Free online BMI calculator. Calculate your Body Mass Index in metric or imperial units and get your weight category.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    browserRequirements: "Requires JavaScript",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a healthy BMI range?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "According to WHO guidelines, a BMI between 18.5 and 24.9 is considered healthy for adults. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is considered obese. For Asians (including Indians), a lower threshold of 23-27.5 is sometimes recommended.",
        },
      },
      {
        "@type": "Question",
        name: "How is BMI calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMI is calculated as weight (kg) divided by height (m) squared. Formula: BMI = weight(kg) / height(m)². For example, a person weighing 70kg who is 1.75m tall has a BMI of 70 / (1.75 × 1.75) = 22.9.",
        },
      },
      {
        "@type": "Question",
        name: "Is BMI accurate for everyone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMI is a useful screening tool but has limitations. It doesn't account for muscle mass, bone density, age, sex, or where fat is distributed. Athletes may have a high BMI due to muscle. It should be used along with other health assessments for a complete picture.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "BMI Calculator", item: PAGE_URL },
    ],
  },
]

export default function BmiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">BMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate your Body Mass Index using metric or imperial units. Understand your weight category and ideal weight range.
        </p>
      </div>
      <BmiCalculatorClient />
      <AdBanner adSlot="5006000001" adFormat="horizontal" label="Advertisement" className="mt-10" />
      <div className="max-w-6xl mx-auto">
        <NewsSection topic="BMI body mass index obesity health fitness weight nutrition" title="Health & Fitness News" adSlot="5006000002" />
      </div>
    </div>
  )
}
