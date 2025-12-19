import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";

export const useActiveFilters = () => {
  const filtrosProveedores = useProveedoresPageStore(
    (state) => state.filtrosProveedores
  );

  return {
    rfcValue: filtrosProveedores.rfc,
    aliasValue: filtrosProveedores.alias,
    razonSocialValue: filtrosProveedores.razonSocial,
    fechaAltaValue: filtrosProveedores.fechaAlta,
    fechaInicioContratoValue: filtrosProveedores.fechaInicioContrato,
    fechaFinContratoValue: filtrosProveedores.fechaFinContrato,
    statusValue: filtrosProveedores.status,
  };
};
