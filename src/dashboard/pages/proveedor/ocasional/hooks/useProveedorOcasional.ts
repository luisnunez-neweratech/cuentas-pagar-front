import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { validationSchema } from "../Validations";
import type { Giro } from "../../../catalogos/giros/interfaces/Giro";
import { getAllGiros } from "../../../catalogos/services/giros.service";
import { useProveedorContratoStore } from "../../contrato/store/ProveedorContrato.store";
import { TipoProveedor } from "../../interfaces/TipoProveedor";
import {
  addProveedorOcasional,
  updateProveedorOcasional,
  deleteProveedorOcasional,
  getProveedorOcasional,
} from "../services/proveedor.contrato.service";
import { useDashboardLayoutStore } from "../../../../store/dashboardLayout.store";
import { useProveedorOcasionalStore } from "../store/ProveedorOcasional.store";

export const useProveedorOcasional = () => {
  const [contractor, setContractor] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const setStepPerfil = useProveedorContratoStore(
    (state) => state.setStepPerfil
  );
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const handleOpenModal = useProveedorOcasionalStore(
    (state) => state.handleOpenModal
  );

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor eliminado correctamente");
      navigate("/proveedor");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor creado correctamente");
      navigate("/proveedor");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor actualizado correctamente");
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

  const upgradeProvedorMutation = useMutation({
    mutationFn: updateProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor actualizado correctamente");
      setStepPerfil({
        tipoProveedor: TipoProveedor.Contrato.value,
        tipoEntidad: +values.tipoEntidad,
        tipoPersona: +values.tipoPersona,
        rfc: values.rfc,
        razonSocial: values.razonSocial,
        alias: values.alias,
        email: values.email,
        productos: values.productos,
      });
      navigate(`/proveedor/contrato/${id}`);
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

  const {
    isLoading,
    isError: isErrorGet,
    error: errorGet,
    data: proveedorOcasional,
  } = useQuery({
    queryKey: ["Supplier", `${id}`, "Details"],
    queryFn: () => getProveedorOcasional(id || ""),
    enabled: !!id,
  });

  const initialFormValues = () => {
    if (proveedorOcasional) {
      if (proveedorOcasional.tipoProveedor === TipoProveedor.Contrato.value) {
        navigate(`/proveedor/contrato/${id}`);
      }
      const productos = giros?.filter((obj) =>
        proveedorOcasional.productos.includes(obj.id)
      );
      return {
        tipoEntidad: proveedorOcasional.tipoEntidad,
        tipoPersona: proveedorOcasional.tipoPersona,
        rfc: proveedorOcasional.rfc,
        razonSocial: proveedorOcasional.razonSocial,
        alias: proveedorOcasional.alias ?? "",
        email: proveedorOcasional.email,
        productos: productos,
      };
    }
    return {
      tipoEntidad: "",
      tipoPersona: "",
      rfc: "",
      razonSocial: "",
      alias: "",
      email: "",
      productos: [],
    };
  };

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

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
        });
      }
    },
  });

  const onClickBack = () => {
    navigate("/proveedor");
  };

  const onClickEliminar = () => {
    handleDisableButtons(true);
    deleteMutation.mutate(id!);
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
    onChangeAutocomplete,
    giros: giros ?? [],
    disableButtons,
    openModal,
    actualizarProveedor
  };
};
