import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { validationSchema } from "../Validations";
import type { Giro } from "../../../catalogos/giros/interfaces/Giro";
import { useProveedorContratoStore } from "../../contrato/store/ProveedorContrato.store";
import { TipoProveedor } from "../../interfaces/TipoProveedor";
import { updateProveedorOcasional } from "../services/proveedor.contrato.service";
import { useDashboardLayoutStore } from "../../../../store/dashboardLayout.store";
import { useProveedorOcasionalStore } from "../store/ProveedorOcasional.store";
import { useQueries } from "./useQueries";
import { useMutations } from "./useMutations";

export const useProveedorOcasional = () => {
  const [contractor, setContractor] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const setStepPerfil = useProveedorContratoStore(
    (state) => state.setStepPerfil,
  );
  const setProveedorId = useProveedorContratoStore(
    (state) => state.setProveedorId,
  );
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const handleOpenModal = useProveedorOcasionalStore(
    (state) => state.handleOpenModal,
  );
  const openDeleteModal = useProveedorOcasionalStore(
    (state) => state.openDeleteModal,
  );
  const handleOpenDeleteModal = useProveedorOcasionalStore(
    (state) => state.handleOpenDeleteModal,
  );
  const handleCloseDeleteModal = useProveedorOcasionalStore(
    (state) => state.handleCloseDeleteModal,
  );

  const {
    isLoading,
    isErrorGet,
    errorGet,
    proveedorOcasional,
    giros,
    plazoPagos,
  } = useQueries({
    id,
  });

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };
  const { deleteMutation, activateMutation, createMutation, updateMutation } =
    useMutations({
      navigate,
      handleDisableButtons,
    });

  const upgradeProvedorMutation = useMutation({
    mutationFn: updateProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor actualizado correctamente");
      setProveedorId(+id!);
      setStepPerfil({
        tipoProveedor: TipoProveedor.Contrato.value,
        tipoEntidad: +values.tipoEntidad,
        tipoPersona: +values.tipoPersona,
        rfc: values.rfc,
        razonSocial: values.razonSocial,
        alias: values.alias,
        email: values.email,
        productos: values.productos,
        condicionesPago: values.condicionesPago,
      });
      navigate(`/proveedor/nuevo-contrato`);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || error.message);
        return;
      }
      toast.error("Error al actualizar el proveedor");
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const initialFormValues = () => {
    if (proveedorOcasional) {
      console.log('here ocasional?.....')
      if (proveedorOcasional.tipoProveedor === TipoProveedor.Contrato.value) {
        navigate(`/proveedor/contrato/${id}`);
      }
      setIsActive(proveedorOcasional.isActive ?? true);
      const productos = giros?.filter((obj) =>
        proveedorOcasional.productos.includes(obj.id),
      );
      return {
        tipoEntidad: proveedorOcasional.tipoEntidad,
        tipoPersona: proveedorOcasional.tipoPersona,
        rfc: proveedorOcasional.rfc,
        razonSocial: proveedorOcasional.razonSocial,
        alias: proveedorOcasional.alias ?? "",
        email: proveedorOcasional.email,
        productos: productos,
        condicionesPago: proveedorOcasional.paymentTermsId ?? "",
      };
    }
    // Buscar el ID del plazo con value 0 (Pago Inmediato) para establecerlo por defecto
    const pagoInmediatoId =
      plazoPagos?.find((plazo) => plazo.value === 0)?.id ?? "";

    return {
      tipoEntidad: "",
      tipoPersona: "",
      rfc: "",
      razonSocial: "",
      alias: "",
      email: "",
      productos: [],
      condicionesPago: pagoInmediatoId,
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
    enableReinitialize: true,
    initialValues: initialFormValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleDisableButtons(true);
      if (id) {
        updateMutation.mutate({
          id: +id,
          supplierTypeId: TipoProveedor.Ocasional.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values.rfc.toUpperCase().trim(),
          email: values.email.trim(),
          productServiceIds:
            values.productos?.map((producto: any) => producto.id) ?? [],
          paymentTermsId: Number(values.condicionesPago),
        });
      } else {
        createMutation.mutate({
          supplierTypeId: TipoProveedor.Ocasional.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values.rfc.toUpperCase().trim(),
          email: values.email.trim(),
          productServiceIds:
            values.productos?.map((producto: any) => producto.id) ?? [],
          paymentTermsId: Number(values.condicionesPago),
        });
      }
    },
  });

  const onClickBack = () => {
    navigate("/proveedor");
  };

  const onClickEliminar = () => {
    handleOpenDeleteModal();
  };

  const confirmarEliminar = () => {
    handleDisableButtons(true);
    deleteMutation.mutate(id!);
  };

  const onClickActivar = () => {
    handleDisableButtons(true);
    activateMutation.mutate(id!);
  };

  const onChangeAutocomplete = (newValues: Giro[]) => {
    setFieldValue("productos", newValues);
  };

  const openModal = () => {
    handleOpenModal();
  };

  const actualizarProveedor = () => {
    if (id) {
      handleDisableButtons(true);
      upgradeProvedorMutation.mutate({
        id: +id,
        supplierTypeId: TipoProveedor.Contrato.value,
        originId: +values.tipoEntidad,
        legalPersonTypeId: +values.tipoPersona,
        legalName: values.razonSocial.trim(),
        tradeName: values.alias.trim(),
        rfc: values.rfc.toUpperCase().trim(),
        email: values.email.trim(),
        productServiceIds:
          values.productos?.map((producto: any) => producto.id) ?? [],
        paymentTermsId: Number(values.condicionesPago),
      });
    }
  };

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isErrorGet) {
      if (errorGet instanceof AxiosError) {
        toast.error(errorGet.response?.data ?? errorGet.message);
        return;
      }
      toast.error("Error al obtener el proveedor");
    }
  }, [isErrorGet]);

  return {
    contractor,
    setContractor,
    inputRef,
    setFieldValue,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    onClickBack,
    id,
    onClickEliminar,
    onClickActivar,
    onChangeAutocomplete,
    giros: giros ?? [],
    plazoPagos,
    disableButtons,
    openModal,
    actualizarProveedor,
    openDeleteModal,
    handleCloseDeleteModal,
    confirmarEliminar,
    isActive,
  };
};
