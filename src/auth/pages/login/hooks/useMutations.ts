import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../../../services/login.action";
import type { User } from "../../../../interfaces/user.interface";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../lib/axiosError";
import { useAuthStore } from "../../../../stores/auth/auth.store";

export const useMutations = () => {
  const loginUser = useAuthStore((state) => state.loginUser);

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (login) => {
      const { token, mail, nickName, name, colaboratorId } = login;
      //mapper
      const user: User = {
        id: colaboratorId,
        email: mail,
        fullName: name,
        roles: ["Admin"], // TODO backend regrese los roles, por ahora todos son admin
        nickName,
      };
      loginUser(token, user);
    },
    onError: (error: Error) => {
      toast.error(axiosErrorMessage(error, "Correo o contraseña incorrecta"));
    },
  });

  return {
    loginMutation,
  };
};
