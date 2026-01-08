import { MealType } from "@/types/glucoseTypes";

// Temp
export type HistoryEntry = {
  id: string;
  mealType: MealType;
  glucoseLevel: number;
  date: string;
  _createdAt: string;
};

export type HistoryTableProps = {
  data: HistoryEntry[];
  className?: string;
  onUpdate: (
    id: string,
    glucoseLevel: number,
    mealType: string,
    date: string
  ) => Promise<{ success: boolean; error?: string }>;
};

export type UseHistoryTableParams = Pick<
  HistoryTableProps,
  "data" | "onUpdate"
>;
export type HistoryFilterByType = MealType | "all";

export type UseHistoryTableReturnType = {
  formatedData: HistoryEntry[];
  onFilterBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeleteEntry: (id: string) => void;
  editingEntry: HistoryEntry | null;
  onEditEntry: (entry: HistoryEntry) => void;
  onCloseEdit: () => void;
  onSaveEdit: (id: string, glucoseLevel: number) => void;
};
