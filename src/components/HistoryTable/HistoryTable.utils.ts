export const formatTableDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
  });
};
