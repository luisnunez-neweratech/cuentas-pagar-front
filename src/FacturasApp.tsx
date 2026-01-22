import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { FacturasRoutes } from "./routes/FacturasRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme/theme";
import { TanStackProvider } from "./plugins/TanStackProvider";
import { AxiosInterceptorComponent } from "./routes/axiosSetup";

export const FacturasApp = () => {
  return (
    <TanStackProvider>
      <BrowserRouter basename="/Accounts_Payable">
        <Toaster richColors />
        <ThemeProvider theme={customTheme}>
          <AxiosInterceptorComponent>
            <FacturasRoutes />
          </AxiosInterceptorComponent>
        </ThemeProvider>
      </BrowserRouter>
    </TanStackProvider>
  );
};
