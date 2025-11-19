import { Box, Button, Grid } from "@mui/material";
import { useCuentaBancaria } from "./hooks/usecuentaBancaria";
import { CuentasBancarias } from "./components/CuentasBancarias";
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export const CuentaBancaria = () => {
  const { handleBack, onClickNext, disableButtons, validateCuentas, id } =
    useCuentaBancaria();

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
            <NavigateBeforeIcon sx={{ marginLeft: 1 }} />
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {id && (
            <Button
              onClick={() => onClickNext(1)}
              variant="outlined"
              sx={{ mr: 1 }}
              disabled={disableButtons}
            >
              Modificar
              <SaveIcon sx={{ marginLeft: 1 }} />
            </Button>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            variant="outlined"
            disabled={disableButtons}
            onClick={() => onClickNext(0)}
          >
            Siguiente
            <NavigateNextIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
