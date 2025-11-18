import { Box, Button, Grid } from "@mui/material";
import { usecuentaBancaria } from "./hooks/usecuentaBancaria";
import { CuentasBancarias } from "./components/CuentasBancarias";

export const CuentaBancaria = () => {
  const { handleBack, onClickNext, disableButtons, validateCuentas, id } =
    usecuentaBancaria();

  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
      <CuentasBancarias validateCuentas={validateCuentas} />
      <Grid size={12}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="outlined"
            disabled={disableButtons}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Atras
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {id && (
            <Button variant="outlined" sx={{ mr: 1 }}>
              Modificar
            </Button>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            variant="outlined"
            disabled={disableButtons}
            onClick={onClickNext}
          >
            Siguiente
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
