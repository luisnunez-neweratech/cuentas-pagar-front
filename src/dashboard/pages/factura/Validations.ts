import * as yup from "yup";

export const validationSchema = yup.object().shape({
  proveedorId: yup.object().required("Requerido"),
  colaboradorId: yup.object().required("Requerido"),
  tipoDocumentoId: yup.number().required("TRequerido"),
  statusFacturaId: yup.number().required("Requerido"),
  statusReembolsoId: yup.number().required("Requerido"),
  monedaId: yup.number().required("Requerido"),
  noFactura: yup.string().required("Requerido"),
  folioFiscal: yup.string().required("Requerido"),
  fechaFactura: yup.string().required("Requerido"),
  fechaProgramadaPago: yup
    .string()
    .required("Requerido"),
  fechaPago: yup.string().required("Requerido"),
  fechaReembolso: yup.string().required("Requerido"),
  subtotal: yup.number().required("Requerido"),
  descuento: yup.number().required("Requerido"),
  impuestos: yup.number().required("Requerido"),
  ivaRetenido: yup.number().required("Requerido"),
  isrRetenido: yup.number().required("Requerido"),
  total: yup.number().required("Requerido"),
});
