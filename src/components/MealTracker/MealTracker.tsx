"use client";

import styles from "./MealTracker.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { MealTrackerProps } from "./MealTracker.types";
import { useMealTracker } from "./MealTracker.hooks";
import { MealTypeSpanishEnum } from "@/types/glucoseTypes";
import { Numpad } from "../Numpad";
import { TrackerError } from "../TrackerError";

export const MealTracker = ({
  moment,
  className,
}: MealTrackerProps): ReactElement => {
  const { hasError, glucoseLevel, onGlucoseLevelChange } = useMealTracker();

  return (
    <div className={classNames(styles.mealTracker, className)}>
      <h1 className={styles.title}>
        Ingresá cuánto te dió {moment === "dinner" ? "la " : "el "}
        <span>{MealTypeSpanishEnum[moment]}</span>
      </h1>
      <input
        className={styles.input}
        value={glucoseLevel}
        type="text"
        placeholder="Ej.: 120 mg/dL"
        readOnly
      />
      <Numpad className={styles.numpad} onValueChange={onGlucoseLevelChange} />
      <button className={styles.submit}>Guardar</button>

      {hasError && <TrackerError />}
    </div>
  );
};
