export interface PostPerfilPayload {  
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
}
