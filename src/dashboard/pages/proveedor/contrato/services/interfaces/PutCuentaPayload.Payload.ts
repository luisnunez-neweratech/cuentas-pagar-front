export interface PutCuentaPayload {
  accountType: number;
  bankName: string;
  saleCurrencyId: number;
  clabe: string;
  swiftCode?: string | null;
  paymentTermsId: number;
  isActive: boolean;
}
