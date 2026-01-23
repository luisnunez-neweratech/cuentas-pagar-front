import * as yup from "yup";

export const validationSchema = (tipoEntidadId: number | null) => {
  if (tipoEntidadId === 0) {
    // nacional
    return yup.object().shape({
      proveedorId: yup.object({
        value: yup.number().min(1, "Requerido"),
        label: yup.string().required("Requerido"),
      }),
      colaboradorId: yup.object({
        value: yup.number().min(1, "Requerido"),
        label: yup.string().required("Requerido"),
      }),
      tipoDocumentoId: yup.number().required("TRequerido"),
      statusFacturaId: yup.number().required("Requerido"),
      statusReembolsoId: yup.number().required("Requerido"),
      monedaId: yup.number().required("Requerido"),
      noFactura: yup.string().required("Requerido"),
      folioFiscal: yup.string().required("Requerido"),
      fechaFactura: yup.string().required("Requerido"),
      fechaProgramadaPago: yup.string().required("Requerido"),
      fechaPago: yup.string().notRequired(),
      fechaReembolso: yup.string().notRequired(),
      subtotal: yup.number().required("Requerido"),
      descuento: yup.number().required("Requerido"),
      impuestos: yup.number().required("Requerido"),
      ivaRetenido: yup.number().required("Requerido"),
      isrRetenido: yup.number().required("Requerido"),
      total: yup.number().required("Requerido"),
      productos: yup.array(), //.required("Requerido").min(1, "Requerido"),
    });
  } else {
    return yup.object().shape({
      proveedorId: yup.object({
        value: yup.number().min(1, "Requerido"),
        label: yup.string().required("Requerido"),
      }),
      colaboradorId: yup.object({
        value: yup.number().min(1, "Requerido"),
        label: yup.string().required("Requerido"),
      }),
      tipoDocumentoId: yup.number().required("TRequerido"),
      statusFacturaId: yup.number().required("Requerido"),
      statusReembolsoId: yup.number().required("Requerido"),
      monedaId: yup.number().required("Requerido"),
      noFactura: yup.string().required("Requerido"),
      folioFiscal: yup.string().notRequired(),
      fechaFactura: yup.string().required("Requerido"),
      fechaProgramadaPago: yup.string().required("Requerido"),
      fechaPago: yup.string().notRequired(),
      fechaReembolso: yup.string().notRequired(),
      subtotal: yup.number().required("Requerido"),
      descuento: yup.number().required("Requerido"),
      impuestos: yup.number().required("Requerido"),
      ivaRetenido: yup.number().notRequired(),
      isrRetenido: yup.number().notRequired(),
      total: yup.number().required("Requerido"),
      productos: yup.array(), //.required("Requerido").min(1, "Requerido"),
    });
  }
};
