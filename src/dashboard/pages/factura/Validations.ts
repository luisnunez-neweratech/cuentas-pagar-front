import * as yup from "yup";

export const validationSchema = yup.object().shape({
  proveedorId: yup.object().required("Proveedor es requerido"),
  colaboradorId: yup.object().required("Colaborador es requerido"),
  tipoDocumentoId: yup.number().required("Tipo Documento es requerido"),
  statusFacturaId: yup.number().required("Estatus Factura es requerido"),
  statusReembolsoId: yup.number().required("Estatus Reembolso es requerido"),
  monedaId: yup.number().required("Moneda es requerido"),
  noFactura: yup.string().required("Número Factura es requerido"),
  folioFiscal: yup.string().required("Folio Fiscal es requerido"),
  fechaFactura: yup.string().required("Fecha Factura es requerido"),
  fechaProgramadaPago: yup
    .string()
    .required("Fecha Programada Pago es requerido"),
  fechaPago: yup.string().required("Fecha Pago es requerido"),
  fechaReembolso: yup.string().required("Fecha Reembolso es requerido"),
  subtotal: yup.number().required("Subtotal es requerido"),
  descuento: yup.number().required("Descuento es requerido"),
  impuestos: yup.number().required("Impuestos es requerido"),
  ivaRetenido: yup.number().required("IVA Retenido es requerido"),
  isrRetenido: yup.number().required("ISR Retenido es requerido"),
  total: yup.number().required("Total es requerido"),
});
