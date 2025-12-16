import { MealType } from "@/types/glucoseTypes";

export type MealTrackerProps = {
  moment: MealType;
  className?: string;
};

export type UseMealTrackerReturnType = {
  glucoseLevel: string;
  onGlucoseLevelChange: (value: string) => void;
};
