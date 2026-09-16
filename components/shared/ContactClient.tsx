"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div className="p-8 bg-card border border-border rounded-xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold">Message Received!</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Thank you for reaching out, <strong>{formData.name}</strong>. Our editorial and technical team will review your message and get back to you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: "", email: "", subject: "General Inquiry", message: "" })
          }}
          className="mt-4 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-card border border-border rounded-xl space-y-5">
      <h2 className="text-xl font-bold mb-2">Send us a Message</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
          Topic / Category
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Calculator Feedback / Formula Error">Calculator Feedback / Formula Error</option>
          <option value="New Feature Request">New Feature Request</option>
          <option value="Advertising / Partnership">Advertising / Partnership</option>
          <option value="Privacy / Data Inquiry">Privacy / Data Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
          Your Message *
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your inquiry, calculator feedback, or mathematical question in detail..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {loading ? "Sending..." : "Submit Message"}
      </button>
    </form>
  )
}
