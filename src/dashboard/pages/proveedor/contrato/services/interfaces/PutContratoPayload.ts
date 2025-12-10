export interface PutContratoPayload {
  //stepPerfil
  id: number;
  supplierTypeId: number;
  originId: number;
  legalPersonTypeId: number;
  legalName: string;
  tradeName: string;
  rfc: string;
  email: string;
  supplierActivity: string | null;
  productServiceIds: number[];
  paymentTermsId: number;
  //stepDomicilio
  country?: string | null;
  postalCode?: string | null;
  state?: string | null;
  municipality?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  interiorNumber?: string | null;
  exteriorNumber?: string | null;
}
