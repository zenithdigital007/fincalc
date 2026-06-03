"use client"
import { useState } from "react"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

export function DiscountCalculatorClient() {
  const [originalPrice, setOriginalPrice] = useState(100)
  const [discountPct, setDiscountPct] = useState(20)
  const { currency } = useCurrency()

  const discountAmount = (originalPrice * discountPct) / 100
  const finalPrice = originalPrice - discountAmount

  const fmt = (n: number) => formatCurrency(n, currency)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Discount Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Find out how much you save and what you actually pay</p>
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Original Price</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-muted-foreground">Discount</label>
            <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
              {discountPct}% OFF
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={discountPct}
            onChange={(e) => setDiscountPct(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span><span>100%</span>
          </div>
        </div>
        {/* Quick discount presets */}
        <div className="flex gap-2 flex-wrap">
          {[5, 10, 15, 20, 25, 30, 40, 50, 70].map((d) => (
            <button
              key={d}
              onClick={() => setDiscountPct(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                discountPct === d
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {d}% off
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Deal Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Original Price</span>
            <span className="font-semibold line-through text-muted-foreground">{fmt(originalPrice)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">You Save</span>
            <span className="font-bold text-lg text-green-500">{fmt(discountAmount)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground font-semibold">Final Price</span>
            <span className="font-bold text-2xl text-primary">{fmt(finalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
