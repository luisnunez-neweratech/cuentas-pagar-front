import { Button, Paper, TextField, Typography } from "@mui/material";
import "./recoverNewPasswordStyle.css";
import { useNewPassword } from "./hooks/useNewPassword";

export const NewPasswordPage = () => {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useNewPassword();

  return (
    <div className="recoverNewPasswordContainer">
      <Paper style={{ padding: 16 }}>
        <Typography component="h1" variant="h5">
          Recover password
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
            id="password"
            label="Password"
            name="password"
            type="password"
            autoFocus
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              !(values.password.length > 0 && values.newPassword.length > 0)
            }
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
};
