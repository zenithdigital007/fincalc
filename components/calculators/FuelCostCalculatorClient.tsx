"use client"
import { useState } from "react"
import { useCurrency } from "@/components/providers/currency-provider"
import { formatCurrency } from "@/lib/utils"

import { SliderInput } from "@/components/shared/SliderInput"

export function FuelCostCalculatorClient() {
  const [distance, setDistance] = useState(300)
  const [mileage, setMileage] = useState(12)
  const [fuelPrice, setFuelPrice] = useState(1.5)
  const { currency } = useCurrency()

  const fuelRequired = distance / mileage
  const totalCost = fuelRequired * fuelPrice
  const fmt = (n: number) => formatCurrency(n, currency)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold">Fuel Cost Calculator</h2>
        <p className="text-sm text-muted-foreground -mt-4">Estimate petrol/diesel cost for your trip</p>

        <SliderInput
          label="Trip Distance (km)"
          value={distance}
          min={1}
          max={3000}
          step={10}
          onChange={setDistance}
          suffix="km"
        />
        <SliderInput
          label="Vehicle Mileage (km/L)"
          value={mileage}
          min={5}
          max={60}
          step={0.5}
          onChange={setMileage}
          suffix="km/L"
        />
        <SliderInput
          label="Fuel Price (per litre)"
          value={fuelPrice}
          min={0.1}
          max={10}
          step={0.1}
          onChange={setFuelPrice}
          formatValue={(v) => `${fmt(v)}/L`}
        />
      </div>

      <div className="space-y-6 bg-card text-card-foreground p-8 rounded-2xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <h3 className="text-xl font-bold mb-4">Trip Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Distance</span>
            <span className="font-semibold">{distance} km</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Fuel Needed</span>
            <span className="font-semibold">{fuelRequired.toFixed(1)} L</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Fuel Price</span>
            <span className="font-semibold">₹{fuelPrice}/L</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Total Cost</span>
            <span className="font-bold text-2xl text-primary">{fmt(totalCost)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
