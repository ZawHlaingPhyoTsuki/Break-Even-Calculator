"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBreakEvenStore } from "@/lib/store";
import { formatTHB } from "@/lib/utils";

export function ScenarioAnalysis() {
  const {
    fixedCosts,
    variableCosts,
    sellingPrice,
    contributionMargin,
    breakEvenUnits,
  } = useBreakEvenStore();
  const [quantity, setQuantity] = useState(1500);
  const [scenarios, setScenarios] = useState<number[]>([1500, 7000]);

  const calculateScenario = (units: number) => {
    const revenue = units * sellingPrice;
    const totalVariableCost = units * variableCosts;
    const totalCost = fixedCosts + totalVariableCost;
    const profit = revenue - totalCost;
    const isProfitable = profit >= 0;

    return {
      units,
      revenue,
      totalCost,
      profit,
      isProfitable,
    };
  };

  const addScenario = () => {
    if (!scenarios.includes(quantity)) {
      setScenarios([...scenarios, quantity].sort((a, b) => a - b));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-32"
          />
          <Button onClick={addScenario}>Add Scenario</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Units</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Total Costs</TableHead>
              <TableHead>Profit/Loss</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scenarios.map((units) => {
              const scenario = calculateScenario(units);
              return (
                <TableRow
                  key={units}
                  className={
                    scenario.isProfitable
                      ? "bg-green-50 dark:bg-green-900/30"
                      : "bg-red-50 dark:bg-red-900/30"
                  }
                >
                  <TableCell>{units}</TableCell>
                  <TableCell>{formatTHB(scenario.revenue)}</TableCell>
                  <TableCell>{formatTHB(scenario.totalCost)}</TableCell>
                  <TableCell
                    className={
                      scenario.isProfitable
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {formatTHB(scenario.profit)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="bg-gray-50 dark:bg-gray-800 font-semibold">
              <TableCell>{breakEvenUnits.toFixed(0)} (BEP)</TableCell>
              <TableCell>{formatTHB(breakEvenUnits * sellingPrice)}</TableCell>
              <TableCell>
                {formatTHB(fixedCosts + breakEvenUnits * variableCosts)}
              </TableCell>
              <TableCell>฿0</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Contribution Margin:</strong>{" "}
            {formatTHB(contributionMargin)} per unit
          </p>
          <p>
            Each unit sold beyond break-even adds{" "}
            {formatTHB(contributionMargin)} to profit
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
