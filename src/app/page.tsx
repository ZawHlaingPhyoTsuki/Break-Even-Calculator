import { CalculatorForm } from "@/components/calculator-form";
import { ModeToggle } from "@/components/mode-toggle";
import { ResultsCard } from "@/components/results-card";
import { ScenarioAnalysis } from "@/components/scenario-analysis";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Break-Even Point Calculator (THB)
        </h1>
        <ModeToggle />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <CalculatorForm />
          <ResultsCard />
        </div>
        <ScenarioAnalysis />
      </div>
    </main>
  );
}
