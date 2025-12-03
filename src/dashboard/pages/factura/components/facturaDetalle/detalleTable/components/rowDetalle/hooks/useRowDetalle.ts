import { useFormik } from "formik";
import { useFacturaStore } from "../../../../../../store/Factura.store";
import { useEffect } from "react";
import { validationSchema } from "../Validations";

interface props {
  id: number;
  onClickGuardar: number;
}

export const useRowDetalle = ({ id, onClickGuardar }: props) => {
  const stateFactura = useFacturaStore((state) => state);
  const removeRowFacturaDetalle = useFacturaStore(
    (state) => state.removeRowFacturaDetalle
  );

  const getInitialValues = () => {
    const rowDetalleFactura = (stateFactura.facturaDetalle ?? []).find(
      (item) => item.id === id
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
    validateForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('valores bien? de rows', values);
      // guardar en el estado
    },
  });

  useEffect(() => {
    handleSubmit()
  }, [onClickGuardar])

  const deleteRowFactura = (id: number) => {
    removeRowFacturaDetalle(id);
  };

  return {
    deleteRowFactura,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  };
};
