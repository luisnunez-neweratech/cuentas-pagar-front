import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { Item } from "../../../../../../components/common/AutoComplete/interfaces/Item";
import { getAllGiros } from "../../../../catalogos/services/giros.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";
import { useFacturaStore } from "../../../store/Factura.store";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";
import { useParams } from "react-router";
import { validationSchema } from "../../../Validations";

interface props {
  onClickGuardar: number;
}

export const useFacturaHeader = ({ onClickGuardar }: props) => {
  const { id } = useParams();

  const [convertMonedas, setConvertMonedas] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertColaboradores, setConvertColaboradores] = useState<
    { value: number; label: string }[]
  >([]);

  const stateFactura = useFacturaStore((state) => state);

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const { data: monedas } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
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

  useEffect(() => {
    const newColaboradores = colaboradores?.map((colaborador: any) => {
      return {
        value: colaborador.id,
        label: colaborador.name,
      };
    });

    setConvertColaboradores(newColaboradores ?? []);
  }, [colaboradores]);

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
      proveedorId: stateFactura.proveedorId,
      colaboradorId: stateFactura.colaboradorId,
      tipoDocumentoId: stateFactura.tipoDocumentoId,
      statusFacturaId: 4, //en revision al crear //stateFactura.statusFacturaId,
      statusReembolsoId: 4, //NA al crear// stateFactura.statusReembolsoId,
      monedaId: stateFactura.monedaId,
      noFactura: stateFactura.noFactura,
      folioFiscal: stateFactura.folioFiscal,

      fechaFactura: stateFactura.fechaFactura,
      fechaProgramadaPago: stateFactura.programadaPago,
      fechaPago: stateFactura.fechaPago,
      fechaReembolso: stateFactura.fechaReembolso,

      subtotal: stateFactura.subtotal,
      descuento: stateFactura.descuento,
      impuestos: stateFactura.impuestos,
      ivaRetenido: stateFactura.ivaRetenido,
      isrRetenido: stateFactura.isrRetenido,
      total: stateFactura.total,

      productos: stateFactura.productos,
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
    setFieldTouched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //handleDisableButtons(true);
      console.log("values bien", values);
    },
  });

  useEffect(() => {
    if (onClickGuardar > 0) {
      console.log("call submit values", errors);
      handleSubmit();
    }
  }, [onClickGuardar]);

  const onChangeAutocomplete = (newValues: Item[], fieldValue: string) => {
    setFieldValue(fieldValue, newValues);
  };

  return {
    onChangeAutocomplete,
    values,
    handleChange,
    giros,
    convertMonedas,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    convertColaboradores,
    id,
    setFieldTouched,
  };
};
