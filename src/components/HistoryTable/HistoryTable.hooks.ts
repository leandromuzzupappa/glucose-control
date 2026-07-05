import { useMemo, useState } from "react";
import {
  UseHistoryTableReturnType,
  UseHistoryTableParams,
  HistoryFilterByType,
  HistoryEntry,
} from "./HistoryTable.types";

export const useHistoryTable = ({
  data = [],
  onUpdate,
}: UseHistoryTableParams): UseHistoryTableReturnType => {
  const [filterBy, setFilterBy] = useState<HistoryFilterByType>("all");
  const [localData, setLocalData] = useState<HistoryEntry[]>(data);
  const [editingEntry, setEditingEntry] = useState<HistoryEntry | null>(null);

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Supabase API Error:", errorData);
        throw new Error(`API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setLocalData(data);
      console.error("Error deleting entry:", error);
      alert("Error al eliminar la entrada");
    }
  };

  const onEditEntry = (entry: HistoryEntry) => {
    setEditingEntry(entry);
  };

  const onCloseEdit = () => {
    setEditingEntry(null);
  };

  const onSaveEdit = async (id: string, glucoseLevel: number) => {
    const entry = localData.find((e) => e.id === id);
    if (!entry) return;

    setLocalData((prevData) =>
      prevData.map((e) => (e.id === id ? { ...e, glucoseLevel } : e))
    );
    setEditingEntry(null);

    try {
      const result = await onUpdate(
        id,
        glucoseLevel,
        entry.mealType,
        entry.date
      );
      if (!result.success) {
        setLocalData(data);
        alert(result.error || "Error al actualizar la entrada");
      }
    } catch (error) {
      setLocalData(data);
      console.error("Error updating entry:", error);
      alert("Error al actualizar la entrada");
    }
  };

  const formatedData = useMemo(() => {
    return filterBy === "all"
      ? localData
      : localData.filter((entry) => entry.mealType === filterBy);
  }, [localData, filterBy]);

  return {
    formatedData,
    onFilterBy,
    onDeleteEntry,
    editingEntry,
    onEditEntry,
    onCloseEdit,
    onSaveEdit,
  };
};
