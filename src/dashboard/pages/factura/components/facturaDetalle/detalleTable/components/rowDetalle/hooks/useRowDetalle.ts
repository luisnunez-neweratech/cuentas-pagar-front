import { useFormik } from "formik";
import { useFacturaStore } from "../../../../../../store/Factura.store";
import { useEffect } from "react";
import { validationSchema } from "../Validations";
import { TipoDocumento } from "../../../../../../../facturas/interfaces/TipoDocumento";

interface props {
  id: number;
  onClickGuardar: number;
}

export const useRowDetalle = ({ id, onClickGuardar }: props) => {
  const stateFactura = useFacturaStore((state) => state);
  const removeRowFacturaDetalle = useFacturaStore(
    (state) => state.removeRowFacturaDetalle,
  );
  const updateRowFacturaDetalle = useFacturaStore(
    (state) => state.updateRowFacturaDetalle,
  );

  const getInitialValues = () => {
    const rowDetalleFactura = (stateFactura.facturaDetalle ?? []).find(
      (item) => item.id === id,
    );

    return {
      cantidad: rowDetalleFactura?.cantidad,
      uMedida: rowDetalleFactura?.uMedida,
      codigo: rowDetalleFactura?.codigo,
      concepto: rowDetalleFactura?.concepto,
      precio: rowDetalleFactura?.precio,
      total: rowDetalleFactura?.total,
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
    //validateForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // guardar en el estado
      updateRowFacturaDetalle(id, {
        id: id,
        cantidad: values.cantidad!,
        codigo: values.codigo!,
        concepto: values.concepto!,
        precio: values.precio!,
        total: values.total!,
        uMedida: values.uMedida!,
        validado: true,
      });
    },
  });

  useEffect(() => {
    handleSubmit();
  }, [onClickGuardar]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      updateRowFacturaDetalle(id, {
        id: id,
        cantidad: values.cantidad!,
        codigo: values.codigo!,
        concepto: values.concepto!,
        precio: values.precio!,
        total: values.total!,
        uMedida: values.uMedida!,
        validado: true,
      });
    } else {
      updateRowFacturaDetalle(id, {
        id: id,
        cantidad: values.cantidad!,
        codigo: values.codigo!,
        concepto: values.concepto!,
        precio: values.precio!,
        total: values.total!,
        uMedida: values.uMedida!,
        validado: false,
      });
    }
  }, [errors]);

  const deleteRowFactura = (id: number) => {
    removeRowFacturaDetalle(id);
  };

  const setCorrectAmoutValue = (
    value: string,
    field: string,
    tipoDocId?: number,
  ) => {
    const valueDocumentoId = tipoDocId ?? stateFactura.tipoDocumentoId;
    if (valueDocumentoId === TipoDocumento.NotaCredito.value) {
      // nota de credito
      if (+value > 0) {
        value = (+value * -1).toString();
      }
    } else {
      // factura
      if (+value < 0) {
        value = (+value * -1).toString();
      }
    }
    console.log(field, value);
    setFieldValue(field, value);
    handleSubmit();
  };

  useEffect(() => {
    setCorrectAmoutValue(
      values.precio?.toString() ?? "",
      "precio",
      stateFactura.tipoDocumentoId!,
    );
    setCorrectAmoutValue(
      values.total?.toString() ?? "",
      "total",
      stateFactura.tipoDocumentoId!,
    );
  }, [stateFactura.tipoDocumentoId]);

  return {
    deleteRowFactura,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setCorrectAmoutValue,
  };
};
