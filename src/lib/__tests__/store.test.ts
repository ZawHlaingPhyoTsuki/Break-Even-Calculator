import { useBreakEvenStore } from "@/lib/store";

describe("BreakEven Store", () => {
  // Reset store before each test
  beforeEach(() => {
    useBreakEvenStore.setState(useBreakEvenStore.getInitialState());
  });

  it("has initial values", () => {
    const state = useBreakEvenStore.getState();
    expect(state.fixedCosts).toBe(50000);
    expect(state.contributionMargin).toBe(13);
    expect(state.error).toBeUndefined();
  });

  it("updates values correctly", () => {
    useBreakEvenStore.getState().setValues(75000, 10, 20);

    const state = useBreakEvenStore.getState();
    expect(state.fixedCosts).toBe(75000);
    expect(state.contributionMargin).toBe(10);
    expect(state.marginRatio).toBe(50);
    expect(state.error).toBeUndefined();
  });

  it("handles invalid input (sellingPrice <= variableCosts)", () => {
    useBreakEvenStore.getState().setValues(50000, 25, 20);

    const state = useBreakEvenStore.getState();
    expect(state.error).toBe(
      "Selling price must be greater than variable costs"
    );
    // Verify it reverted to previous values
    expect(state.sellingPrice).toBe(25);
  });

  it("handles reset", () => {
    useBreakEvenStore.getState().setValues(100000, 15, 30);
    useBreakEvenStore.getState().reset();

    const state = useBreakEvenStore.getState();
    expect(state.fixedCosts).toBe(50000);
    expect(state.sellingPrice).toBe(25);
  });
});