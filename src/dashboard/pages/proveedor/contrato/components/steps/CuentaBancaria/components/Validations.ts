import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf"];

export const validationSchema = () => {
  return yup.object().shape({
    banco: yup.string().required("Banco es requerido"),
    monedaVenta: yup.string().required("Moneda de Venta es requerido"),
    clabe: yup.string().required("CLABE Interbancaria es requerido"),
    condicionesPago: yup.string().required("Condiciones de Pago es requerido"),
    fileValue: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileType",
        "Solo archivos con formato .pdf",
        (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  });
};
