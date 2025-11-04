import { Button, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { useMoneda } from "./hooks/useMoneda";
import SaveIcon from "@mui/icons-material/Save";

export const Moneda = () => {
  const navigate = useNavigate();
  const {    
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useMoneda();

  return (
    <form
      style={{
        width: "100%",
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid size={1}>
          <Tooltip title="Atras">
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => navigate("/catalogos/moneda-venta")}
            >
              <ArrowBackIcon style={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid size={3}>
          <h1 style={{ marginTop: 0 }}>Moneda de Venta</h1>
        </Grid>
        <Grid size={8} />
        <Grid size={3}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Moneda de Venta"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nombre && Boolean(errors.nombre)}
            helperText={touched.nombre && errors.nombre}
            autoFocus
          />
        </Grid>
        <Grid size={9} />

        <Grid size={2} sx={{ marginTop: 4 }}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Guardar
            <SaveIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Grid>
        <Grid size={1} />
      </Grid>
    </form>
  );
};
