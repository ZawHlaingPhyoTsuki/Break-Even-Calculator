"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBreakEvenStore } from "@/lib/store";
import { formatTHB } from "@/lib/utils";

export function ResultsCard() {
  const {
    fixedCosts,
    variableCosts,
    sellingPrice,
    breakEvenUnits,
    breakEvenRevenue,
    contributionMargin,
    marginRatio,
  } = useBreakEvenStore();

  return (
    <Card data-testid="results-card">
      <CardHeader>
        <CardTitle>Break-Even Results</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-between" data-testid="fixed-costs-row">
          <span>Fixed Costs:</span>
          <span className="font-medium" data-testid="fixed-costs-value">
            {formatTHB(fixedCosts)}
          </span>
        </div>
        <div className="flex justify-between" data-testid="variable-costs-row">
          <span>Variable Cost per Unit:</span>
          <span className="font-medium" data-testid="variable-costs-value">
            {formatTHB(variableCosts)}
          </span>
        </div>
        <div className="flex justify-between" data-testid="selling-price-row">
          <span>Selling Price per Unit:</span>
          <span className="font-medium" data-testid="selling-price-value">
            {formatTHB(sellingPrice)}
          </span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div
            className="flex justify-between"
            data-testid="contribution-margin-row"
          >
            <span>Contribution Margin per Unit:</span>
            <span
              className="font-medium"
              data-testid="contribution-margin-value"
            >
              {formatTHB(contributionMargin)}
            </span>
          </div>
          <div className="flex justify-between" data-testid="margin-ratio-row">
            <span>Contribution Margin Ratio:</span>
            <span className="font-medium" data-testid="margin-ratio-value">
              {marginRatio.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="border-t pt-2 mt-2">
          <div
            className="flex justify-between font-semibold"
            data-testid="break-even-units-row"
          >
            <span>Break-Even Point (Units):</span>
            <span data-testid="break-even-units-value">
              {breakEvenUnits.toFixed(0)} units
            </span>
          </div>
          <div
            className="flex justify-between font-semibold"
            data-testid="break-even-revenue-row"
          >
            <span>Break-Even Revenue:</span>
            <span data-testid="break-even-revenue-value">
              {formatTHB(breakEvenRevenue)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
