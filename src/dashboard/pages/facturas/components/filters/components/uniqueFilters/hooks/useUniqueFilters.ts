import { useQuery } from "@tanstack/react-query";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getColaboradoresSgpyon } from "../../../../../../factura/services/colaborador.sgpyon.service";
import { useFilters } from "../../../hooks/useFilters";

export const useUniqueFilters = () => {
  const {
    filtrosFacturas,
    onChangeInvoiceNumber,
    onChangeFiscalFolio,
    onChangeInvoiceYear,
    onChangeDocumentType,
    onChangeCurrencyId,
    onChangeCollaboratorName,
  } = useFilters();

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
    return {
      documentoId: filtrosFacturas.documentType || "",
      monedaId: filtrosFacturas.currencyId || "",
      noFactura: filtrosFacturas.invoiceNumber || "",
      folioFiscal: filtrosFacturas.fiscalFolio || "",
      year: filtrosFacturas.invoiceYear || "",
      colaboradorId: { value: 0, label: "" },
    };
  };

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setValues,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues(),
    validationSchema: null,
    onSubmit: async (_values) => {},
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

  // Sincronizar cambios del form con el store
  useEffect(() => {
    onChangeInvoiceNumber(values.noFactura || "");
  }, [values.noFactura]);

  useEffect(() => {
    onChangeFiscalFolio(values.folioFiscal || "");
  }, [values.folioFiscal]);

  useEffect(() => {
    onChangeInvoiceYear(values.year === "" ? undefined : Number(values.year));
  }, [values.year]);

  useEffect(() => {
    onChangeDocumentType(
      values.documentoId === "" ? undefined : Number(values.documentoId)
    );
  }, [values.documentoId]);

  useEffect(() => {
    onChangeCurrencyId(
      values.monedaId === "" ? undefined : Number(values.monedaId)
    );
  }, [values.monedaId]);

  useEffect(() => {
    onChangeCollaboratorName(values.colaboradorId?.label || "");
  }, [values.colaboradorId]);

  // Limpiar valores cuando se limpia el store
  useEffect(() => {
    // Si todos los filtros están vacíos, resetear el formulario completo
    if (
      !filtrosFacturas?.invoiceNumber &&
      !filtrosFacturas?.fiscalFolio &&
      !filtrosFacturas?.invoiceYear &&
      filtrosFacturas?.documentType === undefined &&
      filtrosFacturas?.currencyId === undefined &&
      !filtrosFacturas?.collaboratorName
    ) {
      resetForm({
        values: {
          documentoId: "",
          monedaId: "",
          noFactura: "",
          folioFiscal: "",
          year: "",
          colaboradorId: { value: 0, label: "" },
        },
      });
      return;
    }

    // Limpiar campos individuales
    if (!filtrosFacturas?.invoiceNumber && values.noFactura) {
      setValues((prev) => ({ ...prev, noFactura: "" }));
    }
    if (!filtrosFacturas?.fiscalFolio && values.folioFiscal) {
      setValues((prev) => ({ ...prev, folioFiscal: "" }));
    }
    if (!filtrosFacturas?.invoiceYear && values.year) {
      setValues((prev) => ({ ...prev, year: "" }));
    }
    if (filtrosFacturas?.documentType === undefined && values.documentoId) {
      setValues((prev) => ({ ...prev, documentoId: "" }));
    }
    if (filtrosFacturas?.currencyId === undefined && values.monedaId) {
      setValues((prev) => ({ ...prev, monedaId: "" }));
    }
    if (!filtrosFacturas?.collaboratorName && values.colaboradorId?.label) {
      setValues((prev) => ({ ...prev, colaboradorId: { value: 0, label: "" } }));
    }
  }, [
    filtrosFacturas.invoiceNumber,
    filtrosFacturas.fiscalFolio,
    filtrosFacturas.invoiceYear,
    filtrosFacturas.documentType,
    filtrosFacturas.currencyId,
    filtrosFacturas.collaboratorName,
  ]);

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
