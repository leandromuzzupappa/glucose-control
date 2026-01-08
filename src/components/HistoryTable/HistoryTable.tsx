"use client";

import styles from "./HistoryTable.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { HistoryTableProps } from "./HistoryTable.types";
import { useHistoryTable } from "./HistoryTable.hooks";
import { formatTableDate } from "./HistoryTable.utils";
import { MealTypeSpanishEnum } from "@/types/glucoseTypes";
import { EditEntryModal } from "@/components/EditEntryModal";

export const HistoryTable = ({
  data,
  className,
  onUpdate,
}: HistoryTableProps): ReactElement => {
  const {
    formatedData,
    onFilterBy,
    onDeleteEntry,
    editingEntry,
    onEditEntry,
    onCloseEdit,
    onSaveEdit,
  } = useHistoryTable({
    data,
    onUpdate,
  });

  console.log("Lenny - formatedData, breakfast", formatedData);

  return (
    <div className={classNames(styles.historyTable, className)}>
      <div className={styles.filtersBar}>
        <label htmlFor="mealType">Filtrar por tipo de comida:</label>
        <select
          name="mealType"
          id="mealType"
          className={styles.filterSelect}
          onChange={onFilterBy}
        >
          <option value="all">Todos</option>
          <option value="breakfast">{MealTypeSpanishEnum["breakfast"]}</option>
          <option value="lunch">{MealTypeSpanishEnum["lunch"]}</option>
          <option value="dinner">{MealTypeSpanishEnum["dinner"]}</option>
        </select>
      </div>

      <ul className={styles.historyEntries}>
        {formatedData.map((entry) => (
          <li key={entry.id} className={styles.historyEntry}>
            <span className={styles.entryDate}>
              {formatTableDate(entry.date)}
            </span>
            <p className={styles.entryMeal}>
              {MealTypeSpanishEnum[entry.mealType]}

              <span className={styles.entryGlucoseLevel}>
                {entry.glucoseLevel} mg/dL
              </span>
            </p>
            <div className={styles.entryActions}>
              <button
                className={styles.editButton}
                onClick={() => onEditEntry(entry)}
              >
                Editar
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onDeleteEntry(entry.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <EditEntryModal
        isOpen={!!editingEntry}
        entry={editingEntry}
        onClose={onCloseEdit}
        onSave={onSaveEdit}
      />
    </div>
  );
};
