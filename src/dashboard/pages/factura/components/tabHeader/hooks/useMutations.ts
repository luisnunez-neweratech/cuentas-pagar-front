import { useMutation } from "@tanstack/react-query";
import {
  addFacturaDetalle,
  addFacturaHeader,
  updateFacturaDetalle,
  updateFacturaHeader,
  uploadFacturaFiles,
} from "../../../services/factura.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useFacturaStore } from "../../../store/Factura.store";
import { postFacturaComment } from "../../../../../../services/Comments";

interface Props {
  handleDisableButtons: (value: boolean) => void;
  navigate: (any: any) => void;
}

export const useMutations = ({ handleDisableButtons, navigate }: Props) => {
  const setFacturaId = useFacturaStore((state) => state.setFacturaId);
  const stateFactura = useFacturaStore((state) => state);

  const createMutationDetalle = useMutation({
    mutationFn: addFacturaDetalle,
    onSuccess: () => {
      toast.success("Factura creada correctamente");
      handleDisableButtons(false);
      navigate("/facturas");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data);
          return;
        }
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el detalle de la factura");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const uploadDocumentosMutation = useMutation({
    mutationFn: uploadFacturaFiles,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al subir los documentos");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addFacturaHeader,
    onSuccess: (data) => {
      setFacturaId(data.data.id); //id header creado, por si falla el detalle usar este id
      const newDetalles = (stateFactura.facturaDetalle ?? []).map((detalle) => {
        return {
          id: 0,
          lineNumber: 0,
          quantity: +detalle.cantidad,
          productServiceKey: detalle.codigo.toString(),
          concept: detalle.concepto.toString(),
          unitPrice: +detalle.precio,
          lineDiscount: 0,
          lineTotal: +detalle.total,
          uofMId: detalle.uMedida,
        };
      });
      createMutationDetalle.mutate({
        invoiceId: data.data.id,
        postFacturaDetallePayload: newDetalles,
      });

      if (
        stateFactura.xmlFileValue ||
        stateFactura.pdfFileValue ||
        stateFactura.paymentProofFileValue
      ) {
        uploadDocumentosMutation.mutate({
          facturaId: data.data.id,
          xml: stateFactura.xmlFileValue,
          pdf: stateFactura.pdfFileValue,
          paymentProof: stateFactura.paymentProofFileValue,
        });
      }
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data);
          return;
        }
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar la factura");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const updateHeaderMutation = useMutation({
    mutationFn: updateFacturaHeader,
    onSuccess: (_data, variables) => {
      if (variables.putFacturaHeaderPayload.commentText && variables.putFacturaHeaderPayload.commentText.trim() !== "") {
        addFacturaComment.mutate({
          invoiceId: variables.invoiceId,
          commentText: variables.putFacturaHeaderPayload.commentText,
        });
      }
      //toast.success("Factura actualizada correctamente");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar la factura");
      return;
    },
    onSettled: () => {
      //handleDisableButtons(false);
    },
  });

  const updateMutationDetalle = useMutation({
    mutationFn: updateFacturaDetalle,
    onSuccess: () => {
      toast.success("Factura actualizada correctamente");
      navigate("/facturas");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data);
          return;
        }
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el detalle de la factura");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const addFacturaComment = useMutation({
    mutationFn: postFacturaComment,
    onSuccess: () => {
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data);
          return;
        }
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar comentario");
      return;
    },
    onSettled: () => {

    },
  });

  return {
    createMutationDetalle,
    uploadDocumentosMutation,
    createMutation,
    updateHeaderMutation,
    updateMutationDetalle,
    addFacturaComment
  };
};
