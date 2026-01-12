import { type StateCreator, create } from "zustand";
import type { FacturaDetalle } from "../interfaces/FacturaDetalle";
import type { Item } from "../../../../components/common/AutoComplete/interfaces/Item";

export interface FacturaState {
  id: number | null;
  proveedorId: number | null;
  colaboradorId: number | null;
  tipoDocumentoId: number | null;
  statusFacturaId: number | null;
  statusReembolsoId: number | null;
  monedaId: number | null;
  noFactura: string | null;
  folioFiscal: string | null;
  productos: Item[] | null;
  tipoEntidadId: number | null;
  condicionesPagoId: number | null;
  condicionesPagoLabel: string | null;

  fechaFactura: string | null;
  programadaPago: string | null;
  fechaPago: string | null;
  fechaReembolso: string | null;

  pdfFileValue: File | null;
  pdfDownloadUrl: string | null;
  xmlFileValue: File | null;
  xmlDownloadUrl: string | null;
  paymentProofFileValue: File | null;
  paymentProofDownloadUrl: string | null;

  subtotal: number | null;
  descuento: number | null;
  impuestos: number | null;
  ivaRetenido: number | null;
  isrRetenido: number | null;
  total: number | null;

  facturaDetalle: FacturaDetalle[] | null;

  validTabHeader: boolean;

  disableButtons: boolean;

  scheduledPaymentMessage: string | null;

  initialSupplierId: number | null;
  initialInvoiceDate: string | null;
  initialPaymentTermId: number | null;

  openModal: boolean;
  modalFacturaAceptada: boolean;

  setTipoDocumentoId: (tipoDocumentoId: number) => void;
  setPdfFile: (pdfFileValue: File) => void;
  setXmlFile: (xmlFileValue: File) => void;
  setPaymentProofFile: (paymentProofFileValue: File) => void;
  setFacturaId: (id: number) => void;
  setTipoEntidadId: (tipoEntidadId: number) => void;
  setValidTabHeader: (validTabHeader: boolean) => void;
  setDisableButtons: (disableButtons: boolean) => void;
  setPdfDownloadUrl: (pdfDownloadUrl: string) => void;
  setXmlDownloadUrl: (xmlDownloadUrl: string) => void;
  setPaymentProofDownloadUrl: (paymentProofDownloadUrl: string) => void;
  setScheduledPaymentMessage: (scheduledPaymentMessage: string | null) => void;
  setInitialValues: (
    supplierId: number,
    invoiceDate: string,
    paymentTermId: number
  ) => void;
  clearState: () => void;

  addRowFacturaDetalle: (facturaDetalle: FacturaDetalle) => void;
  removeRowFacturaDetalle: (id: number) => void;
  updateRowFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => void;

  handleOpenModal: () => void;
  handleCloseModal: () => void;
  setModalFacturaAceptada: (modalFacturaAceptada: boolean) => void;
  clearPdfValues: () => void;
  clearXmlValues: () => void;
}

