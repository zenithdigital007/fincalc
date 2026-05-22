"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Clock, Newspaper } from "lucide-react"
import { AdBanner } from "@/components/ads/AdBanner"

interface NewsArticle {
  title: string
  description: string
  url: string
  image: string | null
  source: string
  publishedAt: string
}

interface NewsSectionProps {
  topic: string
  title?: string
  /** Optional AdSense slot to show between news rows */
  adSlot?: string
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  } catch {
    return ""
  }
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="h-40 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded-lg w-3/4" />
        <div className="h-3 bg-muted rounded-lg" />
        <div className="h-3 bg-muted rounded-lg w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-3 bg-muted rounded-lg w-1/4" />
          <div className="h-3 bg-muted rounded-lg w-1/5" />
        </div>
      </div>
    </div>
  )
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover-lift smooth-transition hover:border-foreground/20"
    >
      {/* Thumbnail */}
      <div className="h-44 bg-muted relative overflow-hidden shrink-0">
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Newspaper className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 smooth-transition">
          <div className="bg-background/90 backdrop-blur-sm rounded-full p-1.5 shadow">
            <ExternalLink className="w-3 h-3 text-foreground" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <p className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline decoration-muted-foreground underline-offset-2 mb-2">
          {article.title}
        </p>
        {article.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
            {article.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 border-t border-border">
          <span className="font-medium truncate max-w-[55%]">{article.source}</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  )
}

export function NewsSection({
  topic,
  title = "Latest News",
  adSlot = "1234567890",
}: NewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchNews() {
      setLoading(true)
      try {
        const res = await fetch(`/api/news?topic=${encodeURIComponent(topic)}`)
        const data = await res.json()
        if (!cancelled) {
          setArticles(data.articles || [])
          setIsFallback(data.source === "fallback")
        }
      } catch {
        if (!cancelled) setArticles([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchNews()
    return () => { cancelled = true }
  }, [topic])

  const topRow    = articles.slice(0, 4)
  const bottomRow = articles.slice(4, 8)

  return (
    <section className="mt-16 space-y-8">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Newspaper className="w-4 h-4 text-foreground/70" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            {isFallback && !loading && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Add your NewsData.io key in{" "}
                <code className="bg-muted px-1 rounded">.env.local</code> for live articles
              </p>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground pt-1 shrink-0">Powered by NewsData.io</div>
      </div>

      {/* Top row — 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : topRow.map((a, i) => <NewsCard key={i} article={a} />)
        }
      </div>

      {/* Ad between rows */}
      <AdBanner adSlot={adSlot} adFormat="horizontal" label="Advertisement" />

      {/* Bottom row — up to 4 more cards if available */}
      {!loading && bottomRow.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bottomRow.map((a, i) => <NewsCard key={i} article={a} />)}
        </div>
      )}
    </section>
  )
}
