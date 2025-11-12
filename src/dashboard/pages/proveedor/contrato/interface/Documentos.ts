export interface Documento {
  fechaInicio: string;
  fechaFin?: string;
  indeterminado: boolean;
  fileValue?: File;
  addToContrato?: boolean;
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
