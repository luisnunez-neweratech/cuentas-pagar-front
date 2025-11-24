export interface FiltrosProveedores {
  rfc: string;
  alias: string;
  razonSocial: string;
  fechaAlta: string | undefined | null;
  fechaInicioContrato: string;
  fechaFinContrato: string;
  status: boolean;
}
