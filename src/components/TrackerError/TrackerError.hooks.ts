import { UseTrackerErrorReturnType } from "./TrackerError.types";

export const useTrackerError = (): UseTrackerErrorReturnType => {
  const onRestartApp = () => {
    window.location.reload();
  };

  return { onRestartApp };
};
