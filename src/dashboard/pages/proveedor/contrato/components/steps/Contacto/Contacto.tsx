import { Box, Button, Grid } from "@mui/material";
import { useContacto } from "./hooks/useContacto";
import { Contactos } from "./components/Contactos";

export const Contacto = () => {
  const { handleBack, guardarProovedor } = useContacto();

  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
      <Contactos />
      <Grid size={12}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
            Atras
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={guardarProovedor}>Guardar Proveedor</Button>
        </Box>
      </Grid>
    </Grid>
  );
};
