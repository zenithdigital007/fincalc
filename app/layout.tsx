import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { CurrencyProvider } from '@/components/providers/currency-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JsonLd } from '@/components/seo/JsonLd'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://loancalculator-nu.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'FinCalc — Free Financial & Utility Calculators Online',
    template: '%s | FinCalc',
  },
  description:
    'Free suite of financial and utility calculators: home loan EMI, car loan, personal loan, SIP returns, fixed deposit, BMI, scientific, graphing — with live news. Free forever.',
  keywords: [
    'loan calculator', 'EMI calculator', 'home loan calculator', 'car loan calculator',
    'personal loan calculator', 'SIP calculator', 'FD calculator', 'fixed deposit calculator',
    'BMI calculator', 'scientific calculator', 'graphing calculator', 'financial calculator',
    'free calculator online', 'India loan EMI', 'mutual fund SIP returns',
  ],
  authors: [{ name: 'FinCalc' }],
  creator: 'FinCalc',
  publisher: 'FinCalc',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'FinCalc',
    title: 'FinCalc — Free Financial & Utility Calculators Online',
    description:
      'Free suite of financial calculators: home loan EMI, SIP, FD, BMI, scientific, graphing and more — with live financial news.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'FinCalc — Smart Financial & Utility Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinCalc — Free Financial & Utility Calculators Online',
    description:
      'Free loan EMI, SIP, FD, BMI, scientific & graphing calculators with live news. Free forever.',
    images: [`${SITE_URL}/og-image.png`],
    creator: '@fincalc',
  },
  verification: {
    // ⬇️ PASTE YOUR GOOGLE SEARCH CONSOLE VERIFICATION CODE HERE
    // Get it from: https://search.google.com/search-console → Add property → HTML tag method
    google: 'Zb8EP1S1YTgPgfSXRdl6HLAF887MB5zfWo2E0l4Z5S0',
  },
  category: 'finance',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FinCalc',
  url: SITE_URL,
  description:
    'Free suite of financial and utility calculators including loan EMI, SIP, FD, BMI, scientific and graphing calculators.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FinCalc',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification — hardcoded for reliability */}
        <meta name="google-site-verification" content="Zb8EP1S1YTgPgfSXRdl6HLAF887MB5zfWo2E0l4Z5S0" />
        {/* Google AdSense — native script tag for server-side HTML inclusion */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4543066948758573"
          crossOrigin="anonymous"
        />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CurrencyProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
