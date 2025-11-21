import { cuentasApi } from "../../../../../api/cuentasApi";
import { type PostPerfilPayload } from "./interfaces/PostPerfilPayload";
import { type PutContratoPayload } from "./interfaces/PutContratoPayload";

export const addProveedorContratoPerfil = async (
  postPerfilPayload: PostPerfilPayload
): Promise<any> => {
  const { data } = await cuentasApi.post("/Supplier/Create", {
    ...postPerfilPayload,
  });
  return data;
};

interface updateProveedorContratoPerfilProps {
  putContratoPayload: PutContratoPayload;
  clickedBy?: number;
}
export const updateProveedorContratoPerfil = async ({
  putContratoPayload,
  clickedBy: _,
}: updateProveedorContratoPerfilProps): Promise<any> => {
  const response = await cuentasApi.put(
    `/Supplier/Update/${putContratoPayload.id}`,
    {
      ...putContratoPayload,
    }
  );
  return response;
};

export const getProveedorContrato = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Contract/Supplier/${id}`);

  //TODO es un array , contemplar que es historico de contratos

  return {
    id: data[0].id,
    fechaInicio: data[0].startDate,
    fechaFin: data[0].endDate,
    indeterminado: data[0].indefiniteEnd,
    checkContractor: data[0].isNEContractor,
    noColaborador: data[0].neCollaboratorNumber,
  };
};

export const getProveedorDocumentos = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/SupplierProfileDocument/${id}`);

  // array con CSF, IdRepLegal, CompDom, PoderRep
  return data;
};

export const getProveedorDocumentosContrato = async (contratoId: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/ContractDocument/Contract/${contratoId}/Grouped`);

  // array con CSF, IdRepLegal, CompDom, PoderRep
  return data;
};

export const getColaboradoresContrato = async (
  contratoId: string
): Promise<any> => {
  const { data } = await cuentasApi.get(
    `/ContractCollaborator/Contract/${contratoId}`
  );

  // array con colaboradores
  return data;
};

export const deleteColaboradoresContrato = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/ContractCollaborator/${id}`);
  return response;
};

export const getProveedorCuentas = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/BankDetail/Supplier/${id}`);

  // array con CSF, IdRepLegal, CompDom, PoderRep
  return data;
};
