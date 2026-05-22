"use client"

import * as React from "react"

interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
}

export function SliderInput({ label, value, min, max, step = 1, onChange, formatValue }: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : value.toString()

  return (
    <div className="space-y-4 group">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{label}</label>
        <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl border border-primary/20 text-sm font-bold shadow-sm smooth-transition group-hover:shadow-md group-hover:-translate-y-0.5">
          {displayValue}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  )
}
