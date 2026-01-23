export const isNotMonedaMXN = (
  monedaId: number | null,
  convertMonedas: { value: number; label: string }[],
): boolean => {
  const monedaExists = convertMonedas.find((m) => m.value === monedaId);
  if (monedaExists) {
    if (monedaExists.label.toLowerCase() !== "mxn") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