const storeFactura: StateCreator<FacturaState> = (set, get) => ({
  id: null,
  proveedorId: null,
  colaboradorId: null,
  tipoDocumentoId: null,
  statusFacturaId: null,
  statusReembolsoId: null,
  monedaId: null,
  noFactura: null,
  folioFiscal: null,
  productos: [],
  tipoEntidadId: null,
  condicionesPagoId: null,
  condicionesPagoLabel: null,

  fechaFactura: null,
  programadaPago: null,
  fechaPago: null,
  fechaReembolso: null,

  subtotal: 0,
  descuento: 0,
  impuestos: 0,
  ivaRetenido: 0,
  isrRetenido: 0,
  total: 0,

  pdfFileValue: null,
  pdfDownloadUrl: null,
  xmlFileValue: null,
  xmlDownloadUrl: null,
  paymentProofFileValue: null,
  paymentProofDownloadUrl: null,

  facturaDetalle: null,

  validTabHeader: false,
  disableButtons: false,
  scheduledPaymentMessage: null,

  initialSupplierId: null,
  initialInvoiceDate: null,
  initialPaymentTermId: null,

  openModal: false,
  modalFacturaAceptada: false,

  setTipoDocumentoId: (tipoDocumentoId: number) => {
    set((state) => ({
      ...state,
      tipoDocumentoId,
    }));
  },

  setPdfFile: (pdfFileValue: File) => {
    set((state) => ({
      ...state,
      pdfFileValue,
    }));
  },

  setXmlFile: (xmlFileValue: File) => {
    set((state) => ({
      ...state,
      xmlFileValue,
    }));
  },

  setPaymentProofFile: (paymentProofFileValue: File) => {
    set((state) => ({
      ...state,
      paymentProofFileValue,
    }));
  },

  setFacturaId: (id: number) => {
    set((state) => ({
      ...state,
      id,
    }));
  },

  addRowFacturaDetalle: (facturaDetalle: FacturaDetalle) => {
    const idFound = get().facturaDetalle?.find(
      (factura) => factura.id === facturaDetalle.id
    );
    if (!idFound) {
      set((state) => ({
        facturaDetalle: [...(state.facturaDetalle ?? []), facturaDetalle],
      }));
    }
  },
  removeRowFacturaDetalle: (id: number) => {
    set((state) => ({
      facturaDetalle: [
        ...(state.facturaDetalle?.filter((item) => item.id !== id) ?? []),
      ],
    }));
  },
  updateRowFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => {
    set((state) => ({
      facturaDetalle: (state.facturaDetalle ?? []).map((item) =>
        item.id === id ? { ...facturaDetalle } : item
      ),
    }));
  },
  setTipoEntidadId: (tipoEntidadId: number) => {
    set((state) => ({
      ...state,
      tipoEntidadId,
    }));
  },
  setValidTabHeader: (validTabHeader: boolean) => {
    set((state) => ({
      ...state,
      validTabHeader,
    }));
  },
  setDisableButtons: (disableButtons: boolean) => {
    set((state) => ({
      ...state,
      disableButtons,
    }));
  },
  setPdfDownloadUrl: (pdfDownloadUrl: string) => {
    set((state) => ({
      ...state,
      pdfDownloadUrl,
    }));
  },
  setXmlDownloadUrl: (xmlDownloadUrl: string) => {
    set((state) => ({
      ...state,
      xmlDownloadUrl,
    }));
  },
  setPaymentProofDownloadUrl: (paymentProofDownloadUrl: string) => {
    set((state) => ({
      ...state,
      paymentProofDownloadUrl,
    }));
  },
  setScheduledPaymentMessage: (scheduledPaymentMessage: string | null) => {
    set((state) => ({
      ...state,
      scheduledPaymentMessage,
    }));
  },
  setInitialValues: (
    supplierId: number,
    invoiceDate: string,
    paymentTermId: number
  ) => {
    set((state) => ({
      ...state,
      initialSupplierId: supplierId,
      initialInvoiceDate: invoiceDate,
      initialPaymentTermId: paymentTermId,
    }));
  },
  clearState: () => {
    set((_state) => ({
      id: null,
      proveedorId: null,
      colaboradorId: null,
      tipoDocumentoId: null,
      statusFacturaId: null,
      statusReembolsoId: null,
      monedaId: null,
      noFactura: null,
      folioFiscal: null,
      productos: [],
      tipoEntidadId: null,
      condicionesPagoId: null,
      condicionesPagoLabel: null,

      fechaFactura: null,
      programadaPago: null,
      fechaPago: null,
      fechaReembolso: null,

      subtotal: 0,
      descuento: 0,
      impuestos: 0,
      ivaRetenido: 0,
      isrRetenido: 0,
      total: 0,

      pdfFileValue: null,
      pdfDownloadUrl: null,
      xmlFileValue: null,
      xmlDownloadUrl: null,
      paymentProofFileValue: null,
      paymentProofDownloadUrl: null,

      facturaDetalle: null,
      disableButtons: false,

      validTabHeader: false,
      scheduledPaymentMessage: null,

      initialSupplierId: null,
      initialInvoiceDate: null,
      initialPaymentTermId: null,

      modalFacturaAceptada: false,
    }));
  },
  handleOpenModal: () => {
    set({ openModal: true });
  },
  handleCloseModal: () => {
    set({ openModal: false });
  },
  setModalFacturaAceptada: (modalFacturaAceptada: boolean) => {
    set({ modalFacturaAceptada });
  },
  clearPdfValues: () => {
    set((state) => ({
      ...state,
      pdfFileValue: null,
      pdfDownloadUrl: null,
    }));
  },
  clearXmlValues: () => {
    set((state) => ({
      ...state,
      xmlFileValue: null,
      xmlDownloadUrl: null,
    }));
  }
});

export const useFacturaStore = create<FacturaState>()(storeFactura);
