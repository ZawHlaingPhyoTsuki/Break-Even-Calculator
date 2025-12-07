import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBreakEven } from "./utils";

type BreakEvenState = {
  fixedCosts: number;
  variableCosts: number;
  sellingPrice: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  marginRatio: number;
  setValues: (fixed: number, variable: number, price: number) => void;
  reset: () => void;
  error?: string;
};

const INITIAL_VALUES = {
  fixedCosts: 50000,
  variableCosts: 12,
  sellingPrice: 25,
};

const initialCalculations = calculateBreakEven(
  INITIAL_VALUES.fixedCosts,
  INITIAL_VALUES.variableCosts,
  INITIAL_VALUES.sellingPrice,
);

export const useBreakEvenStore = create<BreakEvenState>()(
  persist(
    (set, get) => ({
      ...INITIAL_VALUES,
      ...initialCalculations,
      error: undefined,
      setValues: (fixed, variable, price) => {
        try {
          if (price <= variable) {
            throw new Error(
              "Selling price must be greater than variable costs",
            );
          }
          if (fixed <= 0 || variable < 0 || price <= 0) {
            throw new Error("All values must be positive");
          }

          const calculations = calculateBreakEven(fixed, variable, price);
          set({
            fixedCosts: fixed,
            variableCosts: variable,
            sellingPrice: price,
            ...calculations,
            error: undefined,
          });
        } catch (err) {
          set({ error: err instanceof Error ? err.message : String(err) });
          // Revert to previous valid state
          const current = get();
          const validCalculations = calculateBreakEven(
            current.fixedCosts,
            current.variableCosts,
            current.sellingPrice,
          );
          set({ ...validCalculations });
        }
      },
      reset: () => {
        set({
          ...INITIAL_VALUES,
          ...calculateBreakEven(
            INITIAL_VALUES.fixedCosts,
            INITIAL_VALUES.variableCosts,
            INITIAL_VALUES.sellingPrice,
          ),
          error: undefined,
        });
      },
    }),
    {
      name: "break-even-storage", // unique name for localStorage key
      partialize: (state) => ({
        fixedCosts: state.fixedCosts,
        variableCosts: state.variableCosts,
        sellingPrice: state.sellingPrice,
      }), // only persist these values
    },
  ),
);
