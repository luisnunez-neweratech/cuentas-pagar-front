export const converDateFormat = (stringDate: string): string => {
  try {
    if (stringDate.length > 0) {
      const fechaValue = new Date(stringDate);
      const year = fechaValue.getFullYear();
      const month = String(fechaValue.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(fechaValue.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`; //01/12/2024
    }
    return "";
  } catch (e) {
    return "";
  }
};

export const convertDateToFilterFormat = (newDate?: Date): string => {
  try {
    if (newDate) {
      const fechaValue = newDate;
      const year = fechaValue.getFullYear();
      const month = String(fechaValue.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(fechaValue.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`; //2024/12/01
    }
    return "";
  } catch (e) {
    return "";
  }
};
