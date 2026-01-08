import { useState } from "react";
import { UseMealTrackerReturnType } from "./MealTracker.types";
import { MealType } from "@/types/glucoseTypes";
import { useRouter } from "next/navigation";

export const useMealTracker = (): UseMealTrackerReturnType => {
  const router = useRouter();

  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [hasError, setHasError] = useState(false);

  const onGlucoseLevelChange = (value: string) => {
    setGlucoseLevel(value);
  };

  const onStoreGlucoseLevel = async (moment: MealType) => {
    try {
      const res = await fetch("/api/glucose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealType: moment,
          glucoseLevel: parseInt(glucoseLevel),
          date: new Date().toISOString(),
          timestamp: Date.now().toString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to store glucose level");
      }

      setGlucoseLevel("");
      setHasError(false);
      router.push("/");
    } catch (error) {
      setHasError(true);
      console.error("Error storing glucose level:", error);
    }
  };

  return { hasError, glucoseLevel, onGlucoseLevelChange, onStoreGlucoseLevel };
};
