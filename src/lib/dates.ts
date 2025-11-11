export const converDateFormat = (stringDate: string): string => {
  try {
    if (stringDate.length > 0) {
      const fechaValue = new Date(stringDate);
      const year = fechaValue.getFullYear();
      const month = String(fechaValue.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(fechaValue.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`;
    }
    return "";
  } catch (e) {
    return "";
  }
};
