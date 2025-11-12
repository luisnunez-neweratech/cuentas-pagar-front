export interface Documento {
  id?: number;
  fechaInicio: string;
  fechaFin?: string;
  indeterminado: boolean;
  fileValue?: File | null;
  addToContrato?: boolean;
  downloadUrl?: string;
  fileName?: string; // nombre del archivo de BD
}

export interface Documentos {
  tipo: string;
  principal: Documento;
  csf: Documento;
  idRepLegal: Documento;
  compDomicilio: Documento;
  poderRepLegal: Documento;
  anexo: Documento;
}
