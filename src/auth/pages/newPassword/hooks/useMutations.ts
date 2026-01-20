import { useMutation } from "@tanstack/react-query";
import { newPasswordAction } from "../../../services/newPassword.action";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../lib/axiosError";

interface Props {
  navigate: (path: string) => void;
}

export const useMutations = ({ navigate }: Props) => {
  const newPasswordMutation = useMutation({
    mutationFn: newPasswordAction,
    onSuccess: () => {
      toast.success("Contraseña actualizada");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(axiosErrorMessage(error, "Error al cambiar la contraseña"));
    },
  });

  return { newPasswordMutation };
};
