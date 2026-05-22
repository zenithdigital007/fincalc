"use client"

import { useState, useCallback, useEffect } from "react"
import { Delete } from "lucide-react"

type ButtonType = "number" | "operator" | "equals" | "clear" | "special"

interface CalcButton {
  label: string
  value: string
  type: ButtonType
  wide?: boolean
}

const BUTTONS: CalcButton[][] = [
  [
    { label: "C", value: "C", type: "clear" },
    { label: "±", value: "±", type: "special" },
    { label: "%", value: "%", type: "special" },
    { label: "÷", value: "/", type: "operator" },
  ],
  [
    { label: "7", value: "7", type: "number" },
    { label: "8", value: "8", type: "number" },
    { label: "9", value: "9", type: "number" },
    { label: "×", value: "*", type: "operator" },
  ],
  [
    { label: "4", value: "4", type: "number" },
    { label: "5", value: "5", type: "number" },
    { label: "6", value: "6", type: "number" },
    { label: "−", value: "-", type: "operator" },
  ],
  [
    { label: "1", value: "1", type: "number" },
    { label: "2", value: "2", type: "number" },
    { label: "3", value: "3", type: "number" },
    { label: "+", value: "+", type: "operator" },
  ],
  [
    { label: "0", value: "0", type: "number", wide: true },
    { label: ".", value: ".", type: "number" },
    { label: "=", value: "=", type: "equals" },
  ],
]

function safeEval(expression: string): number {
  // Replace safe operators only
  const sanitized = expression.replace(/[^0-9+\-*/.()]/g, "")
  try {
    // Use Function constructor for safe eval
    // eslint-disable-next-line no-new-func
    const result = new Function("return " + sanitized)()
    return typeof result === "number" && isFinite(result) ? result : NaN
  } catch {
    return NaN
  }
}

export function NormalCalculatorClient() {
  const [expression, setExpression] = useState("")
  const [display, setDisplay] = useState("0")
  const [history, setHistory] = useState<string[]>([])
  const [justEvaluated, setJustEvaluated] = useState(false)

  const handleInput = useCallback((value: string) => {
    if (value === "C") {
      setExpression("")
      setDisplay("0")
      setJustEvaluated(false)
      return
    }

    if (value === "=") {
      const expr = expression || display
      const result = safeEval(expr)
      if (!isNaN(result)) {
        const resultStr = parseFloat(result.toPrecision(12)).toString()
        setHistory((h) => [`${expr} = ${resultStr}`, ...h.slice(0, 9)])
        setDisplay(resultStr)
        setExpression("")
        setJustEvaluated(true)
      } else {
        setDisplay("Error")
        setExpression("")
      }
      return
    }

    if (value === "±") {
      if (display !== "0") {
        const negated = display.startsWith("-") ? display.slice(1) : "-" + display
        setDisplay(negated)
        setExpression(negated)
      }
      return
    }

    if (value === "%") {
      const val = parseFloat(display)
      if (!isNaN(val)) {
        const pct = (val / 100).toString()
        setDisplay(pct)
        setExpression(expression.slice(0, -display.length) + pct)
      }
      return
    }

    const isOperator = ["+", "-", "*", "/"].includes(value)

    if (justEvaluated && !isOperator) {
      setExpression(value)
      setDisplay(value)
      setJustEvaluated(false)
      return
    }

    if (justEvaluated && isOperator) {
      setExpression(display + value)
      setDisplay(value)
      setJustEvaluated(false)
      return
    }

    if (isOperator) {
      setExpression((e) => e + value)
      setDisplay(value)
      return
    }

    if (value === "." && display.includes(".")) return

    const newDisplay = display === "0" && value !== "." ? value : display + value
    setDisplay(newDisplay)
    setExpression((e) => e + value)
  }, [expression, display, justEvaluated])

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
        "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
        "+": "+", "-": "-", "*": "*", "/": "/", ".": ".",
        "Enter": "=", "=": "=", "Escape": "C", "Backspace": "BACK",
      }
      const val = map[e.key]
      if (!val) return
      if (val === "BACK") {
        setExpression((ex) => ex.slice(0, -1))
        setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"))
      } else {
        handleInput(val)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleInput])

  const buttonClass = (btn: CalcButton) => {
    const base = "flex items-center justify-center rounded-2xl text-xl font-semibold cursor-pointer select-none active:scale-95 transition-transform duration-100"
    const wide = btn.wide ? "col-span-2" : ""
    switch (btn.type) {
      case "clear": return `${base} ${wide} bg-destructive/15 text-destructive hover:bg-destructive/25`
      case "operator": return `${base} ${wide} bg-primary/15 text-primary hover:bg-primary/25`
      case "equals": return `${base} ${wide} bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30`
      case "special": return `${base} ${wide} bg-muted text-muted-foreground hover:bg-muted/80`
      default: return `${base} ${wide} bg-card hover:bg-muted border border-border text-foreground`
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Calculator */}
      <div className="lg:col-span-2">
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          {/* Display */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 min-h-[140px] flex flex-col justify-end">
            <div className="text-right text-muted-foreground text-sm mb-1 h-5 font-mono">
              {expression}
            </div>
            <div className="text-right text-5xl font-light font-mono tracking-tight truncate">
              {display}
            </div>
          </div>

          {/* Backspace */}
          <div className="px-4 pt-3 flex justify-end">
            <button
              onClick={() => {
                setExpression((e) => e.slice(0, -1))
                setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"))
              }}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Buttons */}
          <div className="p-4 grid grid-cols-4 gap-3">
            {BUTTONS.flat().map((btn, i) => (
              <button
                key={i}
                onClick={() => handleInput(btn.value)}
                className={`${buttonClass(btn)} h-16 ${btn.wide ? "col-span-2" : ""}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          ⌨️ Keyboard supported — use Enter to calculate, Escape to clear
        </p>
      </div>

      {/* History */}
      <div className="bg-card rounded-2xl border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">History</h3>
        {history.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">🔢</div>
            <p className="text-sm">Your calculations will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((h, i) => (
              <div
                key={i}
                className="p-3 bg-muted/50 rounded-xl text-sm font-mono cursor-pointer hover:bg-muted transition-colors"
                onClick={() => {
                  const result = h.split(" = ")[1]
                  if (result) {
                    setDisplay(result)
                    setExpression(result)
                    setJustEvaluated(true)
                  }
                }}
              >
                <span className="text-muted-foreground">{h.split(" = ")[0]} =</span>
                <span className="text-primary font-bold ml-1">{h.split(" = ")[1]}</span>
              </div>
            ))}
            <button
              onClick={() => setHistory([])}
              className="w-full mt-2 text-xs text-muted-foreground hover:text-destructive transition-colors py-2"
            >
              Clear history
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
