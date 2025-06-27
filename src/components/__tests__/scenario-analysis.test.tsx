import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useBreakEvenStore } from "@/lib/store";
import { ScenarioAnalysis } from "../scenario-analysis";

// Mock the store
jest.mock("@/lib/store");

describe("ScenarioAnalysis", () => {
  beforeEach(() => {
    // Mock store values
    (useBreakEvenStore as unknown as jest.Mock).mockImplementation(() => ({
      fixedCosts: 50000,
      variableCosts: 12,
      sellingPrice: 25,
      contributionMargin: 13,
      breakEvenUnits: 3846.153846,
    }));
  });

  it("renders with default scenarios", () => {
    render(<ScenarioAnalysis />);

    // Verify default scenarios are shown
    expect(screen.getByText("1500")).toBeInTheDocument();
    expect(screen.getByText("7000")).toBeInTheDocument();

    // Verify break-even row is shown
    expect(screen.getByText("3846 (BEP)")).toBeInTheDocument();
  });

  it("adds new scenarios", async () => {
    render(<ScenarioAnalysis />);
    const user = userEvent.setup();

    // Change quantity
    const quantityInput = screen.getByRole("spinbutton");
    await user.clear(quantityInput);
    await user.type(quantityInput, "2000");

    // Add scenario
    await user.click(screen.getByRole("button", { name: /Add Scenario/i }));

    // Verify new scenario was added
    expect(screen.getByText("2000")).toBeInTheDocument();

    // Verify it's sorted
    const unitCells = screen.getAllByRole("cell", { name: /^\d+$/ });
    expect(unitCells[0]).toHaveTextContent("1500");
    expect(unitCells[1]).toHaveTextContent("2000");
    expect(unitCells[2]).toHaveTextContent("7000");
  });

  it("shows profit/loss correctly", () => {
    render(<ScenarioAnalysis />);

    // Verify profit/loss coloring
    const profitableRow = screen.getByText("7000").closest("tr");
    expect(profitableRow).toHaveClass("bg-green-50");

    const lossRow = screen.getByText("1500").closest("tr");
    expect(lossRow).toHaveClass("bg-red-50");

    // Verify break-even row has no profit/loss
    expect(screen.getByText("฿0", { selector: "td" })).toBeInTheDocument();
  });
});
