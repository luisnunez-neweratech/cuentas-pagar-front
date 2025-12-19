import { Button, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { usePlazo } from "./hooks/usePlazo";
import SaveIcon from "@mui/icons-material/Save";

export const Plazo = () => {
  const navigate = useNavigate();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    usePlazo();

  return (
    <form
      style={{
        width: "100%",
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid size={1}>
          <Tooltip title="Atras">
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => navigate("/catalogos/plazo-pago")}
            >
              <ArrowBackIcon style={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid size={3}>
          <h1 style={{ marginTop: 0 }}>Condicion de Pago</h1>
        </Grid>
        <Grid size={8} />
        <Grid size={3}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Condicion de Pago"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nombre && Boolean(errors.nombre)}
            helperText={touched.nombre && errors.nombre}
            autoFocus
          />
        </Grid>
        <Grid size={3}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="value"
            label="Valor"
            name="value"
            value={values.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.value && Boolean(errors.value)}
            helperText={touched.value && errors.value}
            autoFocus
          />
        </Grid>
        <Grid size={6} />

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
