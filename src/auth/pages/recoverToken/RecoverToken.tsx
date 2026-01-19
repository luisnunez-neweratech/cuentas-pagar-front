import { Button, Paper, TextField, Typography } from "@mui/material";
import "./recoverTokenStyle.css";
import { useRecoverToken } from "./hooks/useRecoverToken";

export const RecoverTokenPage = () => {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useRecoverToken();

  return (
    <div className="recoverPasswordContainer">
      <Paper style={{ padding: 16 }}>
        <Typography component="h1" variant="h5">
          Recuperar Contraseña
        </Typography>
        <p>
          Revisa tu correo electrónico para ver si tienes un token de
          verificación. Ingresalo en el campo de abajo para continuar con la
          solicitud.
        </p>
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
            id="token"
            label="Token"
            name="token"
            autoFocus
            value={values.token}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.token && Boolean(errors.token)}
            helperText={touched.token && errors.token}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!(values.token.length > 0)}
          >
            Restablecer Contraseña
          </Button>
        </form>
      </Paper>
    </div>
  );
};
