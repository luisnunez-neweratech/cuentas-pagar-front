export interface PostDocumentoPrincipalProveedor {
  documentType: number;
  isProposal : boolean;
  isMainDocument  : boolean;
  fechaInicio: string;
  fechaVencimiento: string | null;
  esIndeterminado: boolean;
  file: any;
}
