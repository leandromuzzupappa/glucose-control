import { MealType } from "@/types/glucoseTypes";

export type MealTrackerProps = {
  moment: MealType;
  className?: string;
};

export type UseMealTrackerReturnType = {
  hasError: boolean;
  glucoseLevel: string;
  onGlucoseLevelChange: (value: string) => void;
  onStoreGlucoseLevel: (moment: MealType) => void;
};
