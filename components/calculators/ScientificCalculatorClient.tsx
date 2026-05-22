"use client"

import { useState, useCallback, useEffect } from "react"
import { Delete } from "lucide-react"

type AngleMode = "DEG" | "RAD"

interface SciButton {
  label: string
  value: string
  group: "number" | "operator" | "equals" | "clear" | "trig" | "log" | "const" | "memory" | "special"
  wide?: boolean
}

const ROWS: SciButton[][] = [
  [
    { label: "Deg", value: "DEG", group: "special" },
    { label: "sin", value: "sin", group: "trig" },
    { label: "cos", value: "cos", group: "trig" },
    { label: "tan", value: "tan", group: "trig" },
    { label: "π", value: "π", group: "const" },
    { label: "e", value: "e", group: "const" },
  ],
  [
    { label: "Rad", value: "RAD", group: "special" },
    { label: "sin⁻¹", value: "asin", group: "trig" },
    { label: "cos⁻¹", value: "acos", group: "trig" },
    { label: "tan⁻¹", value: "atan", group: "trig" },
    { label: "log", value: "log", group: "log" },
    { label: "ln", value: "ln", group: "log" },
  ],
  [
    { label: "x²", value: "sq", group: "log" },
    { label: "√", value: "sqrt", group: "log" },
    { label: "xⁿ", value: "^", group: "operator" },
    { label: "1/x", value: "1/x", group: "log" },
    { label: "(", value: "(", group: "special" },
    { label: ")", value: ")", group: "special" },
  ],
  [
    { label: "C", value: "C", group: "clear" },
    { label: "±", value: "±", group: "special" },
    { label: "%", value: "%", group: "special" },
    { label: "÷", value: "/", group: "operator" },
    { label: "MC", value: "MC", group: "memory" },
    { label: "MR", value: "MR", group: "memory" },
  ],
  [
    { label: "7", value: "7", group: "number" },
    { label: "8", value: "8", group: "number" },
    { label: "9", value: "9", group: "number" },
    { label: "×", value: "*", group: "operator" },
    { label: "M+", value: "M+", group: "memory" },
    { label: "M-", value: "M-", group: "memory" },
  ],
  [
    { label: "4", value: "4", group: "number" },
    { label: "5", value: "5", group: "number" },
    { label: "6", value: "6", group: "number" },
    { label: "−", value: "-", group: "operator" },
    { label: "EXP", value: "EXP", group: "special" },
    { label: "!", value: "!", group: "special" },
  ],
  [
    { label: "1", value: "1", group: "number" },
    { label: "2", value: "2", group: "number" },
    { label: "3", value: "3", group: "number" },
    { label: "+", value: "+", group: "operator" },
    { label: "ANS", value: "ANS", group: "memory" },
    { label: "=", value: "=", group: "equals" },
  ],
  [
    { label: "0", value: "0", group: "number", wide: true },
    { label: ".", value: ".", group: "number" },
    { label: "×10ⁿ", value: "e10", group: "special" },
  ],
]

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN
  if (n === 0 || n === 1) return 1
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}

function evaluateExpression(expr: string, angleMode: AngleMode): number {
  let e = expr
    .replace(/π/g, String(Math.PI))
    .replace(/\be\b/g, String(Math.E))
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-")

  // Handle power
  e = e.replace(/\^/g, "**")

  // Handle factorial x!
  e = e.replace(/(\d+\.?\d*)!/g, (_, n) => String(factorial(parseFloat(n))))

  // Handle EXP notation
  e = e.replace(/(\d+\.?\d*)EXP(\d+)/g, (_, a, b) => String(parseFloat(a) * Math.pow(10, parseFloat(b))))

  // Handle functions
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const fromRad = (rad: number) => (rad * 180) / Math.PI

  e = e.replace(/sin\(([^)]+)\)/g, (_, v) => {
    const n = parseFloat(v)
    return String(Math.sin(angleMode === "DEG" ? toRad(n) : n))
  })
  e = e.replace(/cos\(([^)]+)\)/g, (_, v) => {
    const n = parseFloat(v)
    return String(Math.cos(angleMode === "DEG" ? toRad(n) : n))
  })
  e = e.replace(/tan\(([^)]+)\)/g, (_, v) => {
    const n = parseFloat(v)
    return String(Math.tan(angleMode === "DEG" ? toRad(n) : n))
  })
  e = e.replace(/asin\(([^)]+)\)/g, (_, v) => {
    const n = Math.asin(parseFloat(v))
    return String(angleMode === "DEG" ? fromRad(n) : n)
  })
  e = e.replace(/acos\(([^)]+)\)/g, (_, v) => {
    const n = Math.acos(parseFloat(v))
    return String(angleMode === "DEG" ? fromRad(n) : n)
  })
  e = e.replace(/atan\(([^)]+)\)/g, (_, v) => {
    const n = Math.atan(parseFloat(v))
    return String(angleMode === "DEG" ? fromRad(n) : n)
  })
  e = e.replace(/sqrt\(([^)]+)\)/g, (_, v) => String(Math.sqrt(parseFloat(v))))
  e = e.replace(/log\(([^)]+)\)/g, (_, v) => String(Math.log10(parseFloat(v))))
  e = e.replace(/ln\(([^)]+)\)/g, (_, v) => String(Math.log(parseFloat(v))))

  try {
    // eslint-disable-next-line no-new-func
    const result = new Function("return " + e)()
    return typeof result === "number" && isFinite(result) ? result : NaN
  } catch {
    return NaN
  }
}

