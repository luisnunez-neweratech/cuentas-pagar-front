import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { validationSchema } from "../Validations";
import { useProveedorOcasionalStore } from "../store/ProveedorOcasional.store";
import type { Giro } from "../../../catalogos/giros/interfaces/Giro";
import { getAllGiros } from "../../../catalogos/services/giros.service";
import { useProveedorContratoStore } from "../../contrato/store/ProveedorContrato.store";
import { TipoProveedor } from "../../interfaces/TipoProveedor";
import {
  addProveedorOcasional,
  updateProveedorOcasional,
} from "../services/proveedor.contrato.service";

export const useProveedorOcasional = () => {
  const [contractor, setContractor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const proveedorOcasional = useProveedorOcasionalStore(
    (state) => state.proveedorOcasional
  );

  const setStepPerfil = useProveedorContratoStore(
    (state) => state.setStepPerfil
  );

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
  });

  const updateMutation = useMutation({
    mutationFn: updateProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor actualizado correctamente");
      navigate("/proveedor");
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
  });

  const initialFormValues = () => {
    if (id) {
      return {
        tipoEntidad: proveedorOcasional!.tipoEntidad,
        tipoPersona: proveedorOcasional!.tipoPersona,
        rfc: proveedorOcasional?.rfc ?? "",
        razonSocial: proveedorOcasional!.razonSocial,
        alias: proveedorOcasional!.alias,
        email: proveedorOcasional?.email ?? "",
        giroPrincipal: proveedorOcasional?.giroPrincipal ?? "",
        productos: proveedorOcasional?.productos,
      };
    }
    return {
      tipoEntidad: "",
      tipoPersona: "",
      rfc: "",
      razonSocial: "",
      alias: "",
      email: "",
      giroPrincipal: "",
      productos: [],
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
      console.log(values);
      if (id) {
        console.log("actualizar values", values);
        const giroPrincipal = giros?.find(
          (giro) => giro.descripcion === values.giroPrincipal
        );
        updateMutation.mutate({
          id: +id,
          supplierTypeId: TipoProveedor.Ocasional.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values.rfc.toUpperCase().trim(),
          email: values.email.trim(),
          supplierActivityId: giroPrincipal?.id ?? null,
          productServiceIds:
            values.productos?.map((producto) => producto.id) ?? [],
        });
      } else {
        console.log("agregar values", values);
        const giroPrincipal = giros?.find(
          (giro) => giro.descripcion === values.giroPrincipal
        );
        createMutation.mutate({
          supplierTypeId: TipoProveedor.Ocasional.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values.rfc.toUpperCase().trim(),
          email: values.email.trim(),
          supplierActivityId: giroPrincipal?.id ?? null,
          productServiceIds:
            values.productos?.map((producto) => producto.id) ?? [],
        });
      }
    },
  });

  const onClickBack = () => {
    navigate("/proveedor");
  };

  const onClickEliminar = () => {
    //TODO enviar data al api
    toast.info("Proveedor eliminado correctamente");
    navigate("/proveedor");
  };

  const onChangeAutocomplete = (newValues: Giro[]) => {
    setFieldValue("productos", newValues);
  };

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const actualizarProveedor = () => {
    setStepPerfil({
      tipoProveedor: TipoProveedor.Contrato.value,
      tipoEntidad: +values.tipoEntidad,
      tipoPersona: +values.tipoPersona,
      rfc: values.rfc,
      razonSocial: values.razonSocial,
      alias: values.alias,
      email: values.email,
      giroPrincipal: values.giroPrincipal,
      productos: values.productos,
    });
    navigate("/proveedor/nuevo-contrato");
  };

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
    actualizarProveedor,
  };
};
