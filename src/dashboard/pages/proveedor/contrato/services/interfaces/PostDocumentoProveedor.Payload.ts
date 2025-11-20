export interface PostDocumentoProveedor {
  documentType: number;
  file: any;
  fechaInicio: string;
  fechaVencimiento: string | null;
  esIndeterminado: boolean;
}
