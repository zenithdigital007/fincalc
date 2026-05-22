"use client"

import { useState, useCallback, useMemo } from "react"
import { Plus, Trash2, Play, Info } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { create, all } from "mathjs"

const math = create(all)

const COLORS = [
  "hsl(243, 75%, 59%)",   // Primary indigo
  "hsl(340, 80%, 55%)",   // Rose
  "hsl(160, 65%, 45%)",   // Emerald
  "hsl(30, 90%, 55%)",    // Amber
]

interface FunctionEntry {
  id: string
  expression: string
  color: string
  visible: boolean
  error: string | null
}

function safeEvaluate(expr: string, x: number): number | null {
  try {
    const scope = { x, sin: Math.sin, cos: Math.cos, tan: Math.tan, PI: Math.PI, E: Math.E, e: Math.E, pi: Math.PI }
    const result = math.evaluate(expr, scope)
    if (typeof result !== "number" || !isFinite(result)) return null
    return result
  } catch {
    return null
  }
}

function generatePoints(expr: string, xMin: number, xMax: number, steps = 300) {
  const pts: { x: number; y: number | null }[] = []
  const step = (xMax - xMin) / steps
  for (let i = 0; i <= steps; i++) {
    const x = parseFloat((xMin + i * step).toFixed(6))
    const y = safeEvaluate(expr, x)
    pts.push({ x, y })
  }
  return pts
}

const EXAMPLE_FUNCTIONS = [
  { label: "Sine wave", expr: "sin(x)" },
  { label: "Parabola", expr: "x^2" },
  { label: "Cosine", expr: "cos(x)" },
  { label: "Cubic", expr: "x^3 / 10" },
  { label: "Exponential", expr: "e^x / 10" },
  { label: "Tangent", expr: "tan(x)" },
  { label: "Absolute value", expr: "abs(x)" },
  { label: "Square root", expr: "sqrt(abs(x))" },
]

