import { useState } from "react";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useFormik } from "formik";
import { validationFisicoSchema } from "../Validations";
import type { StepContrato } from "../../../../interface/stepContrato";
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
  //addColaboradoresProveedor,
} from "../../../../services/proveedor.perfil.service";
import { TipoDocumentoProveedor } from "../../../../services/interfaces/TipoDocumentoProveedor";
import { useParams } from "react-router";

export const useContrato = () => {
  const { id: idParams } = useParams();
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );
  const getStepContrato = useProveedorContratoStore(
    (state) => state.getStepContrato
  );
  const stepContrato = useProveedorContratoStore((state) => state.stepContrato);
  const setStepContrato = useProveedorContratoStore(
    (state) => state.setStepContrato
  );

  const getColaboradoresValidos = useColaboradorMoralStore(
    (state) => state.getColaboradoresValidos
  );

  const getValidScreen = useContratoStore((state) => state.getValidScreen);

  const stateContrato = useProveedorContratoStore((state) => state);

  const [contrato, setContrato] = useState<boolean>(stepContrato?.contractor!);
  const [propuesta, setPropuesta] = useState<boolean>(false);

  const [tipoArchivos, setTipoArchivos] = useState<number>(0);
  const [checkContractor, setCheckContractor] = useState<boolean>(
    getStepContrato()?.contractor ?? false
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

  //TODO para la edicion de datos contrato moral
  /* const createColaboradorMutation = useMutation({
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
  }); */

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

  const createMutation = useMutation({
    mutationFn: addProveedorContrato,
    onSuccess: (_data) => {
      //toNextStep();
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
    /* if (id) {
      return {
        tipoEntidad: proveedorOcasional!.tipoEntidad,
        
      };
    } */
    const stepContrato = getStepContrato();

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
        const prevStepContrato = getStepContrato();
        const stepContrato: StepContrato = {
          ...prevStepContrato,
          noColaborador: checkContractor ? values.noColaborador : "",
          contractor: checkContractor,
          documentos: prevStepContrato?.documentos!,
        };
        setStepContrato(stepContrato);

        if (getValidScreen()) {
          if (!stepContrato.documentos.principal.id) {
            // crear documento principal
            createMutation.mutate({
              postContratoPayload: {
                startDate: new Date(
                  stepContrato.documentos.principal.fechaInicio
                ),
                endDate: stepContrato.documentos.principal.fechaFin
                  ? new Date(stepContrato.documentos.principal.fechaFin)
                  : null,
                indefiniteEnd: stepContrato.documentos.principal.indeterminado,
                isNEContractor: stepContrato?.noColaborador?.length
                  ? true
                  : false,
                nePersonType: TipoPersona.Fisica.label,
                neCollaboratorNumber: stepContrato?.noColaborador ?? null,
              },
              supplierId: stateContrato.id?.toString()!,
            });
          } else {
            // click en modificar
            if (clickedBy === 1) {
              // actualizar documento principal con post
            }
          }

          //agregar documento csf
          if (!stepContrato?.documentos.csf.id) {
            createDocumentoMutation.mutate({
              postDocumentoProveedor: {
                documentType: TipoDocumentoProveedor.CSF,
                file: stepContrato?.documentos.csf.fileValue!,
              },
              supplierId: stateContrato.id?.toString()!,
            });
          } else {
            // click en modificar
            if (clickedBy === 1) {
              // actualizar con post
            }
          }

          //agregar documento IdRepLegal
          if (!stepContrato?.documentos.idRepLegal.id) {
            createDocumentoMutation.mutate({
              postDocumentoProveedor: {
                documentType: TipoDocumentoProveedor.IdRepLegal,
                file: stepContrato?.documentos.idRepLegal.fileValue!,
              },
              supplierId: stateContrato.id?.toString()!,
            });
          } else {
            // click en modificar
            if (clickedBy === 1) {
              // actualizar con post
            }
          }

          if (!stepContrato?.documentos.compDomicilio.id) {
            //agregar documento CompDom
            createDocumentoMutation.mutate({
              postDocumentoProveedor: {
                documentType: TipoDocumentoProveedor.CompDom,
                file: stepContrato?.documentos.compDomicilio.fileValue!,
              },
              supplierId: stateContrato.id?.toString()!,
            });
          } else {
            // click en modificar
            if (clickedBy === 1) {
              // actualizar con post
            }
          }

          //agregar documento PoderRep
          if (
            stepContrato?.documentos.poderRepLegal.fileValue &&
            !stepContrato?.documentos.poderRepLegal.id
          ) {
            createDocumentoMutation.mutate({
              postDocumentoProveedor: {
                documentType: TipoDocumentoProveedor.PoderRep,
                file: stepContrato?.documentos.poderRepLegal.fileValue!,
              },
              supplierId: stateContrato.id?.toString()!,
            });
          } else if (
            stepContrato?.documentos.poderRepLegal.fileValue &&
            stepContrato?.documentos.poderRepLegal.id
          ) {
            if (clickedBy === 1) {
              // actualizar con post
              //TODO despues de validar todos ir la siguiente paso
              console.log("1");
              //toNextStep();
            } else {
              //TODO despues de validar todos ir la siguiente paso
              //toNextStep();
              console.log("2");
            }
          } else {
            if (clickedBy === 1) {
              // actualizar con post
              toast.success("Información Actualizada");
            } else {
              handleNext();
            }
          }
        }
      } else {
        //moral
        if (!checkContractor) {
          // no se valida colaboradores y es limpia la propiedad
          const prevStepContrato = getStepContrato();
          const newStepContrato: StepContrato = {
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
          };
          setStepContrato(newStepContrato);
          if (getValidScreen()) {
            if (clickedBy === 1 || (clickedBy === 0 && !idParams)) {
              // moral sin colaboradores
              createMutation.mutate({
                postContratoPayload: {
                  startDate: new Date(
                    newStepContrato.documentos.principal.fechaInicio
                  ),
                  endDate: newStepContrato.documentos.principal.fechaFin
                    ? new Date(newStepContrato.documentos.principal.fechaFin)
                    : null,
                  indefiniteEnd:
                    newStepContrato.documentos.principal.indeterminado,
                  isNEContractor: newStepContrato?.noColaborador?.length
                    ? true
                    : false,
                  nePersonType: TipoPersona.Moral.label,
                  neCollaboratorNumber: newStepContrato?.noColaborador ?? null,
                },
                supplierId: stateContrato.id?.toString()!,
              });

              //agregar documento csf
              createDocumentoMutation.mutate({
                postDocumentoProveedor: {
                  documentType: TipoDocumentoProveedor.CSF,
                  file: stepContrato?.documentos.csf.fileValue!,
                },
                supplierId: stateContrato.id?.toString()!,
              });

              //agregar documento IdRepLegal
              createDocumentoMutation.mutate({
                postDocumentoProveedor: {
                  documentType: TipoDocumentoProveedor.IdRepLegal,
                  file: stepContrato?.documentos.idRepLegal.fileValue!,
                },
                supplierId: stateContrato.id?.toString()!,
              });

              //agregar documento CompDom
              createDocumentoMutation.mutate({
                postDocumentoProveedor: {
                  documentType: TipoDocumentoProveedor.CompDom,
                  file: stepContrato?.documentos.compDomicilio.fileValue!,
                },
                supplierId: stateContrato.id?.toString()!,
              });

              //agregar documento PoderRep
              if (stepContrato?.documentos.poderRepLegal.fileValue) {
                createDocumentoMutation.mutate({
                  postDocumentoProveedor: {
                    documentType: TipoDocumentoProveedor.PoderRep,
                    file: stepContrato?.documentos.poderRepLegal.fileValue!,
                  },
                  supplierId: stateContrato.id?.toString()!,
                });
              }
            } else {
              //clicked next?
              handleNext();
            }
          }
        } else {
          if (getColaboradoresValidos()) {
            const prevStepContrato = getStepContrato();
            const newStepContrato: StepContrato = {
              ...prevStepContrato,
              noColaborador: "",
              contractor: checkContractor,
              colaboradores: stepContrato?.colaboradores,
              documentos: prevStepContrato?.documentos!,
            };
            setStepContrato(newStepContrato);
            if (getValidScreen()) {
              if (clickedBy === 1 || (clickedBy === 0 && !idParams)) {
                // moral con colaboradores
                createMutation.mutate({
                  postContratoPayload: {
                    startDate: new Date(
                      newStepContrato.documentos.principal.fechaInicio
                    ),
                    endDate: newStepContrato.documentos.principal.fechaFin
                      ? new Date(newStepContrato.documentos.principal.fechaFin)
                      : null,
                    indefiniteEnd:
                      newStepContrato.documentos.principal.indeterminado,
                    isNEContractor: checkContractor, // TODO revisar con helio este dato
                    nePersonType: TipoPersona.Moral.label,
                    neCollaboratorNumber:
                      newStepContrato?.noColaborador ?? null,
                  },
                  supplierId: stateContrato.id?.toString()!,
                });

                //agregar documento csf
                createDocumentoMutation.mutate({
                  postDocumentoProveedor: {
                    documentType: TipoDocumentoProveedor.CSF,
                    file: stepContrato?.documentos.csf.fileValue!,
                  },
                  supplierId: stateContrato.id?.toString()!,
                });

                //agregar documento IdRepLegal
                createDocumentoMutation.mutate({
                  postDocumentoProveedor: {
                    documentType: TipoDocumentoProveedor.IdRepLegal,
                    file: stepContrato?.documentos.idRepLegal.fileValue!,
                  },
                  supplierId: stateContrato.id?.toString()!,
                });

                //agregar documento CompDom
                createDocumentoMutation.mutate({
                  postDocumentoProveedor: {
                    documentType: TipoDocumentoProveedor.CompDom,
                    file: stepContrato?.documentos.compDomicilio.fileValue!,
                  },
                  supplierId: stateContrato.id?.toString()!,
                });

                //agregar documento PoderRep
                if (stepContrato?.documentos.poderRepLegal.fileValue) {
                  createDocumentoMutation.mutate({
                    postDocumentoProveedor: {
                      documentType: TipoDocumentoProveedor.PoderRep,
                      file: stepContrato?.documentos.poderRepLegal.fileValue!,
                    },
                    supplierId: stateContrato.id?.toString()!,
                  });
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

  const onClickContrato = () => {
    if (contrato) {
      setContrato(false);
      setPropuesta(true);
    } else {
      setContrato(true);
      setPropuesta(false);
    }
  };

  const onClickPropuesta = () => {
    if (propuesta) {
      setPropuesta(false);
      setContrato(true);
    } else {
      setPropuesta(true);
      setContrato(false);
    }
  };

  const handleChangeTipoArchivo = (index: any) => {
    setTipoArchivos(index === tipoArchivos ? null : index); // Toggle selection
  };

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
    contrato,
    onClickContrato,
    propuesta,
    onClickPropuesta,
    handleChangeTipoArchivo,
    tipoArchivos,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    checkContractor,
    setCheckContractor,
    onChangeContractor,
    validateDocuments,
    onClickNext,
    disableButtons,
    id: idParams,
    setClickedBy,
    validateColaboradores,
  };
};
