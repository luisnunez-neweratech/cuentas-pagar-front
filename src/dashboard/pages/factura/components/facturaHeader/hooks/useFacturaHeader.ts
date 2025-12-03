import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { Item } from "../../../../../../components/common/AutoComplete/interfaces/Item";
import { getAllGiros } from "../../../../catalogos/services/giros.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";
import { useFacturaStore } from "../../../store/Factura.store";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";
import { useNavigate, useParams } from "react-router";
import { validationSchema } from "../../../Validations";
import { getProveedores } from "../../../../facturas/services/proveedor.service";
import {
  addFacturaDetalle,
  addFacturaHeader,
  uploadFacturaFiles,
} from "../../../services/factura.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface props {
  onClickGuardar: number;
}

export const useFacturaHeader = ({ onClickGuardar }: props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [convertMonedas, setConvertMonedas] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertColaboradores, setConvertColaboradores] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertProveedores, setConvertProveedores] = useState<
    { value: number; label: string }[]
  >([]);

  const stateFactura = useFacturaStore((state) => state);
  const setFacturaId = useFacturaStore((state) => state.setFacturaId);
  const setTipoDocumentoId = useFacturaStore(
    (state) => state.setTipoDocumentoId
  );

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

  const { data: proveedores } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedores(),
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
    const newProveedores = proveedores?.map((proveedor: any) => {
      return {
        value: proveedor.id,
        label: proveedor.descripcion,
      };
    });

    setConvertProveedores(newProveedores ?? []);
  }, [proveedores]);

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
    /*  if (proveedorOcasional) {
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
      proveedorId: { value: 0, label: "" }, //stateFactura.proveedorId,
      colaboradorId: { value: 0, label: "" }, //stateFactura.colaboradorId,
      tipoDocumentoId: 1, // por default factura en nuevo//stateFactura.tipoDocumentoId,
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

  const uploadDocumentosMutation = useMutation({
    mutationFn: uploadFacturaFiles,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al subir los documentos");
      return;
    },
    onSettled: () => {
      //handleDisableButtons(false);
    },
  });

  const createMutationDetalle = useMutation({
    mutationFn: addFacturaDetalle,
    onSuccess: () => {
      toast.success("Factura creada correctamente");
      navigate("/facturas");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data);
          return;
        }
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el detalle de la factura");
      return;
    },
    onSettled: () => {
      //handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addFacturaHeader,
    onSuccess: (data) => {
      setFacturaId(data.data.id); //id header creado, por si falla el detalle usar este id
      const newDetalles = (stateFactura.facturaDetalle ?? []).map((detalle) => {
        return {
          lineNumber: 0,
          quantity: +detalle.cantidad,
          productServiceKey: detalle.codigo.toString(),
          concept: detalle.concepto.toString(),
          unitPrice: +detalle.precio,
          lineDiscount: 0,
          lineTotal: +detalle.total,
          unitOfMeasure: detalle.uMedida.toString(),
        };
      });
      createMutationDetalle.mutate({
        invoiceId: data.data.id,
        postFacturaDetallePayload: newDetalles,
      });

      uploadDocumentosMutation.mutate({
        facturaId: data.data.id,
        xml: stateFactura.xmlFileValue,
        pdf: stateFactura.pdfFileValue,
      });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data);
          return;
        }
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar la factura");
      return;
    },
    onSettled: () => {
      //handleDisableButtons(false);
    },
  });

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
      if (!id) {
        // nueva factura
        if ((stateFactura.facturaDetalle ?? []).length > 0) {
          // archivos cargados
          if (!stateFactura.pdfFileValue) {
            toast.warning("Cargar el archivo PDF");
            return;
          }
          if (!stateFactura.xmlFileValue) {
            toast.warning("Cargar el archivo XML");
            return;
          }

          let detallesValido = true;
          let sumaDetalle = 0;
          stateFactura.facturaDetalle?.map((detalle) => {
            if (!detalle.validado) {
              detallesValido = false;
            }
            sumaDetalle = sumaDetalle + +detalle.total;
          });

          if (detallesValido) {
            //validar suma de totales
            if (sumaDetalle !== +(values.subtotal ?? 0)) {
              toast.error("El total de los detalles no es igual al subtotal");
            } else {
              if (!stateFactura.id) {
                // crea header y despues detalle
                createMutation.mutate({
                  id: 0,
                  supplierId: values.proveedorId!.value,
                  invoiceNumber: values.noFactura!,
                  fiscalFolio: values.folioFiscal!,
                  documentType: values.tipoDocumentoId!,
                  invoiceDate: values.fechaFactura!,
                  supplierProductService: values.productos![0].descripcion,
                  subtotal: values.subtotal!,
                  discount: values.descuento!,
                  taxIVA: values.impuestos!,
                  taxIVARetained: values.ivaRetenido!,
                  taxISRRetained: values.isrRetenido!,
                  total:
                    +values.subtotal! -
                    +values.descuento! +
                    +values.impuestos! -
                    +values.ivaRetenido! -
                    +values.isrRetenido!, // TODO cambiar esta formula
                  currencyId: values.monedaId!,
                  exchangeRate: 0,
                  paymentForm: "string",
                  paymentTerms: "string",
                  scheduledPaymentDate: values.fechaProgramadaPago!,
                  paymentDate: values.fechaPago!,
                  reimbursementStatus: 1,
                  reimbursementDate: values.fechaReembolso!,
                  reimbursementCollaboratorId: values.colaboradorId!.value,
                });
              } else {
                // crea solo detalles
                const newDetalles = (stateFactura.facturaDetalle ?? []).map(
                  (detalle) => {
                    return {
                      lineNumber: 0,
                      quantity: +detalle.cantidad,
                      productServiceKey: detalle.codigo.toString(),
                      concept: detalle.concepto.toString(),
                      unitPrice: +detalle.precio,
                      lineDiscount: 0,
                      lineTotal: +detalle.total,
                      unitOfMeasure: detalle.uMedida.toString(),
                    };
                  }
                );
                createMutationDetalle.mutate({
                  invoiceId: stateFactura.id!.toString(),
                  postFacturaDetallePayload: newDetalles,
                });
                uploadDocumentosMutation.mutate({
                  facturaId: stateFactura.id!.toString(),
                  xml: stateFactura.xmlFileValue,
                  pdf: stateFactura.pdfFileValue,
                });
              }
            }
          } else {
            toast.error("Los Detalles no son validos");
          }
        } else {
          toast.error("La Factura no tiene detalles");
        }
      }
    },
  });

  useEffect(() => {
    if (onClickGuardar > 0) {
      handleSubmit();
    }
  }, [onClickGuardar]);

  const onChangeAutocomplete = (newValues: Item[], fieldValue: string) => {
    setFieldValue(fieldValue, newValues);
  };

  const setCorrectAmoutValue = (
    value: string,
    field: string,
    tipoDocId?: number
  ) => {
    const valueDocumentoId = tipoDocId ?? values.tipoDocumentoId;
    if (valueDocumentoId === 2) {
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
  };

  const handleChangeTipoDocumento = (e: any) => {
    setTipoDocumentoId(e.target.value);
    handleChange(e);
    setCorrectAmoutValue(
      values.subtotal?.toString() ?? "",
      "subtotal",
      e.target.value
    );
    setCorrectAmoutValue(
      values.descuento?.toString() ?? "",
      "descuento",
      e.target.value
    );
    setCorrectAmoutValue(
      values.impuestos?.toString() ?? "",
      "impuestos",
      e.target.value
    );
    setCorrectAmoutValue(
      values.ivaRetenido?.toString() ?? "",
      "ivaRetenido",
      e.target.value
    );
    setCorrectAmoutValue(
      values.isrRetenido?.toString() ?? "",
      "isrRetenido",
      e.target.value
    );
    setCorrectAmoutValue(
      values.total?.toString() ?? "",
      "total",
      e.target.value
    );    
  };

  return {
    onChangeAutocomplete,
    values,
    handleChange,
    giros,
    convertMonedas,
    convertProveedores,
    convertColaboradores,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    id,
    setFieldTouched,
    handleChangeTipoDocumento,
    setCorrectAmoutValue,
  };
};
