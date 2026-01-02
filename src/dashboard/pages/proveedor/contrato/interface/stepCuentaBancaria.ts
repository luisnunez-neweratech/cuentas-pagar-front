export interface StepCuentaBancaria {
  id: number,
  valido: boolean,
  banco: string;
  monedaVenta: string;
  clabe: string;
  swift?: string;
  status: boolean;
  fileValue?: File;
  newElement?: boolean;
  downloadUrl?:string | null;
  noCuenta?: string | null;
  routeNumber?: string | null;
}
