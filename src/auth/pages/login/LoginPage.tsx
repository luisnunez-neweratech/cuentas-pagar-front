import { Button, Paper, TextField, Typography, Grid } from "@mui/material";
import { Link } from "react-router";

import { useLoginPage } from "./hooks/useLoginPage";
import "./loginStyle.css";

export const LoginPage = () => {
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isPending,
  } = useLoginPage();  

  return (
    <div className="signInContainer">
      <Paper style={{ padding: 16 }}>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
          }}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <Button
            disabled={
              (values.password.length === 0 || values.email.length === 0
                ? true
                : false) || isPending
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid style={{ marginTop: 8 }}>
              <Link to="/auth/recover">¿Olvidaste tu contraseña?</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
