export interface CuentaBancaria {
  banco: string;
  monedaVenta: string;
  clabe: string;
  swift?: string;
  condicionesPago: string;
  status: boolean;
}
