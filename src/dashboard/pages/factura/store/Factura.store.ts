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

  setFacturaId: (id: number) => void;
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

  fechaFactura: null,
  programadaPago: null,
  fechaPago: null,
  fechaReembolso: null,

  subtotal: null,
  descuento: null,
  impuestos: null,
  ivaRetenido: null,
  isrRetenido: null,
  total: null,

  pdfFileValue: null,
  pdfDownloadUrl: null,
  xmlFileValue: null,
  xmlDownloadUrl: null,

  facturaDetalle: null,

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

      fechaFactura: null,
      programadaPago: null,
      fechaPago: null,
      fechaReembolso: null,

      subtotal: null,
      descuento: null,
      impuestos: null,
      ivaRetenido: null,
      isrRetenido: null,
      total: null,

      pdfFileValue: null,
      pdfDownloadUrl: null,
      xmlFileValue: null,
      xmlDownloadUrl: null,

      facturaDetalle: null,
    }));
  },
});

export const useFacturaStore = create<FacturaState>()(storeFactura);
