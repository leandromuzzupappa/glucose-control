"use client";

import styles from "./HistoryTable.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { HistoryTableProps } from "./HistoryTable.types";
import { useHistoryTable } from "./HistoryTable.hooks";
import { formatTableDate } from "./HistoryTable.utils";
import { MealTypeSpanishEnum } from "@/types/glucoseTypes";

export const HistoryTable = ({
  data,
  className,
}: HistoryTableProps): ReactElement => {
  const { formatedData, onFilterBy } = useHistoryTable({
    data,
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
          <li key={entry._createdAt} className={styles.historyEntry}>
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
              <button className={styles.editButton}>Editar</button>
              <button className={styles.deleteButton}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
