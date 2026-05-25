import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/blog'

const SITE_URL = 'https://loancalculator-nu.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with priorities
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/home-loan`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/car-loan`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/personal-loan`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sip`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/fd`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/bmi`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calculator`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/scientific-calculator`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/graphing-calculator`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = getSortedPostsData()
    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.id}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Blog posts not available at build time — skip
  }

  return [...routes, ...blogRoutes]
}
