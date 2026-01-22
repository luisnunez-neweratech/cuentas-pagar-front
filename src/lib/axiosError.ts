import { AxiosError } from "axios";

export const axiosErrorMessage = (error: Error, errorMessage: string) => {
  console.log(error);
  if (error instanceof AxiosError) {
    return (
      error.response?.data.message ||
      error.response?.data.error ||
      error.response?.data ||
      error.message
    );
  }
  return errorMessage;
};
