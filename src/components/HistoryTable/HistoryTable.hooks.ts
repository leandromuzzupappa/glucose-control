import { useMemo, useState } from "react";
import {
  UseHistoryTableReturnType,
  UseHistoryTableParams,
  HistoryFilterByType,
} from "./HistoryTable.types";

export const useHistoryTable = ({
  data = [],
}: UseHistoryTableParams): UseHistoryTableReturnType => {
  const [filterBy, setFilterBy] = useState<HistoryFilterByType>("all");

  const onFilterBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value as HistoryFilterByType);
  };

  const formatedData = useMemo(() => {
    return filterBy === "all"
      ? data
      : data.filter((entry) => entry.mealType === filterBy);
  }, [data, filterBy]);

  return { formatedData, onFilterBy };
};
