import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf"];

export const validationSchema = (
  idInput: string,
  downloadUrl?: string | null
) => {
  console.log("valid downloadUrl", downloadUrl);
  if (downloadUrl) {
    return yup.object().shape({
      banco: yup.string().required("Banco es requerido"),
      monedaVenta: yup.string().required("Moneda de Venta es requerido"),
      clabe: yup
        .string()
        .required("CLABE Interbancaria es requerido")
        .min(18, "Debe ser 18 digitos")
        .max(18, "Debe ser 18 digitos"),
      condicionesPago: yup
        .string()
        .required("Condiciones de Pago es requerido"),
      swift: yup
        .string()
        .notRequired()
        .min(8, "Mínimo 8 dígitos")
        .max(11, "Máximo 11 dígitos"),
      noCuenta: yup.string().notRequired(),
    });
  }

  return yup.object().shape({
    banco: yup.string().required("Banco es requerido"),
    monedaVenta: yup.string().required("Moneda de Venta es requerido"),
    clabe: yup
      .string()
      .required("CLABE Interbancaria es requerido")
      .min(18, "Debe ser 18 digitos")
      .max(18, "Debe ser 18 digitos"),
    condicionesPago: yup.string().required("Condiciones de Pago es requerido"),
    [idInput]: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileType",
        "Solo archivos con formato .pdf",
        (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    swift: yup.string().min(8, "Mínimo 8 dígitos").max(11, "Máximo 11 dígitos"),
    noCuenta: yup.string().notRequired(),
  });
};