export function GraphingCalculatorClient() {
  const [functions, setFunctions] = useState<FunctionEntry[]>([
    { id: "1", expression: "sin(x)", color: COLORS[0], visible: true, error: null },
    { id: "2", expression: "x^2 / 4", color: COLORS[1], visible: true, error: null },
  ])
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [newExpr, setNewExpr] = useState("")

  const addFunction = useCallback(() => {
    if (!newExpr.trim() || functions.length >= 4) return
    const id = Date.now().toString()
    const color = COLORS[functions.length % COLORS.length]
    // Test if valid
    const testResult = safeEvaluate(newExpr, 0)
    const error = testResult === null && newExpr.trim() !== "" ? "Invalid expression" : null
    setFunctions((f) => [...f, { id, expression: newExpr.trim(), color, visible: true, error }])
    setNewExpr("")
  }, [newExpr, functions.length])

  const removeFunction = (id: string) => {
    setFunctions((f) => f.filter((fn) => fn.id !== id))
  }

  const toggleFunction = (id: string) => {
    setFunctions((f) => f.map((fn) => fn.id === id ? { ...fn, visible: !fn.visible } : fn))
  }

  const updateExpression = (id: string, expr: string) => {
    const testResult = safeEvaluate(expr, 0)
    const error = expr.trim() && testResult === null ? "Invalid expression" : null
    setFunctions((f) => f.map((fn) => fn.id === id ? { ...fn, expression: expr, error } : fn))
  }

  // Merge all function data into unified chart data
  const chartData = useMemo(() => {
    const steps = 300
    const step = (xMax - xMin) / steps
    const points: Record<string, number | null | undefined>[] = []

    for (let i = 0; i <= steps; i++) {
      const x = parseFloat((xMin + i * step).toFixed(4))
      const point: Record<string, number | null | undefined> = { x }
      functions.forEach((fn) => {
        if (fn.visible && !fn.error) {
          point[fn.id] = safeEvaluate(fn.expression, x)
        }
      })
      points.push(point)
    }
    return points
  }, [functions, xMin, xMax])

  return (
    <div className="space-y-8">
      {/* Function Inputs */}
      <div className="bg-card rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-5">Functions</h2>

        <div className="space-y-3">
          {functions.map((fn) => (
            <div key={fn.id} className="flex items-center gap-3">
              <button
                onClick={() => toggleFunction(fn.id)}
                className="shrink-0 w-8 h-8 rounded-lg border-2 transition-all"
                style={{
                  backgroundColor: fn.visible ? fn.color : "transparent",
                  borderColor: fn.color,
                }}
                title={fn.visible ? "Hide function" : "Show function"}
              />
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono text-muted-foreground">f(x) =</span>
                <input
                  type="text"
                  value={fn.expression}
                  onChange={(e) => updateExpression(fn.id, e.target.value)}
                  className={`w-full pl-16 pr-4 py-2.5 bg-muted rounded-xl text-sm font-mono border-2 focus:outline-none transition-colors ${
                    fn.error ? "border-destructive/50 focus:border-destructive" : "border-transparent focus:border-primary/50"
                  }`}
                  placeholder="e.g. sin(x)"
                />
                {fn.error && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-destructive">{fn.error}</span>
                )}
              </div>
              <button
                onClick={() => removeFunction(fn.id)}
                className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {functions.length < 4 && (
          <div className="flex gap-3 mt-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono text-muted-foreground">f(x) =</span>
              <input
                type="text"
                value={newExpr}
                onChange={(e) => setNewExpr(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFunction()}
                placeholder="Add function (e.g. cos(x))"
                className="w-full pl-16 pr-4 py-2.5 bg-muted rounded-xl text-sm font-mono border-2 border-transparent focus:border-primary/50 focus:outline-none"
              />
            </div>
            <button
              onClick={addFunction}
              disabled={!newExpr.trim()}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        )}

        {/* X Range */}
        <div className="flex gap-4 mt-5 pt-5 border-t">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground font-medium mb-1 block">X Min</label>
            <input
              type="number"
              value={xMin}
              onChange={(e) => setXMin(Number(e.target.value))}
              className="w-full px-3 py-2 bg-muted rounded-xl text-sm border-2 border-transparent focus:border-primary/50 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground font-medium mb-1 block">X Max</label>
            <input
              type="number"
              value={xMax}
              onChange={(e) => setXMax(Number(e.target.value))}
              className="w-full px-3 py-2 bg-muted rounded-xl text-sm border-2 border-transparent focus:border-primary/50 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card rounded-2xl border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Play className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Graph</h2>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="x"
                type="number"
                domain={[xMin, xMax]}
                tickFormatter={(v) => v.toFixed(1)}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 11 }}
                label={{ value: "x", position: "insideRight", offset: -5, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => parseFloat(v.toFixed(2)).toString()}
                label={{ value: "f(x)", angle: -90, position: "insideTopLeft", offset: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <ReferenceLine x={0} stroke="hsl(var(--foreground))" strokeOpacity={0.3} />
              <ReferenceLine y={0} stroke="hsl(var(--foreground))" strokeOpacity={0.3} />
              <RechartsTooltip
                formatter={(value, name: string) => {
                  const fn = functions.find((f) => f.id === name)
                  const numVal = typeof value === "number" ? value.toFixed(4) : "undefined"
                  return [numVal, fn ? `f(x) = ${fn.expression}` : name]
                }}
                labelFormatter={(x: number) => `x = ${parseFloat(x?.toFixed(4)).toString()}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Legend
                formatter={(value) => {
                  const fn = functions.find((f) => f.id === value)
                  return fn ? `f(x) = ${fn.expression}` : value
                }}
              />
              {functions
                .filter((fn) => fn.visible && !fn.error)
                .map((fn) => (
                  <Line
                    key={fn.id}
                    type="monotone"
                    dataKey={fn.id}
                    stroke={fn.color}
                    strokeWidth={2.5}
                    dot={false}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Example Functions */}
      <div className="bg-card rounded-2xl border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Example Functions</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_FUNCTIONS.map((ex) => (
            <button
              key={ex.expr}
              onClick={() => {
                if (functions.length < 4) {
                  setNewExpr(ex.expr)
                }
              }}
              className="px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary text-sm rounded-lg font-mono transition-colors"
            >
              {ex.label}: <span className="font-semibold">{ex.expr}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Supported: sin, cos, tan, sqrt, abs, log, exp, pi, e, ^, +, −, ×, ÷
        </p>
      </div>
    </div>
  )
}
