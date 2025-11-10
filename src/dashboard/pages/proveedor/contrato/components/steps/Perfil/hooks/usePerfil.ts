import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { validationSchema } from "../Validations";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { StepPerfil } from "../../../../interface/stepPerfil";
import type { Giro } from "../../../../../../catalogos/giros/interfaces/Giro";
import { getAllGiros } from "../../../../../../catalogos/services/giros.service";
import { TipoProveedor } from "../../../../../interfaces/TipoProveedor";
import { useState } from "react";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";
import { useParams } from "react-router";
import {
  addProveedorContratoPerfil,
  updateProveedorContratoPerfil,
} from "../../../../services/proveedor.contrato.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const usePerfil = () => {
  const { id } = useParams(); // para consulta
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const setStepPerfil = useProveedorContratoStore(
    (state) => state.setStepPerfil
  );
  const setProveedorId = useProveedorContratoStore(
    (state) => state.setProveedorId
  );
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );
  const proveedorContratoState = useProveedorContratoStore((state) => state);
  const [disableButtons, setDisableButtons] = useState(false);

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const toNextStep = (proveedorId: number) => {
    toast.success("Información Actualizada");
    const pasoPerfil: StepPerfil = {
      tipoProveedor: TipoProveedor.Contrato.value,
      tipoEntidad: +values.tipoEntidad,
      tipoPersona: +values.tipoPersona,
      razonSocial: values.razonSocial,
      alias: values.alias,
      rfc: values.rfc,
      email: values.email,
      giroPrincipal: values.giroPrincipal,
      productos: values.productos,
    };
    setStepPerfil(pasoPerfil);
    setProveedorId(proveedorId);
    handleNext();
  };

  const createMutation = useMutation({
    mutationFn: addProveedorContratoPerfil,
    onSuccess: (data) => {
      toNextStep(data.id);
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

  const updateMutation = useMutation({
    mutationFn: updateProveedorContratoPerfil,
    onSuccess: () => {
      toast.success("Informacion Actualizada");
      toNextStep(proveedorContratoState.id!);
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
    /* if (id) { // id del url setearlo en el estado para que actulize en las llamadas
      return {
        tipoEntidad: proveedorOcasional!.tipoEntidad,
        tipoPersona: proveedorOcasional!.tipoPersona,
        rfc: proveedorOcasional?.rfc ?? "",
        razonSocial: proveedorOcasional!.razonSocial,
        alias: proveedorOcasional!.alias,
        email: proveedorOcasional?.email ?? "",
        giroPrincipal: proveedorOcasional?.giroPrincipal ?? "",
        productos: proveedorOcasional?.productos, //TODO valores para los productos
      };
    } */
    const stepPerfil = getStepPerfil();

    return {
      tipoEntidad: stepPerfil ? stepPerfil.tipoEntidad : "",
      tipoPersona: stepPerfil ? stepPerfil.tipoPersona : "",
      rfc: stepPerfil ? stepPerfil.rfc : "",
      razonSocial: stepPerfil ? stepPerfil.razonSocial : "",
      alias: stepPerfil ? stepPerfil.alias : "",
      email: stepPerfil ? stepPerfil.email : "",
      giroPrincipal: stepPerfil ? stepPerfil.giroPrincipal : "",
      productos: stepPerfil ? stepPerfil.productos : [],
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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleDisableButtons(true);
      if (proveedorContratoState.id) {       
        const giroPrincipal = giros?.find(
          (giro) => giro.descripcion === values.giroPrincipal
        );
        updateMutation.mutate({
          id: proveedorContratoState.id!,
          supplierTypeId: TipoProveedor.Contrato.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values?.rfc ? values.rfc.toUpperCase().trim() : "",
          email: values?.email ? values.email.trim() : "",
          supplierActivityId: giroPrincipal?.id ?? null,
          productServiceIds:
            values.productos?.map((producto: any) => producto.id) ?? [],
        });
      } else {
        const giroPrincipal = giros?.find(
          (giro) => giro.descripcion === values.giroPrincipal
        );
        createMutation.mutate({
          supplierTypeId: TipoProveedor.Contrato.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values?.rfc ? values.rfc.toUpperCase().trim() : "",
          email: values?.email ? values.email.trim() : "",
          supplierActivityId: giroPrincipal?.id ?? null,
          productServiceIds:
            values.productos?.map((producto: any) => producto.id) ?? [],
        });
      }
    },
  });

  const onChangeAutocomplete = (newValues: Giro[]) => {
    setFieldValue("productos", newValues);
  };

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    onChangeAutocomplete,
    giros: giros ?? [],
    setFieldValue,
    disableButtons,
  };
};
