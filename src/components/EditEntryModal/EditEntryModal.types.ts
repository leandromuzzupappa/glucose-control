export type EditEntryModalProps = {
  isOpen: boolean;
  entry: {
    id: string;
    glucoseLevel: number;
    mealType: string;
    date: string;
  } | null;
  onClose: () => void;
  onSave: (id: string, glucoseLevel: number) => void;
};

export type UseEditEntryModalParams = Pick<
  EditEntryModalProps,
  "entry" | "onSave" | "onClose"
>;

export type UseEditEntryModalReturnType = {
  glucoseLevel: string;
  setGlucoseLevel: (value: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
};
