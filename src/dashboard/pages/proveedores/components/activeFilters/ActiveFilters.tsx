import { Grid } from "@mui/material";
import { useActiveFilters } from "./hooks/useActiveFilters";
import { ChipElement } from "./components/chipElement/ChipElement";

export const ActiveFilters = () => {
  const {
    rfcValue,
    aliasValue,
    razonSocialValue,
    fechaAltaValue,
    fechaInicioContratoValue,
    fechaFinContratoValue,
    statusValue,
  } = useActiveFilters();

  return (
    <Grid size={8} sx={{ display: "flex", justifyContent: "space-evenly" }}>
      {rfcValue && <ChipElement label="RFC" value={rfcValue} />}
      {aliasValue && <ChipElement label="Alias" value={aliasValue} />}
      {razonSocialValue && (
        <ChipElement label="Razon Social" value={razonSocialValue} />
      )}
      {fechaAltaValue && (
        <ChipElement label="Fecha Alta" value={fechaAltaValue} />
      )}
      {fechaInicioContratoValue && (
        <ChipElement label="Fecha Inicio" value={fechaInicioContratoValue} />
      )}
      {fechaFinContratoValue && (
        <ChipElement label="Fecha Fin" value={fechaFinContratoValue} />
      )}

      <ChipElement
        label="Estatus"
        value={statusValue ? "Activo" : "Inactivo"}
      />
    </Grid>
  );
};
