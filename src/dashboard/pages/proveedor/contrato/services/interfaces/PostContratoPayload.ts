export interface PostContratoPayload {  
    startDate: Date;
    endDate?: Date | null;
    indefiniteEnd: boolean;
    isNEContractor: boolean;
    nePersonType?:  string | null;
    neCollaboratorNumber?: string | null;

    csfIndicator?:  string | null;
    legalRepIdIndicator?:  string | null;
    proofOfAddressIndicator?:  string | null;
    legalRepPowerIndicator?:  string | null;    
}
