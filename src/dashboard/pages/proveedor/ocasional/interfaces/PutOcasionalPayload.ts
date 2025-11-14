export interface PutOcasionalPayload {
  id: number;
  supplierTypeId: number;
  originId: number;
  legalPersonTypeId: number;
  legalName: string;
  tradeName: string;
  rfc: string;
  email: string;
  productServiceIds: number[];
}
