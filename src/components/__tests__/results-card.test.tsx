import { render, screen } from "@testing-library/react";
import { useBreakEvenStore } from "@/lib/store";
import { ResultsCard } from "../results-card";

jest.mock("@/lib/store");

describe("ResultsCard", () => {
  beforeEach(() => {
    (useBreakEvenStore as unknown as jest.Mock).mockImplementation(() => ({
      fixedCosts: 50000,
      variableCosts: 12,
      sellingPrice: 25,
      breakEvenUnits: 3846.153846,
      breakEvenRevenue: 96153.84615,
      contributionMargin: 13,
      marginRatio: 52,
      setValues: jest.fn(),
    }));
  });

  it("renders the card with correct title", () => {
    render(<ResultsCard />);
    expect(screen.getByTestId("results-card")).toBeInTheDocument();
    expect(screen.getByText("Break-Even Results")).toBeInTheDocument();
  });

  it("displays all financial values correctly", () => {
    render(<ResultsCard />);

    // Test fixed costs
    expect(screen.getByTestId("fixed-costs-value")).toHaveTextContent(
      "฿50,000.00",
    );

    // Test variable costs
    expect(screen.getByTestId("variable-costs-value")).toHaveTextContent(
      "฿12.00",
    );

    // Test selling price
    expect(screen.getByTestId("selling-price-value")).toHaveTextContent(
      "฿25.00",
    );

    // Test contribution margin
    expect(screen.getByTestId("contribution-margin-value")).toHaveTextContent(
      "฿13.00",
    );

    // Test margin ratio
    expect(screen.getByTestId("margin-ratio-value")).toHaveTextContent(
      "52.00%",
    );

    // Test break-even units
    expect(screen.getByTestId("break-even-units-value")).toHaveTextContent(
      "3846 units",
    );

    // Test break-even revenue
    expect(screen.getByTestId("break-even-revenue-value")).toHaveTextContent(
      "฿96,153.85",
    );
  });

  it("maintains proper structure with all rows present", () => {
    render(<ResultsCard />);

    expect(screen.getByTestId("fixed-costs-row")).toBeInTheDocument();
    expect(screen.getByTestId("variable-costs-row")).toBeInTheDocument();
    expect(screen.getByTestId("selling-price-row")).toBeInTheDocument();
    expect(screen.getByTestId("contribution-margin-row")).toBeInTheDocument();
    expect(screen.getByTestId("margin-ratio-row")).toBeInTheDocument();
    expect(screen.getByTestId("break-even-units-row")).toBeInTheDocument();
    expect(screen.getByTestId("break-even-revenue-row")).toBeInTheDocument();
  });
});
