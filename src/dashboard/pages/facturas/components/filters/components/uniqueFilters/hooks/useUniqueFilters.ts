import { useQuery } from "@tanstack/react-query";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getColaboradoresSgpyon } from "../../../../../../factura/services/colaborador.sgpyon.service";

export const useUniqueFilters = () => {
  const [convertColaboradores, setConvertColaboradores] = useState<
    { value: number; label: string }[]
  >([]);

  const [convertMonedas, setConvertMonedas] = useState<
    { value: number; label: string }[]
  >([]);

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
      documentoId: null,
      monedaId: null,
      noFactura: null,
      year: null,
      colaboradorId: { value: 0, label: "" },
    };
  };

  const {
    //handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues(),
    validationSchema: null, //validationSchema,
    onSubmit: async (_values) => {
      //handleDisableButtons(true);
    },
  });

  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
  });

  useEffect(() => {
    const newColaboradores = colaboradores?.map((colaborador: any) => {
      return {
        value: colaborador.id,
        label: colaborador.name,
      };
    });

    setConvertColaboradores(newColaboradores ?? []);
  }, [colaboradores]);

  return {
    convertMonedas,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    convertColaboradores,
    setFieldValue,
  };
};
