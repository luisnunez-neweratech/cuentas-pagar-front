import { useNavigate } from "react-router";
import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";
import type { ProveedorOcasional } from "../../../../../../interfaces/proveedor-ocasional.interface";

export const useProveedorTable = () => {
  const navigate = useNavigate();
  const setProveedorOcasional = useProveedoresPageStore(
    (state) => state.setProveedorOcasional
  );

  const rowClick = (row: any) => {
    if (row.tipoProveedor === "ocasional") {
      const proveedorOcasional: ProveedorOcasional = {
        tipoProveedor: row.tipoProveedor,
        tipoEntidad: "local",
        tipoPersona: "fisica",
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
