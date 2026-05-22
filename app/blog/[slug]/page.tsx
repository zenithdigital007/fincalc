import { Metadata } from "next"
import { getPostData, getSortedPostsData } from "@/lib/blog"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const postData = await getPostData(slug)
    return {
      title: `${postData.title} | FinCalc`,
      description: postData.description,
    }
  } catch (e) {
    return {
      title: "Post Not Found",
    }
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let postData

  try {
    postData = await getPostData(slug)
  } catch (e) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{postData.title}</h1>
        <div className="text-muted-foreground">
          {new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }} 
      />
    </article>
  )
}
