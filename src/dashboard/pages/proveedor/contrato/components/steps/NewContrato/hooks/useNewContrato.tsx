import { useEffect, useState } from "react";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useFormik } from "formik";
import { validationFisicoSchema } from "../Validations";
import type {
  HistorialDocumentos,
  ListaContratos,
  NewStepContrato,
} from "../../../../interface/stepContrato";
import { useColaboradorMoralStore } from "../store/ColaboradorMoral.store";
import { TipoPersona } from "../../../../../interfaces/TipoPersona";
import { useContratoStore } from "../store/Contrato.store";
import { toast } from "sonner";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";
import { useParams } from "react-router";
import { useDocumentoPrincipalStore } from "../store/DocumentoPrincipal.store";
import { useNewContratoQueries } from "./useNewContratoQueries";
import { useNewContratoMutations } from "./useNewContratoMutations";

export const useNewContrato = () => {
  const { id: idParams } = useParams();
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil,
  );
  const getNewStepContrato = useProveedorContratoStore(
    (state) => state.getNewStepContrato,
  );
  const newStepContrato = useProveedorContratoStore(
    (state) => state.newStepContrato,
  );
  const setNewStepContrato = useProveedorContratoStore(
    (state) => state.setNewStepContrato,
  );

  const getColaboradoresValidos = useColaboradorMoralStore(
    (state) => state.getColaboradoresValidos,
  );

  const getValidScreen = useContratoStore((state) => state.getValidScreen);

  const stateContrato = useProveedorContratoStore((state) => state);

  const stateArchivoPrincipal = useDocumentoPrincipalStore((state) => state);

  const [checkContractor, setCheckContractor] = useState<boolean>(
    getNewStepContrato()?.contractor ?? false,
  );

  const [validateDocuments, doValidateDocuments] = useState<number>(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const [clickedBy, setClickedBy] = useState<number>(0);
  const [validateColaboradores, doValidateColaboradores] = useState<number>(0);
  const [actualizarHistorial, setActualizarHistorial] =
    useState<boolean>(false);

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const toNextStep = () => {
    toast.success("Información Actualizada");
    handleNext();
  };

  const {
    createDocumentoMutation,
    createDocumentoPrincipalMutation,
    updateContratoInfo,
    createMutation,
  } = useNewContratoMutations({
    handleDisableButtons,
    setActualizarHistorial,
    checkContractor,
  });

  const initialFormValues = () => {
    const stepContrato = getNewStepContrato();

    return {
      noColaborador: stepContrato?.noColaborador
        ? stepContrato?.noColaborador
        : " ",
      contractor: stepContrato?.contractor,
      colaboradores: stepContrato?.colaboradores,
      documentos: stepContrato?.documentos,
      condicionesPago: stepContrato?.condicionesPago ?? "",
    };
  };

  const { proveedorPerfil } = useNewContratoQueries({ actualizarHistorial });

  useEffect(() => {
    setActualizarHistorial(false);
    if (proveedorPerfil && proveedorPerfil.proveedorDocumentosContrato) {
      let historialDocumentos: HistorialDocumentos[] = [];
      let listaContratos: ListaContratos[] = [];

      //proveedorDocumentosContrato
      if (proveedorPerfil && proveedorPerfil.proveedorDocumentosContrato) {
        Object.entries(proveedorPerfil.proveedorDocumentosContrato).map(
          ([_key, value]: any) => {
            if (value.mainDocument) {
              listaContratos.push({
                id: value.mainDocument.contractId,
                fechaInicio: value.mainDocument.fechaInicio,
                fechaFin: value.mainDocument.fechaVencimiento,
                indeterminado: value.mainDocument.esIndeterminado,
                nombreArchivo: value.mainDocument.fileName,
              });
            }
          },
        );
      }

      // documentos normales
      proveedorPerfil &&
        proveedorPerfil.proveedorDocumentos?.map(
          (documento: any, index: number) => {
            historialDocumentos.push({
              id: index,
              fechaInicio: documento.fechaInicio,
              fechaFin: documento.fechaVencimiento,
              indeterminado: documento.esIndeterminado,
              fileUrl: documento.downloadUrl,
              fileName: documento.fileName,
              tipoDocumento:
                documento.contractDocumentType ?? documento.profileDocumentType,
            });
          },
        );

      //TODO revisar si se actualiza colaboradores morales

      setNewStepContrato({
        ...getNewStepContrato(),
        contractor: getNewStepContrato()?.contractor ?? false,
        //contractor: proveedorPerfil.contratos[0].isNEContractor,
        //noColaborador: proveedorPerfil.contratos[0].neCollaboratorNumber,
        //colaboradores: colaboradoresData,
        historialDocumentos: historialDocumentos,
        listaContratos: listaContratos,
        documentos: getNewStepContrato()?.documentos ?? [
          {
            id: 1,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true,
            fileValue: null,
            addToContrato: false,
            fileName: "",
            tipoDocumento: 0,
            newElement: true,
          },
        ],
      });
    }
  }, [proveedorPerfil]);

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
            if (stateArchivoPrincipal.file && stateArchivoPrincipal.valid) {
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
              if (
                documento.fileValue &&
                typeof documento.fileValue === "object"
              ) {
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
                      isProposal: documento.tipoDocumento === 4 ? true : false, // 2 propuesta, 1 anexo
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
              // actualizar datos de proveedor
              // TODO revisar si es el contrato activo? o el ultimo
              if (
                stepContrato.listaContratos &&
                stepContrato.listaContratos.length > 0
              ) {
                updateContratoInfo.mutate({
                  putContratoInfoPayload: {
                    id: stepContrato.id!,
                    supplierId: stateContrato.id!,
                    startDate: stepContrato.listaContratos[0].fechaInicio,
                    endDate: stepContrato.listaContratos[0].fechaFin,
                    indefiniteEnd: stepContrato.listaContratos[0].indeterminado,
                    isNEContractor: stepContrato?.noColaborador?.length
                      ? true
                      : false,
                    nePersonType: TipoPersona.Fisica.label,
                    neCollaboratorNumber: stepContrato?.noColaborador ?? "",
                  },
                });
              }

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
              if (stateArchivoPrincipal.file && stateArchivoPrincipal.valid) {
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
                if (
                  documento.fileValue &&
                  typeof documento.fileValue === "object"
                ) {
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
                        isProposal:
                          documento.tipoDocumento === 4 ? true : false, // 2 propuesta, 1 anexo
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
                if (stateArchivoPrincipal.file && stateArchivoPrincipal.valid) {
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
                  if (
                    documento.fileValue &&
                    typeof documento.fileValue === "object"
                  ) {
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
                          isProposal:
                            documento.tipoDocumento === 4 ? true : false, // 2 propuesta, 1 anexo
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
