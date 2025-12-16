"use client";

import styles from "./Numpad.module.css";
import classNames from "classnames";
import { NumpadProps } from "./Numpad.types";
import { useNumpad } from "./Numpad.hooks";

export const Numpad = ({
  onValueChange,
  initialValue = "",
  maxLength = 10,
  allowDecimal = true,
  className,
}: NumpadProps) => {
  const { buttons, onButtonClick } = useNumpad({
    initialValue,
    maxLength,
    allowDecimal,
    onValueChange,
  });

  return (
    <div className={classNames(styles.numpad, className)}>
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={(e) => onButtonClick(e, btn)}
          disabled={btn === "." && !allowDecimal}
          className={`${styles.button} ${btn === "⌫" ? styles.backspace : ""}`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};
