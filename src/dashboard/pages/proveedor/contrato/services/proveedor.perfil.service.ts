import { cuentasApi } from "../../../../../api/cuentasApi";
import type { NewDocumento } from "../interface/stepContrato";
import type { PostColaboradorPayload } from "./interfaces/PostColaborador.Payload";
import type { PostContratoPayload } from "./interfaces/PostContratoPayload";
import type { PostDocumentoPrincipalProveedor } from "./interfaces/PostDocumentoPrincipalProveedor";
import type { PostDocumentoProveedor } from "./interfaces/PostDocumentoProveedor.Payload";

interface addProveedorContratoProps {
  supplierId: string;
  postContratoPayload: PostContratoPayload;
  documentos?: NewDocumento[];
}

export const addProveedorContrato = async ({
  supplierId,
  postContratoPayload,

}: addProveedorContratoProps): Promise<any> => {
  const { data } = await cuentasApi.post(`/Contract/Supplier/${supplierId}`, {
    ...postContratoPayload,
  });
  return data;
};

interface addProveedorDocumentoProps {
  supplierId: string;
  postDocumentoProveedor: PostDocumentoProveedor;
}

export const addDocumentoProveedor = async ({
  supplierId,
  postDocumentoProveedor,
}: addProveedorDocumentoProps): Promise<any> => {
  const formData = new FormData();
  formData.append("file", postDocumentoProveedor.file);
  formData.append(
    "documentType",
    postDocumentoProveedor.documentType.toString()
  );
  formData.append("fechaInicio", postDocumentoProveedor.fechaInicio);
  formData.append(
    "fechaVencimiento",
    postDocumentoProveedor.fechaVencimiento ?? ""
  );
  formData.append(
    "esIndeterminado",
    postDocumentoProveedor.esIndeterminado ? "true" : " false"
  );

  const { data } = await cuentasApi.post(
    `/SupplierProfileDocument/${supplierId}/Upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

interface addProveedorDocumentoPrincipalProps {
  contractId: string;
  postDocumentoPrincipalProveedor: PostDocumentoPrincipalProveedor;
}

export const addDocumentoPrincipalProveedor = async ({
  contractId,
  postDocumentoPrincipalProveedor,
}: addProveedorDocumentoPrincipalProps): Promise<any> => {
  const formData = new FormData();
  formData.append("file", postDocumentoPrincipalProveedor.file);
  formData.append(
    "documentType",
    postDocumentoPrincipalProveedor.documentType.toString()
  );
  formData.append(
    "isProposal",
    postDocumentoPrincipalProveedor.isProposal ? "true" : " false"
  );
  formData.append(
    "isMainDocument",
    postDocumentoPrincipalProveedor.isMainDocument ? "true" : " false"
  );

  formData.append("fechaInicio", postDocumentoPrincipalProveedor.fechaInicio);
  formData.append(
    "fechaVencimiento",
    postDocumentoPrincipalProveedor.fechaVencimiento ?? ""
  );
  formData.append(
    "esIndeterminado",
    postDocumentoPrincipalProveedor.esIndeterminado ? "true" : " false"
  );

  const { data } = await cuentasApi.post(
    `/ContractDocument/Contract/${contractId}/Upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

interface addColaboradoresProveedorProps {
  contractId: string;
  postColaboradorPayload: PostColaboradorPayload;
}

export const addColaboradoresProveedor = async ({
  contractId,
  postColaboradorPayload,
}: addColaboradoresProveedorProps): Promise<any> => {
  const { data } = await cuentasApi.post(
    `/ContractCollaborator/Contract/${contractId}`,
    {
      ...postColaboradorPayload,
    }
  );
  return data;
};

export const getProveedorPerfil = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/${id}/Details`);

  return {
    id: data.id,
    tipoProveedor: data.supplierTypeId,
    tipoEntidad: data.originId,
    tipoPersona: data.legalPersonTypeId,
    razonSocial: data.legalName,
    alias: data.tradeName,
    rfc: data.rfc,
    email: data.email,
    giroPrincipal: data.supplierActivity ?? null,
    productos: data.productServices.map((producto: any) => producto.id),
    paymentTermsId: data.paymentTermsId,
    isActive: data.isActive,

    pais: data.country,
    codigoPostal: data.postalCode,
    estado: data.state,
    municipio: data.municipality,
    ciudad: data.city,
    colonia: data.neighborhood,
    calle: data.street,
    numInterior: data.interiorNumber,
    numExterior: data.exteriorNumber,

    // contratos
    contratos: data.contracts,

    //contactos
    contactos: data.contacts,

    //bancos
    cuentasBancarias: data.bankDetails,

    //documentos
    proveedorDocumentos: data.allDocuments,

    // contracto documents
    proveedorDocumentosContrato: data.contractDocuments,
  };
};
