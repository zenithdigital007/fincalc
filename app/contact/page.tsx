import { Metadata } from "next"
import { ContactClient } from "@/components/shared/ContactClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { Mail, MessageSquare, Clock, Globe } from "lucide-react"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/contact`

export const metadata: Metadata = {
  title: "Contact Us — Support, Inquiries & Feedback | Loan Calculator",
  description:
    "Get in touch with the Loan Calculator team. Reach out for calculation questions, feature requests, partnership inquiries, or mathematical feedback.",
  alternates: { canonical: PAGE_URL },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Loan Calculator",
    url: PAGE_URL,
    description: "Contact details and feedback form for Loan Calculator.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: PAGE_URL },
    ],
  },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />

      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Have a suggestion for a new calculator, found a formula discrepancy, or have a general inquiry? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Direct Email</h3>
                <p className="text-xs text-muted-foreground">For general & press queries</p>
              </div>
            </div>
            <p className="text-sm font-mono text-primary mt-3">support@loancalculator.app</p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Response Time</h3>
                <p className="text-xs text-muted-foreground">Fast turnaround</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              We aim to reply to all user inquiries within 24–48 business hours.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Location & Scope</h3>
                <p className="text-xs text-muted-foreground">Worldwide service</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Providing financial & computational tooling for global audiences.
            </p>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-2">
          <ContactClient />
        </div>
      </div>
    </div>
  )
}
