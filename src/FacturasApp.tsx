import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { FacturasRoutes } from "./routes/FacturasRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme/theme";
import { TanStackProvider } from "./plugins/TanStackProvider";

export const FacturasApp = () => {
  return (
    <TanStackProvider>
      <BrowserRouter>
        <Toaster richColors />
        <ThemeProvider theme={customTheme}>
          <FacturasRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </TanStackProvider>
  );
};
