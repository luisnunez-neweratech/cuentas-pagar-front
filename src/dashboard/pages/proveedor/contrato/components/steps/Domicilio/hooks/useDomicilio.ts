import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { StepDomicilio } from "../../../../interface/stepDomicilio";
import { useJsApiLoader } from "@react-google-maps/api";

export const useDomicilio = (inputRef: any) => {
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const getStepDomicilio = useProveedorContratoStore(
    (state) => state.getStepDomicilio
  );
  const setStepDomicilio = useProveedorContratoStore(
    (state) => state.setStepDomicilio
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
        productos: "", //TODO valores para los productos
      };
    } */

    const stepDomicilio = getStepDomicilio();
    return {
      pais: stepDomicilio?.pais,
      codigoPostal: stepDomicilio?.codigoPostal,
      estado: stepDomicilio?.estado,
      municipio: stepDomicilio?.municipio,
      ciudad: stepDomicilio?.ciudad,
      colonia: stepDomicilio?.colonia,
      calle: stepDomicilio?.calle,
      numInterior: stepDomicilio?.numInterior,
      numExterior: stepDomicilio?.numExterior,
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
      console.log("values", values);
      const pasoDomicilio: StepDomicilio = {
        pais: values.pais ?? "",
        codigoPostal: values.codigoPostal ?? "",
        estado: values.estado ?? "",
        municipio: values.municipio ?? "",
        ciudad: values.ciudad ?? "",
        colonia: values.colonia ?? "",
        calle: values.calle ?? "",
        numInterior: values.numInterior,
        numExterior: values.numExterior,
      };
      setStepDomicilio(pasoDomicilio);
      handleNext();
    },
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const handleOnPlacesChanged = () => {
    let address = inputRef.current.getPlace();
    console.log("address", address);
    if (address && address?.address_components.length > 0) {
      const codigoPostal = address?.address_components.filter(
        (addressFound: any) => {
          if (addressFound.types.includes("street_number")) {
            return addressFound;
          }
        }
      );
      if (codigoPostal.length > 0) {
        setFieldValue("codigoPostal", codigoPostal[0].long_name);
      }

      const colonia = address?.address_components.filter(
        (addressFound: any) => {
          if (addressFound.types.includes("sublocality")) {
            return addressFound;
          }
        }
      );
      if (colonia.length > 0) {
        setFieldValue("colonia", colonia[0].long_name);
      }

      const ciudad = address?.address_components.filter((addressFound: any) => {
        if (addressFound.types.includes("locality")) {
          return addressFound;
        }
      });
      if (ciudad.length > 0) {
        setFieldValue("ciudad", ciudad[0].long_name);
        setFieldValue("municipio", ciudad[0].long_name);
      }

      const estado = address?.address_components.filter((addressFound: any) => {
        if (addressFound.types.includes("administrative_area_level_1")) {
          return addressFound;
        }
      });
      if (estado.length > 0) {
        setFieldValue("estado", estado[0].long_name);
      }
    }
  };

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleBack,
    setFieldValue,
    handleOnPlacesChanged,
    isLoaded,
  };
};
