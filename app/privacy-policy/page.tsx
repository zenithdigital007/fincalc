import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Lock, Eye, Server, Cookie } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"

const SITE_URL = 'https://loancalculator-nu.vercel.app'
const PAGE_URL = `${SITE_URL}/privacy-policy`

export const metadata: Metadata = {
  title: "Privacy Policy — Loan Calculator",
  description:
    "Privacy Policy for Loan Calculator. Learn how we handle your data, our client-side computing principles, cookies, and Google AdSense compliance.",
  alternates: { canonical: PAGE_URL },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: PAGE_URL,
    description: "Privacy policy and data handling transparency for Loan Calculator.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: PAGE_URL },
    ],
  },
]

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 16, 2025"

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />

      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
          <ShieldCheck className="w-3.5 h-3.5" /> Privacy & Transparency
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 leading-relaxed text-muted-foreground">
        <section className="bg-card border border-border p-6 rounded-xl text-foreground">
          <h2 className="text-xl font-semibold mb-2">Our Core Privacy Promise</h2>
          <p className="text-sm text-muted-foreground">
            At <strong>Loan Calculator</strong> (accessible from <Link href="/" className="underline text-primary">{SITE_URL}</Link>), we believe your financial details are strictly your own business. All loan amounts, interest rates, salary figures, and personal calculations entered into our calculators are processed <strong>entirely inside your web browser (client-side)</strong>. We do not store, transmit, or sell your calculation inputs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
          <p>
            When you visit Loan Calculator, we may collect non-personally identifiable information automatically:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Log and Device Data:</strong> Browser type, operating system, referring URL, time spent on pages, and general device category (mobile vs desktop) collected anonymously for site performance optimization.</li>
            <li><strong>Voluntary Inquiries:</strong> If you contact us directly via our <Link href="/contact" className="underline text-primary">Contact Us</Link> page, we receive the name and email address you submit in order to respond to your inquiry.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Cookies and Web Beacons</h2>
          <p>
            Like any modern web application, Loan Calculator uses standard browser cookies. Cookies are used to store visitors preferences, record user-specific information on which pages the visitor accesses, and maintain theme settings (e.g. Dark Mode / Light Mode) or selected currency preferences (INR, USD, EUR, etc.).
          </p>
        </section>

        <section className="bg-muted/30 border border-border p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Google DoubleClick DART Cookie & Google AdSense</h2>
          <p className="mb-4">
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm mb-4">
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
            <li>Visitors may choose to decline the use of DART cookies or personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline text-primary">Google Ads Settings</a>.</li>
            <li>Alternatively, users can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="underline text-primary">www.aboutads.info</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Advertising Partners</h2>
          <p className="mb-3">
            Some advertising partners on our site may use cookies and web beacons. Our advertising partners include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Google AdSense</strong> (<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline text-primary">Google Advertising Policies</a>)</li>
          </ul>
          <p className="mt-3 text-sm">
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Loan Calculator, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. GDPR & CCPA Compliance</h2>
          <p className="mb-3">
            If you are a resident of the European Economic Area (EEA) or California (USA), you have specific data protection rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>The right to access</strong> — You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> — You have the right to request correction of inaccurate information.</li>
            <li><strong>The right to erasure</strong> — You have the right to request deletion of your personal data under certain conditions.</li>
            <li><strong>The right to restrict or object to processing</strong> — You have the right to request restriction or object to our processing of your personal data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">6. Children&apos;s Information</h2>
          <p>
            Protecting children online is paramount. Loan Calculator does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Information</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to reach out through our <Link href="/contact" className="underline text-primary">Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
