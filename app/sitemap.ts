import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fincalc.example.com' // Replace with your actual domain

  // Static routes
  const routes = [
    '',
    '/home-loan',
    '/car-loan',
    '/personal-loan',
    '/sip',
    '/fd',
    '/bmi',
    '/calculator',
    '/scientific-calculator',
    '/graphing-calculator',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic blog routes
  const posts = getSortedPostsData()
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...blogRoutes]
}
