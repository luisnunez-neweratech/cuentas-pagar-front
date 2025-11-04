import { Grid } from "@mui/material";
import { CatalogCard } from "./components/CatalogCard";

export const CatalogosPage = () => {
  return (
    <Grid container spacing={1}>
      <Grid size={2}>
        <CatalogCard
          titulo="Giros"
          navigateTo="/catalogos/giros"          
        />
      </Grid>
      <Grid size={1} />
      <Grid size={2}>
        <CatalogCard
          titulo="Moneda de Venta"
          navigateTo="/catalogos/moneda-venta"          
        />
      </Grid>
      <Grid size={1} />
      <Grid size={2}>
        <CatalogCard
          titulo="Condiciones de Pago"
          navigateTo="/catalogos/plazo-pago"          
        />
      </Grid>
    </Grid>
  );
};
