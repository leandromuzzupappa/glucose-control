import { useState } from "react";
import { UseMealTrackerReturnType } from "./MealTracker.types";

export const useMealTracker = (): UseMealTrackerReturnType => {
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [hasError, setHasError] = useState(false);

  const onGlucoseLevelChange = (value: string) => {
    setGlucoseLevel(value);
  };

  return { hasError, glucoseLevel, onGlucoseLevelChange };
};