export function ScientificCalculatorClient() {
  const [expression, setExpression] = useState("")
  const [display, setDisplay] = useState("0")
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG")
  const [memory, setMemory] = useState(0)
  const [lastAnswer, setLastAnswer] = useState("0")
  const [justEvaluated, setJustEvaluated] = useState(false)

  const handleInput = useCallback((value: string) => {
    if (value === "C") {
      setExpression("")
      setDisplay("0")
      setJustEvaluated(false)
      return
    }
    if (value === "DEG") { setAngleMode("DEG"); return }
    if (value === "RAD") { setAngleMode("RAD"); return }

    if (value === "MC") { setMemory(0); return }
    if (value === "MR") {
      const ms = memory.toString()
      setDisplay(ms)
      setExpression((e) => (justEvaluated ? ms : e + ms))
      setJustEvaluated(false)
      return
    }
    if (value === "M+") {
      setMemory((m) => m + parseFloat(display))
      return
    }
    if (value === "M-") {
      setMemory((m) => m - parseFloat(display))
      return
    }

    if (value === "ANS") {
      setDisplay(lastAnswer)
      setExpression((e) => e + lastAnswer)
      setJustEvaluated(false)
      return
    }

    if (value === "=") {
      const expr = expression || display
      const result = evaluateExpression(expr, angleMode)
      if (!isNaN(result)) {
        const rs = parseFloat(result.toPrecision(12)).toString()
        setLastAnswer(rs)
        setDisplay(rs)
        setExpression("")
        setJustEvaluated(true)
      } else {
        setDisplay("Error")
        setExpression("")
      }
      return
    }

    if (value === "±") {
      const negated = display.startsWith("-") ? display.slice(1) : "-" + display
      setDisplay(negated)
      setExpression(negated)
      return
    }

    if (value === "sq") {
      const n = parseFloat(display)
      setExpression((e) => `${e}**2`)
      const result = n * n
      setDisplay(result.toString())
      return
    }

    if (value === "1/x") {
      const n = parseFloat(display)
      const r = 1 / n
      setDisplay(r.toString())
      setExpression((e) => `1/(${e || display})`)
      return
    }

    if (value === "%") {
      const n = parseFloat(display) / 100
      setDisplay(n.toString())
      setExpression((e) => e.slice(0, -(display.length)) + n.toString())
      return
    }

    // Functions that open parenthesis
    const funcTokens = ["sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "log", "ln"]
    if (funcTokens.includes(value)) {
      const token = `${value}(`
      setExpression((e) => (justEvaluated ? token : e + token))
      setDisplay(token)
      setJustEvaluated(false)
      return
    }

    const isOp = ["+", "-", "*", "/", "^"].includes(value)
    if (justEvaluated && !isOp) {
      setExpression(value)
      setDisplay(value)
      setJustEvaluated(false)
      return
    }
    if (justEvaluated && isOp) {
      setExpression(display + value)
      setDisplay(value)
      setJustEvaluated(false)
      return
    }

    if (isOp) {
      setExpression((e) => e + value)
      setDisplay(value)
      return
    }

    const isNumber = /^[0-9.]$/.test(value) || value === "EXP" || value === "e10"
    if (isNumber) {
      if (value === "." && display.includes(".")) return
      const token = value === "EXP" ? "EXP" : value === "e10" ? "EXP" : value
      const nd = display === "0" && value !== "." ? token : display + token
      setDisplay(nd)
      setExpression((e) => e + token)
      return
    }

    // Parentheses, π, e
    const nd = display === "0" ? value : display + value
    setDisplay(nd)
    setExpression((e) => (justEvaluated ? value : e + value))
    setJustEvaluated(false)
  }, [expression, display, angleMode, memory, lastAnswer, justEvaluated])

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      const map: Record<string, string> = {
        "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
        "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
        "+": "+", "-": "-", "*": "*", "/": "/", ".": ".",
        "^": "^", "(": "(", ")": ")",
        "Enter": "=", "=": "=", "Escape": "C", "Backspace": "BACK",
      }
      const val = map[ev.key]
      if (!val) return
      if (val === "BACK") {
        setExpression((e) => e.slice(0, -1))
        setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"))
      } else {
        handleInput(val)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleInput])

  const btnClass = (btn: SciButton) => {
    const base = "h-12 flex items-center justify-center rounded-xl text-xs sm:text-sm font-semibold cursor-pointer select-none active:scale-95 transition-all duration-100"
    switch (btn.group) {
      case "trig": return `${base} bg-violet-500/15 text-violet-600 dark:text-violet-400 hover:bg-violet-500/25`
      case "log": return `${base} bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/25`
      case "const": return `${base} bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25`
      case "memory": return `${base} bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25`
      case "clear": return `${base} bg-destructive/15 text-destructive hover:bg-destructive/25`
      case "operator": return `${base} bg-primary/15 text-primary hover:bg-primary/25`
      case "equals": return `${base} bg-primary text-primary-foreground hover:bg-primary/90 shadow-md`
      case "special": return `${base} bg-muted text-muted-foreground hover:bg-muted/70`
      default: return `${base} bg-card hover:bg-muted border border-border text-foreground`
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <div className="xl:col-span-3 bg-card rounded-2xl border shadow-sm overflow-hidden">
        {/* Display */}
        <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 p-5 min-h-[120px] flex flex-col justify-end">
          <div className="flex justify-between items-start mb-1">
            <div className="flex gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                angleMode === "DEG" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>DEG</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                angleMode === "RAD" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>RAD</span>
              {memory !== 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-500">
                  M={memory}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setExpression((e) => e.slice(0, -1))
                setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"))
              }}
              className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground"
            >
              <Delete className="w-4 h-4" />
            </button>
          </div>
          <div className="text-right text-muted-foreground text-xs font-mono mb-1 min-h-4">{expression}</div>
          <div className="text-right text-4xl font-light font-mono truncate">{display}</div>
        </div>

        {/* Buttons */}
        <div className="p-4 grid grid-cols-6 gap-2">
          {ROWS.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => handleInput(btn.value)}
              className={`${btnClass(btn)} ${btn.wide ? "col-span-2" : ""}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-card rounded-2xl border shadow-sm p-5 space-y-4">
        <h3 className="font-bold text-sm">Button Guide</h3>
        <div className="space-y-3 text-xs">
          {[
            { color: "bg-violet-500/15 text-violet-600 dark:text-violet-400", label: "Trigonometry", items: "sin, cos, tan and inverses" },
            { color: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400", label: "Logarithmic", items: "log, ln, √, x², 1/x" },
            { color: "bg-amber-500/15 text-amber-600 dark:text-amber-400", label: "Constants", items: "π (3.14159...), e (2.71828...)" },
            { color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400", label: "Memory", items: "MC, MR, M+, M−, ANS" },
            { color: "bg-primary/15 text-primary", label: "Operators", items: "+, −, ×, ÷, xⁿ" },
          ].map((item) => (
            <div key={item.label} className="p-2.5 rounded-xl" style={{}}>
              <div className={`inline-block px-2 py-0.5 rounded-lg text-xs font-medium mb-1 ${item.color}`}>
                {item.label}
              </div>
              <p className="text-muted-foreground">{item.items}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Tips</p>
          <p>• Use DEG/RAD to switch angle mode for trig functions</p>
          <p>• ANS recalls the last result</p>
          <p>• M+/M− to store sums in memory</p>
          <p>• Keyboard supported</p>
        </div>
      </div>
    </div>
  )
}
