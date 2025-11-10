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
  addColaboradoresProveedor,
} from "../../../../services/contrato.service";
import { TipoDocumentoProveedor } from "../../../../interfaces/TipoDocumentoProveedor";

export const useContrato = () => {
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
    onSuccess: (data) => {},
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
    onSuccess: (data) => {},
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
    onSuccess: (data) => {
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

      // revisar si es moral y tiene colaboradores para guardarlo
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
      /*  const pasoPerfil: StepPerfil = {
            tipoProveedor: "contrato",
            tipoEntidad: values.tipoEntidad,
            tipoPersona: values.tipoPersona,
            razonSocial: values.razonSocial,
            alias: values.alias,
            rfc: values.rfc,
            email: values.email,
            giroPrincipal: values.giroPrincipal,
            productos: [],
          };
          setStepPerfil(pasoPerfil); */
      //validate files
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
                  neCollaboratorNumber: newStepContrato?.noColaborador ?? null,
                },
                supplierId: stateContrato.id?.toString()!,
              });
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
  };
};
