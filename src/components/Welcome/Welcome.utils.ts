/**
 * Returns the current date and time formatted in Spanish (Spain) locale.
 * Date format: "weekday, day month year"
 * Time format: "HH:MM"
 */
export const getDateTime = (): { date: string; time: string } => {
  const d = new Date();

  const date = d.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
};
