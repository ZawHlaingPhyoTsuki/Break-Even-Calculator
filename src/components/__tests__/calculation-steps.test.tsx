// components/calculation-steps.test.tsx
import { render, screen } from "@testing-library/react";
import { useBreakEvenStore } from "@/lib/store";
import { formatTHB } from "@/lib/utils";
import { CalculationSteps } from "../calculation-steps";

// Mock the store and utils
jest.mock("@/lib/store");
jest.mock("@/lib/utils");

const mockFormatTHB = formatTHB as jest.MockedFunction<typeof formatTHB>;
const mockUseBreakEvenStore = useBreakEvenStore as jest.MockedFunction<
  typeof useBreakEvenStore
>;

describe("CalculationSteps", () => {
  const mockValues = {
    fixedCosts: 50000,
    variableCosts: 12,
    sellingPrice: 25,
    contributionMargin: 13, // 25 - 12
    marginRatio: 52, // (13 / 25) * 100
    breakEvenUnits: 3846.153846, // 50000 / 13
    breakEvenRevenue: 96153.84615, // 3846.153846 * 25
  };

  beforeEach(() => {
    mockUseBreakEvenStore.mockReturnValue(mockValues);
    mockFormatTHB.mockImplementation((value) => `฿${value.toFixed(2)}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all calculation sections", () => {
    render(<CalculationSteps />);

    expect(screen.getByText("Calculation Steps")).toBeInTheDocument();
    expect(
      screen.getByText("1. Contribution Margin Calculation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2. Break-Even Units Calculation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("3. Break-Even Revenue Calculation")
    ).toBeInTheDocument();
    expect(screen.getByText("4. Margin Ratio Calculation")).toBeInTheDocument();
  });

  it("shows correct contribution margin calculation", () => {
    render(<CalculationSteps />);

    expect(
      screen.getByText("Contribution Margin = Selling Price - Variable Cost")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `= ${formatTHB(mockValues.sellingPrice)} - ${formatTHB(
          mockValues.variableCosts
        )}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`= ${formatTHB(mockValues.contributionMargin)} per unit`)
    ).toBeInTheDocument();
  });

  it("shows correct break-even units calculation", () => {
    render(<CalculationSteps />);

    expect(
      screen.getByText("Break-Even Units = Fixed Costs ÷ Contribution Margin")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `= ${formatTHB(mockValues.fixedCosts)} ÷ ${formatTHB(
          mockValues.contributionMargin
        )}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`= ${mockValues.breakEvenUnits.toFixed(0)} units`)
    ).toBeInTheDocument();
  });

  it("shows correct break-even revenue calculation", () => {
    render(<CalculationSteps />);

    expect(
      screen.getByText("Break-Even Revenue = Break-Even Units × Selling Price")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `= ${mockValues.breakEvenUnits.toFixed(0)} × ${formatTHB(
          mockValues.sellingPrice
        )}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`= ${formatTHB(mockValues.breakEvenRevenue)}`)
    ).toBeInTheDocument();
  });

  it("shows correct margin ratio calculation", () => {
    render(<CalculationSteps />);

    expect(
      screen.getByText(
        "Margin Ratio = (Contribution Margin ÷ Selling Price) × 100"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `= (${formatTHB(mockValues.contributionMargin)} ÷ ${formatTHB(
          mockValues.sellingPrice
        )}) × 100`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`= ${mockValues.marginRatio.toFixed(2)}%`)
    ).toBeInTheDocument();
  });

  it("updates calculations when store values change", () => {
    const newValues = {
      ...mockValues,
      sellingPrice: 30,
      variableCosts: 15,
      contributionMargin: 15, // 30 - 15
      marginRatio: 50, // (15 / 30) * 100
      breakEvenUnits: 3333.333333, // 50000 / 15
      breakEvenRevenue: 100000, // 3333.333333 * 30
    };

    mockUseBreakEvenStore.mockReturnValue(newValues);
    render(<CalculationSteps />);

    // Test one of the calculations to verify updates
    expect(
      screen.getByText(
        `= ${formatTHB(newValues.sellingPrice)} - ${formatTHB(
          newValues.variableCosts
        )}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`= ${formatTHB(newValues.contributionMargin)} per unit`)
    ).toBeInTheDocument();
  });

  it("formats all currency values correctly", () => {
    render(<CalculationSteps />);

    // Verify formatTHB was called with expected values
    expect(mockFormatTHB).toHaveBeenCalledWith(mockValues.sellingPrice);
    expect(mockFormatTHB).toHaveBeenCalledWith(mockValues.variableCosts);
    expect(mockFormatTHB).toHaveBeenCalledWith(mockValues.contributionMargin);
    expect(mockFormatTHB).toHaveBeenCalledWith(mockValues.fixedCosts);
    expect(mockFormatTHB).toHaveBeenCalledWith(mockValues.breakEvenRevenue);
  });
});
