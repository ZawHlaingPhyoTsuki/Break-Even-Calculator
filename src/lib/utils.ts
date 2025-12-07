import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTHB(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace("THB", "฿") // Replace "THB" with "฿" symbol
    .replace(/\s/g, ""); // Remove spaces
}

export function calculateBreakEven(
  fixedCosts: number,
  variableCosts: number,
  sellingPrice: number,
) {
  if (sellingPrice <= variableCosts) {
    throw new Error("Selling price must be greater than variable costs");
  }

  const contributionMargin = sellingPrice - variableCosts;
  const marginRatio = (contributionMargin / sellingPrice) * 100;
  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * sellingPrice;

  return {
    contributionMargin,
    marginRatio,
    breakEvenUnits,
    breakEvenRevenue,
  };
}
