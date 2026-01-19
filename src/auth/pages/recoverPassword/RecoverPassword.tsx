import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import "./recoverPasswordStyle.css";
import { Link } from "react-router";
import { useRecoverPassword } from "./hooks/useRecoverPassword";

export const RecoverPasswordPage = () => {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors, isPending } =
    useRecoverPassword();

  return (
    <div className="recoverPasswordContainer">
      <Paper style={{ padding: 16 }}>
        <Typography component="h1" variant="h5">
          Recuperar Contraseña
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
            label="Correo Electrónico"
            name="email"
            type="email"
            autoFocus
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!(values.email.length > 0) || isPending}
          >
            Restablecer Contraseña
          </Button>
          <Grid container>
            <Grid style={{ marginTop: 8 }}>
              <Link to="/auth/login">Iniciar Sesión</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
