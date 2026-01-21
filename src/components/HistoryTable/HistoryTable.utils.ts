export const formatTableDate = (dateString: string): string => {
  // Si la fecha viene en formato YYYY-MM-DD, agregarle tiempo local para evitar problemas de zona horaria
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  const date = isDateOnly
    ? new Date(dateString + "T00:00:00")
    : new Date(dateString);

  return date.toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
  });
};
