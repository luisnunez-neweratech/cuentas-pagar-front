export interface PostCuentaPayload {
  accountType: number;
  bankName: string;
  saleCurrencyId: number;
  clabe: string;
  swiftCode?: string | null;
  paymentTermsId: number;
}
