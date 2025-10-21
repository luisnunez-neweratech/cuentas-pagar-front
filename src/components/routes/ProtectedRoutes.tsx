import { useAuthStore } from "../../auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return null;

  if (authStatus === "authenticated") return <Navigate to="/" />;

  console.log('here?')

  return children;
};
