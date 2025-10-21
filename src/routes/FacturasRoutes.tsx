import { Navigate, Route, Routes } from "react-router";
import { DashboardLayout } from "../dashboard/layouts/DashboardLayout";
import { ProveedoresPage } from "../dashboard/pages/proveedores/ProveedoresPage";
import { NuevoProveedorPage } from "../dashboard/pages/nuevoProveedor/NuevoProveedorPage";
import AuthLayout from "../auth/layouts/AuthLayout";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { NewPasswordPage } from "../auth/pages/newPassword/NewPassword";
import { RecoverPasswordPage } from "../auth/pages/recoverPassword/RecoverPassword";
import { RecoverTokenPage } from "../auth/pages/recoverToken/RecoverToken";

export const FacturasRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="recover" element={<RecoverPasswordPage />} />
        <Route path="token" element={<RecoverTokenPage />} />
        <Route path="new-password" element={<NewPasswordPage />} />
      </Route>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="proveedor">
          <Route index element={<ProveedoresPage />} />
          <Route path="nuevo" element={<NuevoProveedorPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};
