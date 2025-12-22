import { useMemo, useState } from "react";
import {
  UseHistoryTableReturnType,
  UseHistoryTableParams,
  HistoryFilterByType,
  HistoryEntry,
} from "./HistoryTable.types";

export const useHistoryTable = ({
  data = [],
}: UseHistoryTableParams): UseHistoryTableReturnType => {
  const [filterBy, setFilterBy] = useState<HistoryFilterByType>("all");
  const [localData, setLocalData] = useState<HistoryEntry[]>(data);

  const onFilterBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value as HistoryFilterByType);
  };

  const onDeleteEntry = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
      return;
    }

    setLocalData((prevData) => prevData.filter((entry) => entry.id !== id));

    try {
      const response = await fetch("/api/glucose", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
          Accept: "application/json",
          "X-Api-Version": "3",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("DatoCMS API Error:", errorData);
        throw new Error(
          `DatoCMS API error: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }
    } catch (error) {
      setLocalData(data);
      console.error("Error deleting entry:", error);
      alert("Error al eliminar la entrada");
    }
  };

  const formatedData = useMemo(() => {
    return filterBy === "all"
      ? localData
      : localData.filter((entry) => entry.mealType === filterBy);
  }, [localData, filterBy]);

  return { formatedData, onFilterBy, onDeleteEntry };
};
