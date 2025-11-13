import { cuentasApi } from "../../../../api/cuentasApi";
import { converDateFormat } from "../../../../lib/dates";
import { TipoProveedor } from "../../proveedor/interfaces/TipoProveedor";

interface getProveedoresProps {
  page: number;
  rowsPerPage: number;
  rfc?: string;
  alias?: string;
  razonSocial?: string;
  fechaalta?: string | null;
  contratoFechaInicio?: string | null;
  contratoFechaFin?: string | null;
}

export const getProveedores = async ({
  page,
  rowsPerPage,
  rfc,
  alias,
  razonSocial,
  fechaalta,
  contratoFechaInicio,
  contratoFechaFin,
}: getProveedoresProps): Promise<any> => {
  let paramsToSend: any = {};
  if (rfc && rfc.length > 0) {
    paramsToSend.rfc = rfc;
  }
  if (alias && alias.length > 0) {
    paramsToSend.alias = alias;
  }
  if (razonSocial && razonSocial.length > 0) {
    paramsToSend.razonSocial = razonSocial;
  }
  if (fechaalta && fechaalta.length > 0) {
    paramsToSend.fechaalta = fechaalta;
  }
  if (contratoFechaInicio && contratoFechaInicio.length > 0) {
    paramsToSend.contratoFechaInicio = contratoFechaInicio;
  }
  if (contratoFechaFin && contratoFechaFin.length > 0) {
    paramsToSend.contratoFechaFin = contratoFechaFin;
  }

  const { data } = await cuentasApi.get(
    `/Supplier/GetPagedAsync/${page}/${rowsPerPage}`,
    { params: { ...paramsToSend } }
  );

  const dataMapped = data.items.map((proveedor: any) => {
    return {
      providerCode: proveedor.providerCode,
      id: proveedor.id,
      rfc: proveedor.rfc,
      alias: proveedor.tradeName,
      razonSocial: proveedor.legalName,
      fechaAlta: converDateFormat(proveedor.createdAt),
      fechaInicioContrato: converDateFormat(proveedor.contractStartDate),
      fechaFinContrato: converDateFormat(proveedor.contractEndDate),
      indicadorCSF:
        proveedor.indicadorCSF.toUpperCase() === "SI" ? true : false,
      indicadorIdRepLegal:
        proveedor.indicadorIdRepLegal.toUpperCase() === "SI" ? true : false,
      indicadorCompDom:
        proveedor.indicadorCompDom.toUpperCase() === "SI" ? true : false,
      indicadorPoderRep:
        proveedor.indicadorPoderRep.toUpperCase() === "SI" ? true : false,
      tipoProveedor:
        proveedor.supplierTypeId === 0
          ? TipoProveedor.Contrato.value
          : TipoProveedor.Ocasional.value,
    };
  });

  return {
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
    items: dataMapped,
  };
};
