import { MealType } from "@/types/glucoseTypes";

// Temp
export type HistoryEntry = {
  mealType: MealType;
  glucoseLevel: number;
  date: string;
  _createdAt: string;
};

export type HistoryTableProps = {
  data: HistoryEntry[];
  className?: string;
};

export type UseHistoryTableParams = Pick<HistoryTableProps, "data">;
export type HistoryFilterByType = MealType | "all";

export type UseHistoryTableReturnType = {
  formatedData: HistoryEntry[];
  onFilterBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
