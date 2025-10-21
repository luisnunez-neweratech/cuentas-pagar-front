import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().email().required("Email if required"),
});
