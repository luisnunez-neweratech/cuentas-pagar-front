import * as yup from "yup";

export const validationSchema = yup.object().shape({
  banco: yup.string().required("Banco es requerido"),
  monedaVenta: yup.string().required("Moneda de Venta es requerido"),
  clabe: yup.string().required("CLABE Interbancaria es requerido"),
  condicionesPago: yup.string().required("Condiciones de Pago es requerido"),
});
