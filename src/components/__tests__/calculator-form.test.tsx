// CalculatorForm.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as breakEvenStore from "@/lib/store";
import { CalculatorForm } from "../calculator-form";

// Mock the entire store module
jest.mock("@/lib/store", () => ({
  useBreakEvenStore: jest.fn(),
}));

describe("CalculatorForm", () => {
  const mockSetValues = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the store implementation
    (
      breakEvenStore.useBreakEvenStore as unknown as jest.Mock
    ).mockImplementation(() => ({
      setValues: mockSetValues,
    }));

    render(<CalculatorForm />);
  });

  it("renders the form with default values", () => {
    expect(screen.getByTestId("calculator-form")).toBeInTheDocument();

    // Compare values as numbers by using .value instead of toHaveValue
    expect(screen.getByTestId("fixed-costs-input")).toHaveValue(50000);
    expect(screen.getByTestId("variable-costs-input")).toHaveValue(12);
    expect(screen.getByTestId("selling-price-input")).toHaveValue(25);
  });

  it("updates input values when changed", async () => {
    const fixedCostsInput = screen.getByTestId("fixed-costs-input");
    const variableCostsInput = screen.getByTestId("variable-costs-input");
    const sellingPriceInput = screen.getByTestId("selling-price-input");

    await userEvent.clear(fixedCostsInput);
    await userEvent.type(fixedCostsInput, "60000");
    expect(fixedCostsInput).toHaveValue(60000);

    await userEvent.clear(variableCostsInput);
    await userEvent.type(variableCostsInput, "15");
    expect(variableCostsInput).toHaveValue(15);

    await userEvent.clear(sellingPriceInput);
    await userEvent.type(sellingPriceInput, "30");
    expect(sellingPriceInput).toHaveValue(30);
  });

  it("submits the form with valid data", async () => {
    const calculateButton = screen.getByTestId("calculate-button");

    await userEvent.click(calculateButton);

    // Verify the store's setValues was called with the default values
    await waitFor(() => {
      expect(mockSetValues).toHaveBeenCalledWith(50000, 12, 25);
    });
  });
});
