import { useMutation } from "@tanstack/react-query";
import { verifyToken } from "../../../services/recoverToken.action";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../lib/axiosError";

interface Props {
  navigate: (path: string) => void;
  email: string;
}

export const useMutations = ({ navigate, email }: Props) => {
  const verifyTokenMutation = useMutation({
    mutationFn: verifyToken,
    onSuccess: () => {
      toast.info("Token Correcto");
      navigate(`/auth/new-password?email=${email}`);
    },
    onError: (error) => {
      toast.error(axiosErrorMessage(error, "Token incorrecto"));
    },
  });

  return {
    verifyTokenMutation,
  };
};
