import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#002c69",
      light: "#7089bb",
      // dark: purple[700],
      contrastText: "#fff", // Optional: define text color that contrasts with the main color
    },
    secondary: {
      main: "#006069",
    },
    // ... other palette options
  },
  // ... other theme options like typography, spacing, etc.
});
