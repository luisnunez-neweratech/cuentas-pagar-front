export interface PutContratoInfoPayload {
  id: number;
  supplierId: number;
  startDate: string;
  endDate: string;
  indefiniteEnd: boolean;
  isNEContractor: boolean;
  nePersonType: string;
  neCollaboratorNumber: string;
}
