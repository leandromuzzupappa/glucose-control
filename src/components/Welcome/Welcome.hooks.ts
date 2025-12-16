import { UseWelcomeReturnType } from "./Welcome.types";

export const useWelcome = (): UseWelcomeReturnType => {
  const foo = "bar";

  return { foo };
};
