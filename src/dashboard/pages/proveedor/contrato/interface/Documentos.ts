export interface Documento {
  archivo: File | null;
  fechaInicio: string;
  fechaFin?: string;
  indeterminado: boolean;
  fileValue?: File;
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
