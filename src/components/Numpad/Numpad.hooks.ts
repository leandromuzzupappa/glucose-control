import { useState } from "react";
import { UseNumpadReturnType, UseNumpadProps } from "./Numpad.types";

export const useNumpad = ({
  initialValue,
  maxLength,
  allowDecimal,
  onValueChange,
}: UseNumpadProps): UseNumpadReturnType => {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

  const [value, setValue] = useState(initialValue);

  const handlePress = (input: string) => {
    let newValue = value;

    if (input === "⌫") {
      newValue = value?.slice(0, -1);
    } else if (input === ".") {
      if (allowDecimal && !value?.includes(".")) {
        newValue = value + input;
      }
    } else {
      if (value.length < maxLength) {
        newValue = value + input;
      }
    }

    setValue(newValue);
    onValueChange(newValue);
  };

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    btn: string
  ) => {
    e.preventDefault();
    handlePress(btn);
  };

  return { buttons, value, onButtonClick };
};
