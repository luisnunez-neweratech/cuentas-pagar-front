import { Box, Button, Grid } from "@mui/material";
import { useContrato } from "../../hooks/useContrato";

export const Contrato = () => {
  const { handleBack } = useContrato();

  return (
    <form /* onSubmit={handleSubmit} */>
      <Grid container sx={{ marginTop: 4 }} spacing={2}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button type="submit">Siguiente</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
