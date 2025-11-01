import { Button, Grid, TextField } from "@mui/material";

export const Giro = () => {
  return (
    <form
      //
      style={{
        width: "100%",
      }}
      noValidate
    >
      <Grid container>
        <Grid size={3}>
          <h1>Giro</h1>
        </Grid>
        <Grid size={9} />
        <Grid size={3}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="nombre"
            name="nombre"
            /*  value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email} */
            autoFocus
          />
        </Grid>
        <Grid size={9} />
        <Grid size={1}>
          <Button
            //onClick={guardarProovedor}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 4 }}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
