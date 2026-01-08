"use client";

import { ReactElement } from "react";
import styles from "./EditEntryModal.module.css";
import { EditEntryModalProps } from "./EditEntryModal.types";
import { useEditEntryModal } from "./EditEntryModal.hooks";
import { MealTypeSpanishEnum } from "@/types/glucoseTypes";

export const EditEntryModal = ({
  isOpen,
  entry,
  onClose,
  onSave,
}: EditEntryModalProps): ReactElement | null => {
  const { glucoseLevel, setGlucoseLevel, handleSave, handleCancel } =
    useEditEntryModal({ entry, onSave, onClose });

  if (!isOpen || !entry) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Editar entrada</h2>
          <p className={styles.modalSubtitle}>
            {
              MealTypeSpanishEnum[
                entry.mealType as keyof typeof MealTypeSpanishEnum
              ]
            }{" "}
            - {new Date(entry.date).toLocaleDateString()}
          </p>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.inputGroup}>
            <label htmlFor="glucoseLevel">Nivel de glucosa (mg/dL)</label>
            <input
              id="glucoseLevel"
              type="number"
              value={glucoseLevel}
              onChange={(e) => setGlucoseLevel(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            onClick={handleSave}
            disabled={!glucoseLevel || isNaN(Number(glucoseLevel))}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
