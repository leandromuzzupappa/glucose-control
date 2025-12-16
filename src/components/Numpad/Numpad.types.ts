export type NumpadProps = {
  initialValue?: string;
  maxLength?: number;
  allowDecimal?: boolean;
  className?: string;
  onValueChange: (value: string) => void;
};

export type UseNumpadProps = Required<Omit<NumpadProps, "className">>;

export type UseNumpadReturnType = {
  buttons: string[];
  value: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>, btn: string) => void;
};
