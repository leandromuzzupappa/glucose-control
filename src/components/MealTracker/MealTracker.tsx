"use client";

import styles from "./MealTracker.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { MealTrackerProps } from "./MealTracker.types";
import { useMealTracker } from "./MealTracker.hooks";
import { DayMomentSpanishEnum } from "@/types/glucoseTypes";
import { Numpad } from "../Numpad";

export const MealTracker = ({
  moment,
  className,
}: MealTrackerProps): ReactElement => {
  const { glucoseLevel, onGlucoseLevelChange } = useMealTracker();

  return (
    <div className={classNames(styles.mealTracker, className)}>
      <h1 className={styles.title}>
        Ingresá cuánto te dió {moment === "dinner" ? "la " : "el "}
        <span>{DayMomentSpanishEnum[moment]}</span>
      </h1>
      <input
        className={styles.input}
        value={glucoseLevel}
        type="text"
        placeholder="120 mg/dL"
        readOnly
      />
      <Numpad className={styles.numpad} onValueChange={onGlucoseLevelChange} />
      <button className={styles.submit}>Guardar</button>
    </div>
  );
};
