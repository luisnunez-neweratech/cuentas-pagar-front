import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import { ProveedoresPage } from "../dashboard/pages/proveedores/ProveedoresPage";
import { NuevoProveedorContactoPage } from "../dashboard/pages/nuevoProveedor/contrato/NuevoProveedorContactoPage";
import { NuevoProveedorOcasionalPage } from "../dashboard/pages/nuevoProveedor/ocasional/NuevoProveedorOcasionalPage";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { NewPasswordPage } from "../auth/pages/newPassword/NewPassword";
import { RecoverPasswordPage } from "../auth/pages/recoverPassword/RecoverPassword";
import { RecoverTokenPage } from "../auth/pages/recoverToken/RecoverToken";

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
          <Route
            path="nuevo-contrato"
            element={<NuevoProveedorContactoPage />}
          />
          <Route
            path="nuevo-ocasional"
            element={<NuevoProveedorOcasionalPage />}
          />
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
