"use client"

import { useState, useCallback } from "react"
import { Scale, Ruler, ArrowRight, Info } from "lucide-react"

type Unit = "metric" | "imperial"

interface BMICategory {
  label: string
  range: string
  color: string
  bgColor: string
  min: number
  max: number
}

const BMI_CATEGORIES: BMICategory[] = [
  { label: "Underweight", range: "< 18.5", color: "text-blue-500", bgColor: "bg-blue-500", min: 0, max: 18.5 },
  { label: "Normal Weight", range: "18.5 – 24.9", color: "text-emerald-500", bgColor: "bg-emerald-500", min: 18.5, max: 25 },
  { label: "Overweight", range: "25 – 29.9", color: "text-amber-500", bgColor: "bg-amber-500", min: 25, max: 30 },
  { label: "Obese", range: "≥ 30", color: "text-red-500", bgColor: "bg-red-500", min: 30, max: 100 },
]

function getCategory(bmi: number): BMICategory {
  return BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) || BMI_CATEGORIES[3]
}

function getBMIGaugePercent(bmi: number): number {
  // Scale: 10 = 0%, 40 = 100%
  const clamped = Math.min(Math.max(bmi, 10), 40)
  return ((clamped - 10) / 30) * 100
}

export function BmiCalculatorClient() {
  const [unit, setUnit] = useState<Unit>("metric")
  const [heightCm, setHeightCm] = useState(170)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(7)
  const [weightKg, setWeightKg] = useState(70)
  const [weightLbs, setWeightLbs] = useState(154)
  const [age, setAge] = useState(25)
  const [gender, setGender] = useState<"male" | "female">("male")

  const calculateBMI = useCallback((): number => {
    if (unit === "metric") {
      const hm = heightCm / 100
      return parseFloat((weightKg / (hm * hm)).toFixed(1))
    } else {
      const totalInches = heightFt * 12 + heightIn
      return parseFloat(((weightLbs / (totalInches * totalInches)) * 703).toFixed(1))
    }
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLbs])

  const bmi = calculateBMI()
  const category = getCategory(bmi)
  const gaugePercent = getBMIGaugePercent(bmi)

  const idealWeightMin = unit === "metric"
    ? parseFloat(((18.5 * (heightCm / 100) ** 2)).toFixed(1))
    : parseFloat(((18.5 * ((heightFt * 12 + heightIn) ** 2)) / 703).toFixed(1))
  const idealWeightMax = unit === "metric"
    ? parseFloat(((24.9 * (heightCm / 100) ** 2)).toFixed(1))
    : parseFloat(((24.9 * ((heightFt * 12 + heightIn) ** 2)) / 703).toFixed(1))

  return (
    <div className="space-y-8">
      {/* Unit Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex bg-muted rounded-full p-1 gap-1">
          {(["metric", "imperial"] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                unit === u
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {u === "metric" ? "Metric (kg, cm)" : "Imperial (lbs, ft)"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-6 bg-card p-8 rounded-2xl border shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Enter Your Details</h2>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">Gender</label>
            <div className="flex gap-3">
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                    gender === g
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {g === "male" ? "👨 Male" : "👩 Female"}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-muted-foreground">Age</label>
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{age} yrs</span>
            </div>
            <input
              type="range"
              min={1} max={120} value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-primary h-2 rounded-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1</span><span>120</span>
            </div>
          </div>

          {/* Height */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-muted-foreground">Height</label>
            </div>
            {unit === "metric" ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Centimeters</span>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{heightCm} cm</span>
                </div>
                <input
                  type="range" min={50} max={250} value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-primary h-2 rounded-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50 cm</span><span>250 cm</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Feet</span>
                    <span className="text-sm font-bold text-primary">{heightFt} ft</span>
                  </div>
                  <input
                    type="range" min={1} max={8} value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Inches</span>
                    <span className="text-sm font-bold text-primary">{heightIn} in</span>
                  </div>
                  <input
                    type="range" min={0} max={11} value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Weight */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-muted-foreground">Weight</label>
            </div>
            {unit === "metric" ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Kilograms</span>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{weightKg} kg</span>
                </div>
                <input
                  type="range" min={1} max={300} value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-primary h-2 rounded-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 kg</span><span>300 kg</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Pounds</span>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{weightLbs} lbs</span>
                </div>
                <input
                  type="range" min={1} max={660} value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-primary h-2 rounded-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 lbs</span><span>660 lbs</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* BMI Score Card */}
          <div className="bg-card p-6 rounded-2xl border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Your BMI Score</h3>
            <div className={`text-7xl font-black mb-2 ${category.color}`}>{bmi}</div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${category.color} bg-current/10`} style={{backgroundColor: `color-mix(in srgb, currentColor 10%, transparent)`}}>
              <div className={`w-2 h-2 rounded-full ${category.bgColor}`} />
              {category.label}
            </div>

            {/* Gauge Bar */}
            <div className="mt-6">
              <div className="relative h-3 bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-red-500 rounded-full overflow-hidden">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-foreground rounded-full shadow-md transition-all duration-300"
                  style={{ left: `calc(${gaugePercent}% - 8px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>10</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40+</span>
              </div>
            </div>
          </div>

          {/* Category Legend */}
          <div className="bg-card p-5 rounded-2xl border shadow-sm space-y-2">
            {BMI_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                  cat.label === category.label ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.bgColor}`} />
                  <span className={`text-sm font-medium ${cat.label === category.label ? cat.color : "text-muted-foreground"}`}>
                    {cat.label}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{cat.range}</span>
              </div>
            ))}
          </div>

          {/* Ideal Weight */}
          <div className="bg-card p-5 rounded-2xl border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold">Ideal Weight Range</h4>
            </div>
            <p className="text-2xl font-bold text-primary">
              {idealWeightMin} – {idealWeightMax}
              <span className="text-sm font-normal text-muted-foreground ml-1">{unit === "metric" ? "kg" : "lbs"}</span>
            </p>
            <div className="flex items-start gap-2 mt-3 p-3 bg-muted/50 rounded-xl">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                Based on a healthy BMI range of 18.5–24.9. Consult a healthcare professional for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
