"use client"

import * as React from "react"

export interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
  prefix?: string
  suffix?: string
  className?: string
}

function extractPrefixAndSuffix(
  formatValue?: (val: number) => string,
  explicitPrefix?: string,
  explicitSuffix?: string
): { prefix: string; suffix: string } {
  if (explicitPrefix !== undefined || explicitSuffix !== undefined) {
    return {
      prefix: explicitPrefix || "",
      suffix: explicitSuffix || "",
    }
  }

  if (!formatValue) {
    return { prefix: "", suffix: "" }
  }

  // Sample with 12345 to inspect formatting
  const sample = formatValue(12345)

  let prefix = ""
  let suffix = ""

  // Match non-numeric leading symbols (e.g. "$", "₹", "€", "£", "A$", "C$", "S$", etc.)
  const prefixMatch = sample.match(/^([^0-9\s.,]+)/)
  if (prefixMatch) {
    prefix = prefixMatch[1].trim()
  }

  // Match non-numeric trailing symbols (e.g. "%", "Yr", "yr", "km/L", "OFF", etc.)
  const suffixMatch = sample.match(/([^0-9\s.,]+)$/)
  if (suffixMatch) {
    suffix = suffixMatch[1].trim()
  }

  return { prefix, suffix }
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  prefix: customPrefix,
  suffix: customSuffix,
  className = "",
}: SliderInputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [rawText, setRawText] = React.useState(value.toString())

  const { prefix, suffix } = React.useMemo(
    () => extractPrefixAndSuffix(formatValue, customPrefix, customSuffix),
    [formatValue, customPrefix, customSuffix]
  )

  // Keep rawText in sync with value when not focused
  React.useEffect(() => {
    if (!isFocused) {
      setRawText(value.toString())
    }
  }, [value, isFocused])

  // Formatted string to show when not focused
  const displayValue = React.useMemo(() => {
    if (step < 1) {
      return value.toString()
    }
    return value.toLocaleString("en-US")
  }, [value, step])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    setRawText(value.toString())
    e.target.select()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Allow numbers and at most one decimal point
    const sanitized = val.replace(/[^0-9.]/g, "")
    const parts = sanitized.split(".")
    const cleanVal = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : sanitized

    setRawText(cleanVal)

    if (cleanVal !== "" && cleanVal !== ".") {
      const parsed = parseFloat(cleanVal)
      if (!isNaN(parsed)) {
        onChange(parsed)
      }
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    let parsed = parseFloat(rawText)
    if (isNaN(parsed)) {
      parsed = min
    }
    const clamped = Math.min(max, Math.max(min, parsed))
    onChange(clamped)
    setRawText(clamped.toString())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }

  const minLabel = formatValue ? formatValue(min) : `${prefix}${min}${suffix ? " " + suffix : ""}`
  const maxLabel = formatValue ? formatValue(max) : `${prefix}${max}${suffix ? " " + suffix : ""}`

  return (
    <div className={`space-y-4 group ${className}`}>
      <div className="flex justify-between items-center gap-4">
        <label className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer">
          {label}
        </label>
        
        {/* Editable Value Text Box */}
        <div className="flex items-center bg-card border border-input rounded-xl px-3 py-1.5 shadow-xs focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all group-hover:border-primary/40">
          {prefix && (
            <span className="text-xs font-semibold text-muted-foreground select-none mr-1.5">
              {prefix}
            </span>
          )}
          <input
            type="text"
            inputMode="decimal"
            value={isFocused ? rawText : displayValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-24 sm:w-28 text-right bg-transparent text-sm font-bold text-foreground focus:outline-none focus:text-primary transition-colors cursor-text"
            aria-label={label}
          />
          {suffix && (
            <span className="text-xs font-semibold text-muted-foreground select-none ml-1.5">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        aria-label={`${label} slider`}
      />

      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}
