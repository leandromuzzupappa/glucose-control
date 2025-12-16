import { UseHeaderReturnType } from "./Header.types";

export const useHeader = (): UseHeaderReturnType => {
  const foo = "bar";

  return { foo };
};
