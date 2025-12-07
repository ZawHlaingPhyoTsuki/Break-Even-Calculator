"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBreakEvenStore } from "@/lib/store";

const formSchema = z.object({
  fixedCosts: z.number().min(0, "Must be positive"),
  variableCosts: z.number().min(0, "Must be positive"),
  sellingPrice: z.number().min(0.01, "Must be positive"),
});

export function CalculatorForm() {
  const { setValues } = useBreakEvenStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fixedCosts: 50000,
      variableCosts: 12,
      sellingPrice: 25,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setValues(values.fixedCosts, values.variableCosts, values.sellingPrice);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        data-testid="calculator-form"
      >
        <h2 className="text-xl font-semibold">Input Values</h2>

        <FormField
          control={form.control}
          name="fixedCosts"
          render={({ field }) => (
            <FormItem data-testid="fixed-costs-form-item">
              <FormLabel className="flex items-center gap-2">
                Fixed Costs (THB)
                <Tooltip>
                  <TooltipTrigger data-testid="fixed-costs-tooltip-trigger">
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent data-testid="fixed-costs-tooltip-content">
                    Costs that don&apos;t change with sales volume (rent,
                    salaries, etc.)
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  data-testid="fixed-costs-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="variableCosts"
          render={({ field }) => (
            <FormItem data-testid="variable-costs-form-item">
              <FormLabel className="flex items-center gap-2">
                Variable Cost per Unit (THB)
                <Tooltip>
                  <TooltipTrigger data-testid="variable-costs-tooltip-trigger">
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent data-testid="variable-costs-tooltip-content">
                    Costs that vary with each unit produced (materials, labor,
                    etc.)
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  data-testid="variable-costs-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sellingPrice"
          render={({ field }) => (
            <FormItem data-testid="selling-price-form-item">
              <FormLabel className="flex items-center gap-2">
                Selling Price per Unit (THB)
                <Tooltip>
                  <TooltipTrigger data-testid="selling-price-tooltip-trigger">
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent data-testid="selling-price-tooltip-content">
                    Price you charge customers for each unit
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  data-testid="selling-price-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" data-testid="calculate-button">
          Calculate
        </Button>
      </form>
    </Form>
  );
}
