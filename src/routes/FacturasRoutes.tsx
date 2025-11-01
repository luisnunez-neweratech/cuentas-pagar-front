import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import { ProveedoresPage } from "../dashboard/pages/proveedores/ProveedoresPage";
import { ProveedorContratoPage } from "../dashboard/pages/proveedor/contrato/ProveedorContratoPage";
import { ProveedorOcasionalPage } from "../dashboard/pages/proveedor/ocasional/ProveedorOcasionalPage";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { NewPasswordPage } from "../auth/pages/newPassword/NewPassword";
import { RecoverPasswordPage } from "../auth/pages/recoverPassword/RecoverPassword";
import { RecoverTokenPage } from "../auth/pages/recoverToken/RecoverToken";
import { CatalogosPage } from "../dashboard/pages/catalogos/CatalogosPage";
import { GirosListPage } from "../dashboard/pages/catalogos/giros/GirosListPage";
import { Giro } from "../dashboard/pages/catalogos/giros/giro/Giro";

const AuthLayout = lazy(() => import("../auth/layouts/AuthLayout"));
const DashboardLayout = lazy(
  () => import("../dashboard/layouts/DashboardLayout")
);

export const FacturasRoutes = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="proveedor">
          <Route index element={<ProveedoresPage />} />
          <Route path=":id" element={<ProveedorOcasionalPage />} />
          <Route path="nuevo-contrato" element={<ProveedorContratoPage />} />
          <Route path="nuevo-ocasional" element={<ProveedorOcasionalPage />} />
        </Route>
        <Route path="catalogos">
          <Route index element={<CatalogosPage />} />
          <Route path="giros">
            <Route index element={<GirosListPage />} />
            <Route path="nuevo" element={<Giro />} />
            <Route path=":id" element={<Giro />} />
          </Route>
        </Route>
      </Route>

      {/* auth routes */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="recover" element={<RecoverPasswordPage />} />
        <Route path="token" element={<RecoverTokenPage />} />
        <Route path="new-password" element={<NewPasswordPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};
