import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { validationSchema } from "../Validations";
import { useProveedorOcasionalStore } from "../store/ProveedorOcasional.store";
import type { Giro } from "../../../catalogos/giros/interfaces/Giro";
import { getAllGiros } from "../../../catalogos/services/giros.service";
import { useProveedorContratoStore } from "../../contrato/store/ProveedorContrato.store";
import { TipoEntidad } from "../../interfaces/TipoEntidad";
import { TipoPersona } from "../../interfaces/TipoPersona";
import { TipoProveedor } from "../../interfaces/TipoProveedor";

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
      //TODO enviar data al api
      if (id) {
        toast.info("Proveedor actualizado correctamente");
        navigate("/proveedor");
      } else {
        toast.success("Proveedor creado correctamente");
        navigate("/proveedor");
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
    const tipoEntidadKey = values.tipoEntidad as keyof typeof TipoEntidad;
    const tipoPersonaKey = values.tipoPersona as keyof typeof TipoPersona;
    setStepPerfil({
      tipoProveedor: TipoProveedor.Contrato,
      tipoEntidad: TipoEntidad[tipoEntidadKey],
      tipoPersona: TipoPersona[tipoPersonaKey],
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
