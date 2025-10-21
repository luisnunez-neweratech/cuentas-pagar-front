import * as yup from "yup";

export const validationSchema = yup.object({
  password: yup.string().required("Password is required"),
  newPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
