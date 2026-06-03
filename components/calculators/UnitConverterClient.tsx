"use client"
import { useState } from "react"

type Category = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed'

const UNITS: Record<Category, { label: string; units: { name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
  length: {
    label: 'Length',
    units: [
      { name: 'Meter (m)',       toBase: v => v,      fromBase: v => v },
      { name: 'Kilometer (km)',  toBase: v => v*1000,  fromBase: v => v/1000 },
      { name: 'Centimeter (cm)',toBase: v => v/100,   fromBase: v => v*100 },
      { name: 'Millimeter (mm)',toBase: v => v/1000,  fromBase: v => v*1000 },
      { name: 'Mile (mi)',       toBase: v => v*1609.344, fromBase: v => v/1609.344 },
      { name: 'Foot (ft)',       toBase: v => v*0.3048,   fromBase: v => v/0.3048 },
      { name: 'Inch (in)',       toBase: v => v*0.0254,   fromBase: v => v/0.0254 },
      { name: 'Yard (yd)',       toBase: v => v*0.9144,   fromBase: v => v/0.9144 },
    ],
  },
  weight: {
    label: 'Weight / Mass',
    units: [
      { name: 'Kilogram (kg)', toBase: v => v,      fromBase: v => v },
      { name: 'Gram (g)',      toBase: v => v/1000,  fromBase: v => v*1000 },
      { name: 'Milligram (mg)',toBase: v => v/1e6,   fromBase: v => v*1e6 },
      { name: 'Tonne (t)',     toBase: v => v*1000,  fromBase: v => v/1000 },
      { name: 'Pound (lb)',    toBase: v => v*0.4536, fromBase: v => v/0.4536 },
      { name: 'Ounce (oz)',    toBase: v => v*0.02835, fromBase: v => v/0.02835 },
    ],
  },
  temperature: {
    label: 'Temperature',
    units: [
      { name: 'Celsius (°C)',    toBase: v => v,               fromBase: v => v },
      { name: 'Fahrenheit (°F)', toBase: v => (v-32)*5/9,       fromBase: v => v*9/5+32 },
      { name: 'Kelvin (K)',      toBase: v => v-273.15,         fromBase: v => v+273.15 },
    ],
  },
  area: {
    label: 'Area',
    units: [
      { name: 'Square Meter (m²)',  toBase: v => v,      fromBase: v => v },
      { name: 'Square Km (km²)',    toBase: v => v*1e6,   fromBase: v => v/1e6 },
      { name: 'Square Foot (ft²)',  toBase: v => v*0.0929, fromBase: v => v/0.0929 },
      { name: 'Acre',               toBase: v => v*4047,   fromBase: v => v/4047 },
      { name: 'Hectare (ha)',        toBase: v => v*10000,  fromBase: v => v/10000 },
    ],
  },
  volume: {
    label: 'Volume',
    units: [
      { name: 'Liter (L)',      toBase: v => v,      fromBase: v => v },
      { name: 'Milliliter (mL)',toBase: v => v/1000,  fromBase: v => v*1000 },
      { name: 'Cubic Meter (m³)',toBase: v => v*1000, fromBase: v => v/1000 },
      { name: 'Gallon (US)',    toBase: v => v*3.785, fromBase: v => v/3.785 },
      { name: 'Fluid Ounce',   toBase: v => v*0.02957, fromBase: v => v/0.02957 },
    ],
  },
  speed: {
    label: 'Speed',
    units: [
      { name: 'km/h',   toBase: v => v,        fromBase: v => v },
      { name: 'm/s',    toBase: v => v*3.6,    fromBase: v => v/3.6 },
      { name: 'mph',    toBase: v => v*1.60934,fromBase: v => v/1.60934 },
      { name: 'Knots',  toBase: v => v*1.852,  fromBase: v => v/1.852 },
    ],
  },
}

const CATEGORIES: Category[] = ['length', 'weight', 'temperature', 'area', 'volume', 'speed']

export function UnitConverterClient() {
  const [category, setCategory] = useState<Category>('length')
  const [fromIdx, setFromIdx] = useState(0)
  const [toIdx, setToIdx] = useState(1)
  const [inputVal, setInputVal] = useState('1')

  const cat = UNITS[category]
  const from = cat.units[Math.min(fromIdx, cat.units.length - 1)]
  const to   = cat.units[Math.min(toIdx, cat.units.length - 1)]

  const numVal = parseFloat(inputVal) || 0
  const converted = to.fromBase(from.toBase(numVal))
  const fmt = (n: number) => {
    if (Math.abs(n) < 0.0001 || Math.abs(n) > 1e9) return n.toExponential(4)
    return Math.round(n * 1e6) / 1e6
  }

  function handleCategoryChange(c: Category) {
    setCategory(c)
    setFromIdx(0)
    setToIdx(1)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Unit Converter</h2>
        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCategoryChange(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                category === c
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {UNITS[c].label}
            </button>
          ))}
        </div>

        {/* From / To selectors */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">From</label>
            <select
              value={fromIdx}
              onChange={(e) => setFromIdx(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {cat.units.map((u, i) => <option key={u.name} value={i}>{u.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">To</label>
            <select
              value={toIdx}
              onChange={(e) => setToIdx(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {cat.units.map((u, i) => <option key={u.name} value={i}>{u.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Value to Convert</label>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Enter value"
          />
        </div>
      </div>

      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Result</h3>
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground mb-1">{from.name}</p>
          <p className="text-2xl font-bold">{numVal}</p>
          <p className="text-sm text-muted-foreground my-3">↓ equals ↓</p>
          <p className="text-xs text-muted-foreground mb-1">{to.name}</p>
          <p className="text-4xl font-black text-primary break-all">{fmt(converted)}</p>
        </div>
      </div>
    </div>
  )
}
