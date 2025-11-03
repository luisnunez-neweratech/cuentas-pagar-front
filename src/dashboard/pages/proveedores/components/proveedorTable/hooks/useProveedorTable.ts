import { useNavigate } from "react-router";
import { useProveedorOcasionalStore } from "../../../../proveedor/ocasional/store/ProveedorOcasional.store";
import type { ProveedorOcasional } from "../../../../../../interfaces/proveedor-ocasional.interface";
import { TipoEntidad } from "../../../../proveedor/interfaces/TipoEntidad";
import { TipoPersona } from "../../../../proveedor/interfaces/TipoPersona";

export const useProveedorTable = () => {
  const navigate = useNavigate();
  const setProveedorOcasional = useProveedorOcasionalStore(
    (state) => state.setProveedorOcasional
  );

  const rowClick = (row: any) => {
    if (row.tipoProveedor === "ocasional") {
      const proveedorOcasional: ProveedorOcasional = {
        tipoProveedor: row.tipoProveedor,
        tipoEntidad: TipoEntidad.Local,
        tipoPersona: TipoPersona.Fisica,
        razonSocial: row.razonSocial,
        alias: "alias 1",
      };
      setProveedorOcasional(proveedorOcasional);
      navigate(row.id);
    }
  };

  return {
    rowClick,
  };
};
