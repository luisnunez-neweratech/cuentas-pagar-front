import { Grid } from "@mui/material";
import { CatalogCard } from "./components/CatalogCard";

export const CatalogosPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <CatalogCard
          titulo="Giros"
          navigateTo="/catalogos/giros"
          cantidad={2}
        />
      </Grid>
    </Grid>
  );
};
