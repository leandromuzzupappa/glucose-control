import { MealType } from "@/types/glucoseTypes";

export type TrackerErrorProps = {
  glucoseLevel: string;
  mealType: MealType;
  className?: string;
};

export type UseTrackerErrorReturnType = {
  onRestartApp: () => void;
};
