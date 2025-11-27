import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { Item } from "../../../../../../components/common/AutoComplete/interfaces/Item";
import { getAllGiros } from "../../../../catalogos/services/giros.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";

export const useFacturaHeader = () => {
  const [convertMonedas, setConvertMonedas] = useState<{ value: number; label: string }[]>([]);

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const { data: monedas } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  useEffect(() => {
    const newMonedas = monedas?.map((moneda) => {
      return {
        value: moneda.id,
        label: moneda.descripcion,
      };
    });

    setConvertMonedas(newMonedas ?? []);
  }, [monedas]);

  const initialFormValues = () => {
    /*     if (proveedorOcasional) {
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
    } */
    return {
      productos: [],
    };
  };

  const {
    //handleSubmit,
    values,
    //handleChange,
    //handleBlur,
    //touched,
    //errors,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues(),
    validationSchema: null, //validationSchema,
    onSubmit: async (_values) => {
      //handleDisableButtons(true);
    },
  });

  const onChangeAutocomplete = (newValues: Item[], fieldValue: string) => {
    setFieldValue(fieldValue, newValues);
  };

  return {
    onChangeAutocomplete,
    values,
    giros,
    convertMonedas,
  };
};
