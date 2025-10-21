import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { FacturasRoutes } from "./routes/FacturasRoutes";

export const FacturasApp = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <FacturasRoutes />
    </BrowserRouter>
  );
};
