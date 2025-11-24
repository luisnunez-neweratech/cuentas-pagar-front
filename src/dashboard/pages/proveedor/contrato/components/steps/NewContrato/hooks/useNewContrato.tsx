import { useState } from "react";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useFormik } from "formik";
import { validationFisicoSchema } from "../Validations";
import type { NewStepContrato } from "../../../../interface/stepContrato";
import { useColaboradorMoralStore } from "../store/ColaboradorMoral.store";
import { TipoPersona } from "../../../../../interfaces/TipoPersona";
import { useContratoStore } from "../store/Contrato.store";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";
import {
  addProveedorContrato,
  addDocumentoProveedor,
  addDocumentoPrincipalProveedor,
  addColaboradoresProveedor,
  //addColaboradoresProveedor,
} from "../../../../services/proveedor.perfil.service";
//import { TipoDocumentoProveedor } from "../../../../services/interfaces/TipoDocumentoProveedor";
import { useParams } from "react-router";
import { useDocumentoPrincipalStore } from "../store/DocumentoPrincipal.store";

export const useNewContrato = () => {
  const { id: idParams } = useParams();
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );
  const getNewStepContrato = useProveedorContratoStore(
    (state) => state.getNewStepContrato
  );
  const newStepContrato = useProveedorContratoStore(
    (state) => state.newStepContrato
  );
  const setNewStepContrato = useProveedorContratoStore(
    (state) => state.setNewStepContrato
  );

  const getColaboradoresValidos = useColaboradorMoralStore(
    (state) => state.getColaboradoresValidos
  );

  const getValidScreen = useContratoStore((state) => state.getValidScreen);

  const stateContrato = useProveedorContratoStore((state) => state);

  const stateArchivoPrincipal = useDocumentoPrincipalStore((state) => state);

  const [checkContractor, setCheckContractor] = useState<boolean>(
    getNewStepContrato()?.contractor ?? false
  );

  const [validateDocuments, doValidateDocuments] = useState<number>(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const [clickedBy, setClickedBy] = useState<number>(0);
  const [validateColaboradores, doValidateColaboradores] = useState<number>(0);

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const toNextStep = () => {
    toast.success("Información Actualizada");
    handleNext();
  };

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
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addProveedorContrato,
    onSuccess: (data, variables) => {
      //toNextStep();

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
              stateArchivoPrincipal.tipoDocumento === 0 ? false : true,
            isMainDocument:
              stateArchivoPrincipal.tipoDocumento === 0
                ? true
                : stateArchivoPrincipal.isPrincipal,
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
              //agregar propuesta o anexo a nuevo contrato
              createDocumentoPrincipalMutation.mutate({
                postDocumentoPrincipalProveedor: {
                  documentType: documento.tipoDocumento === 4 ? 2 : 1, // 2 propuesta, 1 anexo
                  isProposal: false,
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

  //TODO para la edicion de datos contrato moral
  /*
      const createMutationMoral = useMutation({
        mutationFn: addProveedorContrato,
        onSuccess: (data) => {
          if (
            checkContractor &&
            getStepPerfil()?.tipoPersona === TipoPersona.Moral.value
          ) {
            //addColaboradoresProveedor
            stepContrato?.colaboradores?.map((colaborador) => {
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
    
          toNextStep();
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
      */

  const initialFormValues = () => {
    const stepContrato = getNewStepContrato();

    return {
      noColaborador: stepContrato?.noColaborador
        ? stepContrato?.noColaborador
        : " ",
      contractor: stepContrato?.contractor,
      colaboradores: stepContrato?.colaboradores,
      documentos: stepContrato?.documentos,
    };
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialFormValues(),
    validationSchema:
      getStepPerfil()?.tipoPersona === TipoPersona.Fisica.value
        ? validationFisicoSchema
        : null,
    onSubmit: async (values) => {
      //validate files
      doValidateColaboradores(validateColaboradores + 1);
      doValidateDocuments(validateDocuments + 1);

      if (getStepPerfil()?.tipoPersona === TipoPersona.Fisica.value) {
        //type fisico
        const prevStepContrato = getNewStepContrato();
        const stepContrato: NewStepContrato = {
          ...prevStepContrato,
          noColaborador: checkContractor ? values.noColaborador : "",
          contractor: checkContractor,
          documentos: prevStepContrato?.documentos!,
          historialDocumentos: prevStepContrato?.historialDocumentos!,
          listaContratos: prevStepContrato?.listaContratos ?? [],
        };
        setNewStepContrato(stepContrato);
        if (getValidScreen()) {
          if (clickedBy === 1 || (clickedBy === 0 && !idParams)) {
            if (stateArchivoPrincipal.file) {
              // crear contrato
              createMutation.mutate({
                postContratoPayload: {
                  startDate: new Date(stateArchivoPrincipal.fechaInicio),
                  endDate: !stateArchivoPrincipal.indeterminado
                    ? new Date(stateArchivoPrincipal.fechaFin!)
                    : null,
                  indefiniteEnd: stateArchivoPrincipal.indeterminado,
                  isNEContractor: stepContrato?.noColaborador?.length
                    ? true
                    : false,
                  nePersonType: TipoPersona.Fisica.label,
                  neCollaboratorNumber: stepContrato?.noColaborador ?? null,
                },
                supplierId: stateContrato.id?.toString()!,
                documentos: stepContrato.documentos,
              });
            }

            //agrega documentos
            stepContrato.documentos.map((documento) => {
              if (documento.fileValue) {
                if (documento.tipoDocumento < 4) {
                  createDocumentoMutation.mutate({
                    postDocumentoProveedor: {
                      documentType: documento.tipoDocumento,
                      file: documento.fileValue,
                      fechaInicio: documento.fechaInicio,
                      fechaVencimiento: documento.fechaFin ?? null,
                      esIndeterminado: documento.indeterminado,
                    },
                    supplierId: stateContrato.id?.toString()!,
                  });
                } else if (documento.perteneceContratoId !== 0) {
                  // existe ya el contrato
                  //agregar propuesta o anexo
                  createDocumentoPrincipalMutation.mutate({
                    postDocumentoPrincipalProveedor: {
                      documentType: documento.tipoDocumento === 4 ? 2 : 1, // 2 propuesta, 1 anexo
                      isProposal: false,
                      isMainDocument: false,
                      fechaInicio: documento.fechaInicio,
                      fechaVencimiento: documento.fechaFin ?? "",
                      esIndeterminado: documento.indeterminado,
                      file: documento.fileValue,
                    },
                    contractId: documento.perteneceContratoId!.toString(),
                  });
                }
              }
            });
            if (clickedBy === 1) {
              toast.success("Información Actualizada");
            } else {
              toNextStep();
            }
          } else {
            handleNext();
          }
        }
      } else {
        //moral
        if (!checkContractor) {
          // no se valida colaboradores y es limpia la propiedad
          const prevStepContrato = getNewStepContrato();
          const newStepContrato: NewStepContrato = {
            ...prevStepContrato,
            noColaborador: "",
            contractor: checkContractor,
            colaboradores: [
              {
                id: 1,
                valido: false,
                nombre: "",
                noColaborador: "",
                fechaFin: "",
                fechaInicio: "",
                status: true,
              },
            ],
            //obtener documentos
            documentos: prevStepContrato?.documentos!,
            historialDocumentos: prevStepContrato?.historialDocumentos!,
            listaContratos: prevStepContrato?.listaContratos ?? [],
          };
          setNewStepContrato(newStepContrato);
          if (getValidScreen()) {
            if (clickedBy === 1 || (clickedBy === 0 && !idParams)) {
              // moral sin colaboradores
              if (stateArchivoPrincipal.file) {
                createMutation.mutate({
                  postContratoPayload: {
                    startDate: new Date(stateArchivoPrincipal.fechaInicio),
                    endDate: !stateArchivoPrincipal.indeterminado
                      ? new Date(stateArchivoPrincipal.fechaFin!)
                      : null,
                    indefiniteEnd: stateArchivoPrincipal.indeterminado,
                    isNEContractor: newStepContrato?.noColaborador?.length
                      ? true
                      : false,
                    nePersonType: TipoPersona.Moral.label,
                    neCollaboratorNumber:
                      newStepContrato?.noColaborador ?? null,
                  },
                  supplierId: stateContrato.id?.toString()!,
                  documentos: newStepContrato.documentos,
                });
              }

              //agrega documentos
              newStepContrato.documentos.map((documento) => {
                if (documento.fileValue) {
                  if (documento.tipoDocumento < 4) {
                    createDocumentoMutation.mutate({
                      postDocumentoProveedor: {
                        documentType: documento.tipoDocumento,
                        file: documento.fileValue,
                        fechaInicio: documento.fechaInicio,
                        fechaVencimiento: documento.fechaFin ?? null,
                        esIndeterminado: documento.indeterminado,
                      },
                      supplierId: stateContrato.id?.toString()!,
                    });
                  } else if (documento.perteneceContratoId !== 0) {
                    // existe ya el contrato
                    //agregar propuesta o anexo
                    createDocumentoPrincipalMutation.mutate({
                      postDocumentoPrincipalProveedor: {
                        documentType: documento.tipoDocumento === 4 ? 2 : 1, // 2 propuesta, 1 anexo
                        isProposal: false,
                        isMainDocument: false,
                        fechaInicio: documento.fechaInicio,
                        fechaVencimiento: documento.fechaFin ?? "",
                        esIndeterminado: documento.indeterminado,
                        file: documento.fileValue,
                      },
                      contractId: documento.perteneceContratoId!.toString(),
                    });
                  }
                }
              });

              if (clickedBy === 1) {
                toast.success("Información Actualizada");
              } else {
                toNextStep();
              }
            } else {
              handleNext();
            }
          }
        } else {
          if (getColaboradoresValidos()) {
            const prevStepContrato = getNewStepContrato();
            const _newStepContrato: NewStepContrato = {
              ...prevStepContrato,
              noColaborador: "",
              contractor: checkContractor,
              colaboradores: newStepContrato?.colaboradores,
              documentos: prevStepContrato?.documentos!,
              historialDocumentos: prevStepContrato?.historialDocumentos!,
              listaContratos: prevStepContrato?.listaContratos ?? [],
            };
            setNewStepContrato(_newStepContrato);
            if (getValidScreen()) {
              if (clickedBy === 1 || (clickedBy === 0 && !idParams)) {
                // moral con colaboradores
                if (stateArchivoPrincipal.file) {
                  createMutation.mutate({
                    postContratoPayload: {
                      startDate: new Date(stateArchivoPrincipal.fechaInicio),
                      endDate: !stateArchivoPrincipal.indeterminado
                        ? new Date(stateArchivoPrincipal.fechaFin!)
                        : null,
                      indefiniteEnd: stateArchivoPrincipal.indeterminado,
                      isNEContractor: checkContractor,
                      nePersonType: TipoPersona.Moral.label,
                      neCollaboratorNumber:
                        newStepContrato?.noColaborador ?? null,
                    },
                    supplierId: stateContrato.id?.toString()!,
                    documentos: newStepContrato?.documentos,
                  });
                }

                //agrega documentos
                newStepContrato?.documentos.map((documento) => {
                  if (documento.fileValue) {
                    if (documento.tipoDocumento < 4) {
                      createDocumentoMutation.mutate({
                        postDocumentoProveedor: {
                          documentType: documento.tipoDocumento,
                          file: documento.fileValue,
                          fechaInicio: documento.fechaInicio,
                          fechaVencimiento: documento.fechaFin ?? null,
                          esIndeterminado: documento.indeterminado,
                        },
                        supplierId: stateContrato.id?.toString()!,
                      });
                    } else if (documento.perteneceContratoId !== 0) {
                      // existe ya el contrato
                      //agregar propuesta o anexo
                      createDocumentoPrincipalMutation.mutate({
                        postDocumentoPrincipalProveedor: {
                          documentType: documento.tipoDocumento === 4 ? 2 : 1, // 2 propuesta, 1 anexo
                          isProposal: false,
                          isMainDocument: false,
                          fechaInicio: documento.fechaInicio,
                          fechaVencimiento: documento.fechaFin ?? "",
                          esIndeterminado: documento.indeterminado,
                          file: documento.fileValue,
                        },
                        contractId: documento.perteneceContratoId!.toString(),
                      });
                    }
                  }
                });

                if (clickedBy === 1) {
                  toast.success("Información Actualizada");
                } else {
                  toNextStep();
                }
              } else {
                handleNext();
              }
            }
          }
        }
      }
    },
  });

  const onChangeContractor = () => {
    setFieldValue("noColaborador", !checkContractor ? "" : " ");
    setCheckContractor(!checkContractor);
  };

  const onClickNext = () => {
    setClickedBy(0);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    handleBack,
    getStepPerfil,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    checkContractor,
    onChangeContractor,
    onClickNext,
    disableButtons,
    id: idParams,
    setClickedBy,
    validateColaboradores,
    validateDocuments,
  };
};
