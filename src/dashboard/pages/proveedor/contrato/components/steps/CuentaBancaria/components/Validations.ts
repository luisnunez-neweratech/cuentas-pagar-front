import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf"];

export const validationSchema = (
  idInput: string,
  downloadUrl: string | null,
  tipoEntidadId: number
) => {
  if (downloadUrl) {
    if (tipoEntidadId === 0) {
      // local
      return yup.object().shape({
        banco: yup.string().required("Banco es requerido"),
        monedaVenta: yup.string().required("Moneda de Venta es requerido"),
        clabe: yup
          .string()
          .required("CLABE Interbancaria es requerido")
          .min(18, "Debe ser 18 digitos")
          .max(18, "Debe ser 18 digitos"),
        noCuenta: yup.string().notRequired(),
      });
    }

    // extranjero
    return yup.object().shape({
      banco: yup.string().required("Banco es requerido"),
      monedaVenta: yup.string().required("Moneda de Venta es requerido"),
      clabe: yup
        .string()
        .required("CLABE Interbancaria es requerido")
        .min(18, "Debe ser 18 digitos")
        .max(18, "Debe ser 18 digitos"),
      swift: yup
        .string()
        .required("Swift es requerido")
        .min(8, "Mínimo 8 dígitos")
        .max(11, "Máximo 11 dígitos"),
      noCuenta: yup.string().notRequired(),
    });
  }

  if (tipoEntidadId === 0) {
    //local

    return yup.object().shape({
      banco: yup.string().required("Banco es requerido"),
      monedaVenta: yup.string().required("Moneda de Venta es requerido"),
      clabe: yup
        .string()
        .required("CLABE Interbancaria es requerido")
        .min(18, "Debe ser 18 digitos")
        .max(18, "Debe ser 18 digitos"),
      [idInput]: yup
        .mixed()
        .required("A file is required")
        .test(
          "fileType",
          "Solo archivos con formato .pdf",
          (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
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
    [idInput]: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileType",
        "Solo archivos con formato .pdf",
        (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    swift: yup
      .string()
      .required("Swift es requerido")
      .min(8, "Mínimo 8 dígitos")
      .max(11, "Máximo 11 dígitos"),
    noCuenta: yup.string().notRequired(),
  });
};
