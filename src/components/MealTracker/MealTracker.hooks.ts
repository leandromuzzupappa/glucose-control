import { useState } from "react";
import { UseMealTrackerReturnType } from "./MealTracker.types";

export const useMealTracker = (): UseMealTrackerReturnType => {
  const [glucoseLevel, setGlucoseLevel] = useState("");

  const onGlucoseLevelChange = (value: string) => {
    setGlucoseLevel(value);
  };

  return { glucoseLevel, onGlucoseLevelChange };
};
