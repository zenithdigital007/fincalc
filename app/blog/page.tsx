import { Metadata } from "next"
import Link from "next/link"
import { getSortedPostsData } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Personal Finance Blog | Loan Calculator",
  description: "Read our latest articles on personal finance, loan management, and investments.",
}

export default function BlogPage() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Finance Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, tips, and guides to help you make better financial decisions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {allPostsData.map(({ id, date, title, description }) => (
          <article key={id} className="group p-8 bg-card text-card-foreground rounded-2xl border shadow-sm hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Link href={`/blog/${id}`} className="block relative z-10">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h2>
              <small className="text-sm text-muted-foreground block mb-4">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
              <p className="text-muted-foreground">{description}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
