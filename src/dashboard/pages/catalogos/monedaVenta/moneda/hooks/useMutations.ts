import { useMutation } from "@tanstack/react-query";
import {
  addMonedaVenta,
  updateMonedaVenta,
} from "../../../services/monedaVenta.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Props {
  navigate: (path: string) => void;
}

export const useMutations = ({ navigate }: Props) => {
  const addMonedaMutation = useMutation({
    mutationFn: addMonedaVenta,
    onSuccess: () => {
      toast.success("Moneda de Venta agregado correctamente");
      navigate("/catalogos/moneda-venta/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el giro");
      return;
    },
  });

  const updateMonedaMutation = useMutation({
    mutationFn: updateMonedaVenta,
    onSuccess: () => {
      toast.success("Moneda de Ventas actualizado correctamente");
      navigate("/catalogos/moneda-venta/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el giro");
      return;
    },
  });

  return {
    addMonedaMutation,
    updateMonedaMutation,
  };
};
