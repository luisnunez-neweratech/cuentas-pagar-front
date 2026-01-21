import { useMutation } from "@tanstack/react-query";
import {
  addColaboradoresProveedor,
  addDocumentoPrincipalProveedor,
  addDocumentoProveedor,
  addProveedorContrato,
} from "../../../../services/proveedor.perfil.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { updateProveedorContratoInfo } from "../../../../services/proveedor.contrato.service";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { TipoPersona } from "../../../../../interfaces/TipoPersona";
import { useDocumentoPrincipalStore } from "../store/DocumentoPrincipal.store";

interface Props {
  handleDisableButtons: (state: boolean) => void;
  setActualizarHistorial: (state: boolean) => void;
  checkContractor: boolean;
}

export const useNewContratoMutations = ({
  handleDisableButtons,
  setActualizarHistorial,
  checkContractor,
}: Props) => {
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil,
  );

  const newStepContrato = useProveedorContratoStore(
    (state) => state.newStepContrato,
  );

  const stateArchivoPrincipal = useDocumentoPrincipalStore((state) => state);

  const createColaboradorMutation = useMutation({
    mutationFn: addColaboradoresProveedor,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el colaborador");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const createDocumentoMutation = useMutation({
    mutationFn: addDocumentoProveedor,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el documento");
      return;
    },
    onSettled: () => {
      setActualizarHistorial(true);
      handleDisableButtons(false);
    },
  });

  const createDocumentoPrincipalMutation = useMutation({
    mutationFn: addDocumentoPrincipalProveedor,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el documento");
      return;
    },
    onSettled: () => {
      setActualizarHistorial(true);
      handleDisableButtons(false);
    },
  });

  const updateContratoInfo = useMutation({
    mutationFn: updateProveedorContratoInfo,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar la información de contrato");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addProveedorContrato,
    onSuccess: (data, variables) => {
      // revisar si es moral y tiene colaboradores para guardarlo
      if (
        checkContractor &&
        getStepPerfil()?.tipoPersona === TipoPersona.Moral.value
      ) {
        //addColaboradoresProveedor
        newStepContrato?.colaboradores?.map((colaborador) => {
          createColaboradorMutation.mutate({
            contractId: data.id,
            postColaboradorPayload: {
              collaboratorNumber: colaborador.noColaborador,
              name: colaborador.nombre,
              startDate: new Date(colaborador.fechaInicio),
              tentativeEndDate: new Date(colaborador.fechaFin),
              status: colaborador.status ? "Active" : "Inactive",
            },
          });
        });
      }

      // documento principal
      if (stateArchivoPrincipal.file) {
        createDocumentoPrincipalMutation.mutate({
          postDocumentoPrincipalProveedor: {
            documentType: stateArchivoPrincipal.tipoDocumento,
            isProposal:
              stateArchivoPrincipal.tipoDocumento === 2 ? true : false,
            isMainDocument: true,
            fechaInicio: stateArchivoPrincipal.fechaInicio,
            fechaVencimiento: stateArchivoPrincipal.fechaFin ?? "",
            esIndeterminado: stateArchivoPrincipal.indeterminado,
            file: stateArchivoPrincipal.file,
          },
          contractId: data.id,
        });
      }
      // propuesta o anexo
      variables?.documentos &&
        variables?.documentos.map((documento) => {
          if (documento.fileValue && documento.tipoDocumento > 3) {
            if (documento.perteneceContratoId === 0) {
              //agregar propuesta o anexo al nuevo contrato
              createDocumentoPrincipalMutation.mutate({
                postDocumentoPrincipalProveedor: {
                  documentType: documento.tipoDocumento === 4 ? 2 : 1, // 2 propuesta, 1 anexo
                  isProposal: documento.tipoDocumento === 4 ? true : false, // 4 propuesta, 1 anexo
                  isMainDocument: false,
                  fechaInicio: documento.fechaInicio,
                  fechaVencimiento: documento.fechaFin ?? "",
                  esIndeterminado: documento.indeterminado,
                  file: documento.fileValue,
                },
                contractId: data.id,
              });
            }
          }
        });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  return {
    createDocumentoMutation,
    createDocumentoPrincipalMutation,
    updateContratoInfo,
    createMutation,
  };
};
