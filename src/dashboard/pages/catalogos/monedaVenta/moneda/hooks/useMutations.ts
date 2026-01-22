import { useMutation } from "@tanstack/react-query";
import {
  addMonedaVenta,
  updateMonedaVenta,
} from "../../../services/monedaVenta.service";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../../../lib/axiosError";

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
      toast.error(axiosErrorMessage(error, "Error al agregar la Moneda de Venta"));
    },
  });

  const updateMonedaMutation = useMutation({
    mutationFn: updateMonedaVenta,
    onSuccess: () => {
      toast.success("Moneda de Ventas actualizado correctamente");
      navigate("/catalogos/moneda-venta/");
    },
    onError: (error) => {
      toast.error(axiosErrorMessage(error, "Error al actualizar la Moneda de Venta"));
    },
  });

  return {
    addMonedaMutation,
    updateMonedaMutation,
  };
};
