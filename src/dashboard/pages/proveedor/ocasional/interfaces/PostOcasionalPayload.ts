export interface PostOcasionalPayload {
  supplierTypeId: number;
  originId: number;
  legalPersonTypeId: number;
  legalName: string;
  tradeName: string;
  rfc: string;
  email: string;
  supplierActivityId: number | null;
  productServiceIds: number[];
}
