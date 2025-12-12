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

  subtotal: number | null;
  descuento: number | null;
  impuestos: number | null;
  ivaRetenido: number | null;
  isrRetenido: number | null;
  total: number | null;

  facturaDetalle: FacturaDetalle[] | null;

  validTabHeader: boolean;
  validTabDetail: boolean;
  validTabTotal: boolean;

  disableButtons: boolean;

  setTipoDocumentoId: (tipoDocumentoId: number) => void;
  setPdfFile: (pdfFileValue: File) => void;
  setXmlFile: (xmlFileValue: File) => void;
  setFacturaId: (id: number) => void;
  setTipoEntidadId: (tipoEntidadId: number) => void;
  setValidTabHeader: (validTabHeader: boolean) => void;
  setValidTabDetail: (validTabDetail: boolean) => void;
  setValidTabTotal: (validTabTotal: boolean) => void;
  setDisableButtons: (disableButtons: boolean) => void;
  setPdfDownloadUrl: (pdfDownloadUrl: string) => void;
  setXmlDownloadUrl: (xmlDownloadUrl: string) => void;
  clearState: () => void;

  addRowFacturaDetalle: (facturaDetalle: FacturaDetalle) => void;
  removeRowFacturaDetalle: (id: number) => void;
  updateRowFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => void;
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

  facturaDetalle: null,

  validTabHeader: false,
  validTabDetail: false,
  validTabTotal: false,
  disableButtons: false,

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
  setValidTabDetail: (validTabDetail: boolean) => {
    set((state) => ({
      ...state,
      validTabDetail,
    }));
  },
  setValidTabTotal: (validTabTotal: boolean) => {
    set((state) => ({
      ...state,
      validTabTotal,
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

      facturaDetalle: null,
      disableButtons: false,

      validTabHeader: false,
      validTabDetail: false,
      validTabTotal: false,      
    }));
  },
});

export const useFacturaStore = create<FacturaState>()(storeFactura);
