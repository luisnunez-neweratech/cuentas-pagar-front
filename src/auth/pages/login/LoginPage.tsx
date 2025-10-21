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
  } = useLoginPage();

  return (
    <div className="signInContainer">
      <Paper style={{ padding: 16 }}>
        <Typography component="h1" variant="h5">
          Sign in
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
            id="rfc"
            label="RFC"
            name="rfc"
            value={values.rfc}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rfc && Boolean(errors.rfc)}
            helperText={touched.rfc && errors.rfc}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
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
              values.password.length === 0 || values.rfc.length === 0
                ? true
                : false
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid style={{ marginTop: 8 }}>
              <Link to="/auth/recover">Forgot password?</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
