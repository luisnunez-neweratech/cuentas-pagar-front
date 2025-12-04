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

  setTipoDocumentoId: (tipoDocumentoId: number) => void;
  setPdfFile: (pdfFileValue: File) => void;
  setXmlFile: (xmlFileValue: File) => void;
  setFacturaId: (id: number) => void;
  setTipoEntidadId: (tipoEntidadId: number) => void;
  clearState: () => void;

  addRowFacturaDetalle: (facturaDetalle: FacturaDetalle) => void;
  removeRowFacturaDetalle: (id: number) => void;
  updateRowFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => void;
}

const storeFactura: StateCreator<FacturaState> = (set) => ({
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
    set((state) => ({
      facturaDetalle: [...(state.facturaDetalle ?? []), facturaDetalle],
    }));
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
    }));
  },
});

export const useFacturaStore = create<FacturaState>()(storeFactura);
