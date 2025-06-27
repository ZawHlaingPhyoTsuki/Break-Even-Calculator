// app/error.tsx
"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold text-destructive mb-4">
        Something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Try again
      </button>
    </div>
  );
}
