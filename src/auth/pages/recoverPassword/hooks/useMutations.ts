import { useMutation } from "@tanstack/react-query";
import { recoverPasswordAction } from "../../../services/recoverPassword.action";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  navigate: (path: string) => void;
}

export const useMutations = ({ navigate }: Props) => {
  const recoverPasswordMutation = useMutation({
    mutationFn: recoverPasswordAction,
    onSuccess: (_data, variables) => {
      navigate(`/auth/token?email=${variables.email}`);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al enviar el correo con el token");
    },
  });

  return {
    recoverPasswordMutation,
  };
};
