import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { validationSchema } from "../Validations";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { StepPerfil } from "../../../../interface/stepPerfil";
import type { Giro } from "../../../../../../catalogos/giros/interfaces/Giro";
import { TipoPersona } from "../../../../../interfaces/TipoPersona";
import { getAllGiros } from "../../../../../../catalogos/services/giros.service";
import { TipoProveedor } from "../../../../../interfaces/TipoProveedor";

export const usePerfil = () => {
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const setStepPerfil = useProveedorContratoStore(
    (state) => state.setStepPerfil
  );
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );

  const initialFormValues = () => {
    /* if (id) {
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
      const tipoPersonaKey = values.tipoPersona as keyof typeof TipoPersona;
      const pasoPerfil: StepPerfil = {
        tipoProveedor: TipoProveedor.Contrato.value,
        tipoEntidad: +values.tipoEntidad,
        tipoPersona: TipoPersona[tipoPersonaKey],
        razonSocial: values.razonSocial,
        alias: values.alias,
        rfc: values.rfc,
        email: values.email,
        giroPrincipal: values.giroPrincipal,
        productos: values.productos,
      };
      setStepPerfil(pasoPerfil);
      handleNext();
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
  };
};
