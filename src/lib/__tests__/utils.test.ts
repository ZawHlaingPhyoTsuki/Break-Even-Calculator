import { formatTHB, calculateBreakEven, cn } from "@/lib/utils";

describe("formatTHB", () => {
  it("formats whole numbers with .00 decimals", () => {
    expect(formatTHB(1000)).toBe("฿1,000.00");
  });

  it("formats numbers with existing decimals", () => {
    expect(formatTHB(1234.56)).toBe("฿1,234.56");
  });

  it("formats zero correctly", () => {
    expect(formatTHB(0)).toBe("฿0.00");
  });

  it("handles negative amounts", () => {
    expect(formatTHB(-1000)).toBe("-฿1,000.00");
  });

  it("handles very large numbers", () => {
    expect(formatTHB(1000000000)).toBe("฿1,000,000,000.00");
  });
});

describe("calculateBreakEven", () => {
  it("calculates break-even values correctly for normal case", () => {
    const result = calculateBreakEven(50000, 12, 25);
    expect(result.contributionMargin).toBe(13);
    expect(result.marginRatio).toBeCloseTo(52);
    expect(result.breakEvenUnits).toBeCloseTo(3846.153846);
    expect(result.breakEvenRevenue).toBeCloseTo(96153.84615);
  });

  it("throws error when sellingPrice <= variableCosts", () => {
    expect(() => calculateBreakEven(50000, 25, 25)).toThrow();
    expect(() => calculateBreakEven(50000, 30, 25)).toThrow();
  });
});

describe("cn", () => {
  it("merges class names correctly", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
    expect(cn("text-red-500", "hover:text-red-700")).toBe(
      "text-red-500 hover:text-red-700"
    );
    expect(cn(undefined, null, false, "px-4")).toBe("px-4");
  });
});
