import { Box, Button, Grid } from "@mui/material";
import { useContacto } from "./hooks/useContacto";
import { Contactos } from "./components/Contactos";

export const Contacto = () => {
  const { handleBack, guardarProovedor, validateContactos, id } = useContacto();

  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
      <Contactos validateContactos={validateContactos} />
      <Grid size={12}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
            Atras
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {id && (
            <Button
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={() => guardarProovedor(1)}
            >
              Modificar
            </Button>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          <Button variant="outlined" onClick={() => guardarProovedor(0)}>
            {id ? "Salir" : "Guardar Proveedor"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
