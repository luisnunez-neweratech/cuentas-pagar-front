import * as yup from "yup";

export const validationSchema = yup.object({
  rfc: yup.string().required("RFC if required"),
  password: yup.string().required("Password if required"),
});
