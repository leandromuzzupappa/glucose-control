import { DayMomentType } from "@/types/glucoseTypes";

export type MealTrackerProps = {
  moment: DayMomentType;
  className?: string;
};

export type UseMealTrackerReturnType = {
  glucoseLevel: string;
  onGlucoseLevelChange: (value: string) => void;
};
