import { useState } from "react";
import {
  UseEditEntryModalParams,
  UseEditEntryModalReturnType,
} from "./EditEntryModal.types";

export const useEditEntryModal = ({
  entry,
  onSave,
  onClose,
}: UseEditEntryModalParams): UseEditEntryModalReturnType => {
  const [glucoseLevel, setGlucoseLevel] = useState(
    entry?.glucoseLevel?.toString() || ""
  );

  const handleSave = () => {
    if (entry && glucoseLevel && !isNaN(Number(glucoseLevel))) {
      onSave(entry.id, Number(glucoseLevel));
    }
  };

  const handleCancel = () => {
    setGlucoseLevel(entry?.glucoseLevel?.toString() || "");
    onClose();
  };

  return {
    glucoseLevel,
    setGlucoseLevel,
    handleSave,
    handleCancel,
  };
};
