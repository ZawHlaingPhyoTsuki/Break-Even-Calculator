"use client";

import { useBreakEvenStore } from "@/lib/store";
import { formatTHB } from "@/lib/utils";

export function CalculationSteps() {
  const {
    fixedCosts,
    variableCosts,
    sellingPrice,
    contributionMargin,
    marginRatio,
    breakEvenUnits,
    breakEvenRevenue,
  } = useBreakEvenStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Calculation Steps</h3>

      <div className="space-y-2">
        <h4 className="font-medium">1. Contribution Margin Calculation</h4>
        <div className="bg-muted p-4 rounded-md font-mono">
          <div>Contribution Margin = Selling Price - Variable Cost</div>
          <div className="text-right">
            = {formatTHB(sellingPrice)} - {formatTHB(variableCosts)}
          </div>
          <div className="text-right border-t mt-1 pt-1">
            = {formatTHB(contributionMargin)} per unit
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">2. Break-Even Units Calculation</h4>
        <div className="bg-muted p-4 rounded-md font-mono">
          <div>Break-Even Units = Fixed Costs ÷ Contribution Margin</div>
          <div className="text-right">
            = {formatTHB(fixedCosts)} ÷ {formatTHB(contributionMargin)}
          </div>
          <div className="text-right border-t mt-1 pt-1">
            = {breakEvenUnits.toFixed(0)} units
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">3. Break-Even Revenue Calculation</h4>
        <div className="bg-muted p-4 rounded-md font-mono">
          <div>Break-Even Revenue = Break-Even Units × Selling Price</div>
          <div className="text-right">
            = {breakEvenUnits.toFixed(0)} × {formatTHB(sellingPrice)}
          </div>
          <div className="text-right border-t mt-1 pt-1">
            = {formatTHB(breakEvenRevenue)}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">4. Margin Ratio Calculation</h4>
        <div className="bg-muted p-4 rounded-md font-mono">
          <div>Margin Ratio = (Contribution Margin ÷ Selling Price) × 100</div>
          <div className="text-right">
            = ({formatTHB(contributionMargin)} ÷ {formatTHB(sellingPrice)}) ×
            100
          </div>
          <div className="text-right border-t mt-1 pt-1">
            = {marginRatio.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
