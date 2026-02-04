import { type StateCreator, create } from "zustand";

interface ImportResultItem {
  fileName?: string;
  success: boolean;
  invoiceId?: number;
  invoiceNumber?: string;
  fiscalFolio?: string;
  supplierRfc?: string;
  supplierName?: string;
  total?: number;
  errorMessage?: string[];
  messages: string[];
  warnings?: string[];
}

interface MassImportResponse {
  totalProcessed: number;
  successful: number;
  failed: number;
  results: ImportResultItem[];
  processingTimeSeconds: number;
  summary: string;
}

export interface FacturaXMLState {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  massImportResponse: MassImportResponse;
  openResultsModal: boolean;
  setOpenResultsModal: (openResultsModal: boolean) => void;

  proveedorExisteModal: boolean;
  handleOpenProveedorExisteModal: () => void;
  handleCloseProveedorExisteModal: () => void;
  proveedorExisteMessage: string;
  setProveedorExisteMessage: (proveedorExisteMessage: string) => void;
  xmlSendFile: any;
  setXmlSendFile: (xmlSendFile: any) => void;

  xmlFileName: any;
  setXmlFileName: (xmlFileName: any) => void;

  facturaResult: any;
  setFacturaResult: (facturaResult: any) => void;
  setMassImportResponse: (massImportResponse: MassImportResponse) => void;

  clearValues: () => void;

  supplierExists: boolean;
  setSupplierExists: (supplierExists: boolean) => void;

  invoiceAlreadyExists: boolean;
  setInvoiceAlreadyExists: (invoiceAlreadyExists: boolean) => void;

}

const storeFacturaXML: StateCreator<FacturaXMLState> = (set) => ({
  openModal: false,
  facturaResult: {
    invoiceId: null,
    messages: [],
    warnings: [],
  },
  massImportResponse: {
    totalProcessed: 0,
    successful: 0,
    failed: 0,
    results: [],
    processingTimeSeconds: 0,
    summary: "",
  },
  openResultsModal: false,
  proveedorExisteMessage: "",
  setProveedorExisteMessage: (proveedorExisteMessage: string) => {
    set({ proveedorExisteMessage });
  },
  xmlSendFile: null,
  setXmlSendFile: (xmlSendFile: any) => {
    set({ xmlSendFile });
  },
  xmlFileName: "",
  setXmlFileName: (xmlFileName: any) => {
    set({ xmlFileName });
  },

  proveedorExisteModal: false,
  handleOpenProveedorExisteModal: () => {
    set({ proveedorExisteModal: true });
  },
  handleCloseProveedorExisteModal: () => {
    set({ proveedorExisteModal: false });
  },

  handleOpenModal: () => {
    set({ openModal: true });
  },
  handleCloseModal: () => {
    set({ openModal: false });
  },
  setFacturaResult: (facturaResult: any) => {
    set({ facturaResult });
  },
  setMassImportResponse: (massImportResponse: MassImportResponse) => {
    set({ massImportResponse });
  },
  setOpenResultsModal: (openResultsModal: boolean) => {
    set({ openResultsModal });
  },

  clearValues: () => {
    set({ xmlFileName: "", xmlSendFile: null, supplierExists: false, invoiceAlreadyExists: false });
  },

  supplierExists: false,
  setSupplierExists: (supplierExists: boolean) => {
    set({ supplierExists });
  },

  invoiceAlreadyExists: false,
  setInvoiceAlreadyExists: (invoiceAlreadyExists: boolean) => {
    set({ invoiceAlreadyExists });
  },
});

export const useFacturaXMLStore = create<FacturaXMLState>()(storeFacturaXML);
