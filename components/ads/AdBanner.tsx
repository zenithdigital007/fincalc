"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  /** Your AdSense publisher ID: ca-pub-XXXXXXXXXXXXXXXX */
  publisherId?: string
  /** The ad slot ID from your AdSense account */
  adSlot: string
  /** Ad format */
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  /** Full width responsive */
  fullWidthResponsive?: boolean
  /** Visual label shown above the ad */
  label?: string
  /** Extra wrapper class */
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || ""

export function AdBanner({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  label = "Advertisement",
  className = "",
}: AdBannerProps) {
  const ref = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!PUB_ID || pushed.current) return
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
      pushed.current = true
    } catch (e) {
      console.warn("AdSense push failed:", e)
    }
  }, [])

  // Dev / no publisher-id fallback — show a styled placeholder
  if (!PUB_ID) {
    return (
      <div className={`w-full flex flex-col items-center gap-1 py-3 ${className}`}>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium">{label}</p>
        <div className="w-full min-h-[90px] rounded-xl border border-dashed border-border bg-muted/30 flex items-center justify-center">
          <p className="text-xs text-muted-foreground/60">
            AdSense · Set <code className="bg-muted px-1 rounded">NEXT_PUBLIC_ADSENSE_PUBLISHER_ID</code> in .env.local
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full flex flex-col items-center gap-1 py-3 ${className}`}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium">{label}</p>
      <ins
        ref={ref}
        className="adsbygoogle w-full block"
        style={{ display: "block" }}
        data-ad-client={PUB_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}
