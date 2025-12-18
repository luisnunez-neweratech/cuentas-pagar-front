import { useFormik } from "formik";
import { validationSchema } from "../../../Validations";
import { useFacturaStore } from "../../../store/Factura.store";
import type { Item } from "../../../../../../components/common/AutoComplete/interfaces/Item";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFacturaDetalle,
  addFacturaHeader,
  getFactura,
  getStatusFactura,
  updateFacturaDetalle,
  updateFacturaHeader,
  uploadFacturaFiles,
  getCheckDuplicate,
  calculateScheduledPaymentDate,
} from "../../../services/factura.service";
import { useEffect, useState } from "react";
import { getProveedoresAutoComplete } from "../../../../facturas/services/proveedor.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";

interface props {
  onClickGuardar: number;
}

export const useTabHeader = ({ onClickGuardar }: props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const stateFactura = useFacturaStore((state) => state);

  const addRowFacturaDetalle = useFacturaStore(
    (state) => state.addRowFacturaDetalle
  );

  const setValidTabHeader = useFacturaStore((state) => state.setValidTabHeader);

  const setTipoDocumentoId = useFacturaStore(
    (state) => state.setTipoDocumentoId
  );

  const setTipoEntidadId = useFacturaStore((state) => state.setTipoEntidadId);
  const setFacturaId = useFacturaStore((state) => state.setFacturaId);
  const setDisableButtons = useFacturaStore((state) => state.setDisableButtons);
  const setPdfDownloadUrl = useFacturaStore((state) => state.setPdfDownloadUrl);
  const setXmlDownloadUrl = useFacturaStore((state) => state.setXmlDownloadUrl);
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const setScheduledPaymentMessage = useFacturaStore(
    (state) => state.setScheduledPaymentMessage
  );
  const setInitialValues = useFacturaStore((state) => state.setInitialValues);
  const initialSupplierId = useFacturaStore((state) => state.initialSupplierId);
  const initialInvoiceDate = useFacturaStore((state) => state.initialInvoiceDate);
  const initialPaymentTermId = useFacturaStore((state) => state.initialPaymentTermId);

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const [listaProductos, setListaProductos] = useState<
    { id: number; descripcion: string }[]
  >([]);
  const [convertProveedores, setConvertProveedores] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertStatusFactura, setConvertStatusFactura] = useState<
    { value: number; label: string }[]
  >([]);

  const onChangeAutocomplete = (newValues: Item[], fieldValue: string) => {
    setFieldValue(fieldValue, newValues);
  };

  const [callCheckDuplicateFactura, setCallCheckDuplicateFactura] =
    useState<boolean>(false);

  const { data: proveedores } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedoresAutoComplete(),
  });

  const { data: statusFacturaData } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "InvoiceStatus"],
    queryFn: () => getStatusFactura(),
  });

  const {
    isLoading,
    //isError: isErrorGet,
    //error: errorGet,
    data: facturaBD,
  } = useQuery({
    queryKey: ["Invoice", `${id}`],
    queryFn: () => getFactura(id || ""),
    enabled: !!id,
  });

  const createMutationDetalle = useMutation({
    mutationFn: addFacturaDetalle,
    onSuccess: () => {
      toast.success("Factura creada correctamente");
      handleDisableButtons(false);
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
      handleDisableButtons(false);
    },
  });

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
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addFacturaHeader,
    onSuccess: (data) => {
      setFacturaId(data.data.id); //id header creado, por si falla el detalle usar este id
      const newDetalles = (stateFactura.facturaDetalle ?? []).map((detalle) => {
        return {
          id: 0,
          lineNumber: 0,
          quantity: +detalle.cantidad,
          productServiceKey: detalle.codigo.toString(),
          concept: detalle.concepto.toString(),
          unitPrice: +detalle.precio,
          lineDiscount: 0,
          lineTotal: +detalle.total,
          uofMId: detalle.uMedida,
        };
      });
      createMutationDetalle.mutate({
        invoiceId: data.data.id,
        postFacturaDetallePayload: newDetalles,
      });

      if (stateFactura.xmlFileValue || stateFactura.pdfFileValue) {
        uploadDocumentosMutation.mutate({
          facturaId: data.data.id,
          xml: stateFactura.xmlFileValue,
          pdf: stateFactura.pdfFileValue,
        });
      }
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
      handleDisableButtons(false);
    },
  });

  const updateHeaderMutation = useMutation({
    mutationFn: updateFacturaHeader,
    onSuccess: () => {
      //toast.success("Factura actualizada correctamente");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar la factura");
      return;
    },
    onSettled: () => {
      //handleDisableButtons(false);
    },
  });

  const updateMutationDetalle = useMutation({
    mutationFn: updateFacturaDetalle,
    onSuccess: () => {
      toast.success("Factura actualizada correctamente");
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
      handleDisableButtons(false);
    },
  });

  const initialFormValues = () => {
    if (id && facturaBD && proveedores) {
      facturaBD?.details.map((detail: any) => {
        addRowFacturaDetalle({
          id: detail.id,
          cantidad: detail.quantity,
          uMedida: detail.uofMId,
          codigo: detail.productServiceKey,
          concepto: detail.concept,
          precio: detail.unitPrice,
          total: detail.lineTotal,
          validado: true,
        });
      });

      const proveedorBD = proveedores.find((proveedor: any) => {
        return proveedor.id === facturaBD.proveedorId;
      });

      if (facturaBD.pdfFile) {
        setPdfDownloadUrl(facturaBD.pdfFile);
      }

      if (facturaBD.xmlFile) {
        setXmlDownloadUrl(facturaBD.xmlFile);
      }

      setInitialValues(
        facturaBD.proveedorId,
        facturaBD.fechaFactura,
        facturaBD.condicionesPagoId
      );

      return {
        proveedorId: {
          value: proveedorBD.id,
          label: proveedorBD.descripcion,
          productos: proveedorBD.productos,
          condicionesPagoId: facturaBD.condicionesPagoId,
          condicionesPagoLabel: "", //proveedorBD.condicionesPagoLabel,
        },
        colaboradorId: { value: 0, label: "" },
        tipoDocumentoId: facturaBD.tipoDocumentoId,
        statusFacturaId: facturaBD.statusFacturaId,
        statusReembolsoId: 4,
        monedaId: facturaBD.monedaId,
        noFactura: facturaBD.noFactura,
        folioFiscal: facturaBD.folioFiscal,

        fechaFactura: facturaBD.fechaFactura,
        fechaProgramadaPago: facturaBD.fechaProgramadaPago,
        fechaPago: facturaBD.fechaPago,
        fechaReembolso: facturaBD.fechaReembolso,

        subtotal: facturaBD.subtotal,
        descuento: facturaBD.descuento,
        impuestos: facturaBD.impuestos,
        ivaRetenido: facturaBD.ivaRetenido,
        isrRetenido: facturaBD.isrRetenido,
        total: facturaBD.total,

        productos: proveedorBD.productos,
        condicionesPagoId: facturaBD.condicionesPagoId, //proveedorBD.condicionesPagoId,
        condicionesPagoLabel: "", //proveedorBD.condicionesPagoLabel,
      };
    }
    return {
      proveedorId: {
        value: 0,
        label: "",
        productos: [],
        condicionesPagoId: 0,
        condicionesPagoLabel: "",
      }, //stateFactura.proveedorId,
      colaboradorId: { value: 0, label: "" }, //stateFactura.colaboradorId,
      tipoDocumentoId: 1, // por default factura en nuevo//stateFactura.tipoDocumentoId,
      statusFacturaId: 51, //en revision al crear //stateFactura.statusFacturaId,
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
      condicionesPagoId: stateFactura.condicionesPagoId,
      condicionesPagoLabel: stateFactura.condicionesPagoLabel,
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
    validationSchema: validationSchema(stateFactura.tipoEntidadId),
    onSubmit: async (values) => {
      handleDisableButtons(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      if (!id) {
        // nueva factura
        if ((stateFactura.facturaDetalle ?? []).length > 0) {
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
              handleDisableButtons(false);
            } else {
              if (!stateFactura.id) {
                // crea header y despues detalle
                createMutation.mutate({
                  id: 0,
                  supplierId: values.proveedorId!.value,
                  invoiceNumber: values.noFactura!,
                  fiscalFolio: values.folioFiscal ?? "",
                  documentType: values.tipoDocumentoId!,
                  invoiceDate: values.fechaFactura!,
                  supplierProductService: values.productos![0].descripcion,
                  subtotal: values.subtotal!,
                  discount: values.descuento!,
                  taxIVA: values.impuestos!,
                  taxIVARetained: values.ivaRetenido ?? 0,
                  taxISRRetained: values.isrRetenido ?? 0,
                  total:
                    +values.subtotal! -
                    +values.descuento! +
                    +values.impuestos! -
                    +values.ivaRetenido! -
                    +values.isrRetenido!,
                  currencyId: values.monedaId!,
                  exchangeRate: 0,
                  paymentForm: "string",
                  paymentTerms: values.condicionesPagoLabel!,
                  scheduledPaymentDate: values.fechaProgramadaPago!,
                  paymentDate: values.fechaPago ?? null,
                  reimbursementStatus: values.statusReembolsoId,
                  reimbursementDate: values.fechaReembolso ?? null,
                  reimbursementCollaboratorId:
                    values.statusReembolsoId !== 4
                      ? values.colaboradorId!.value
                      : null,
                  invoiceStatusId: values.statusFacturaId,
                  paymentTermId: values.condicionesPagoId,
                });
              } else {
                // crea solo detalles
                const newDetalles = (stateFactura.facturaDetalle ?? []).map(
                  (detalle) => {
                    return {
                      id: 0,
                      lineNumber: 0,
                      quantity: +detalle.cantidad,
                      productServiceKey: detalle.codigo.toString(),
                      concept: detalle.concepto.toString(),
                      unitPrice: +detalle.precio,
                      lineDiscount: 0,
                      lineTotal: +detalle.total,
                      uofMId: detalle.uMedida,
                    };
                  }
                );
                createMutationDetalle.mutate({
                  invoiceId: stateFactura.id!.toString(),
                  postFacturaDetallePayload: newDetalles,
                });
                if (stateFactura.xmlFileValue || stateFactura.pdfFileValue) {
                  uploadDocumentosMutation.mutate({
                    facturaId: stateFactura.id!.toString(),
                    xml: stateFactura.xmlFileValue,
                    pdf: stateFactura.pdfFileValue,
                  });
                }
              }
            }
          } else {
            toast.error("Los Campos en los detalles no son validos");
            handleDisableButtons(false);
          }
        } else {
          toast.error("La Factura no tiene detalles");
          handleDisableButtons(false);
        }
      } else {
        //modificar
        if ((stateFactura.facturaDetalle ?? []).length > 0) {
          // cargar nuevos archivos  si es que hay
          // xml solo para nacional === 0

          let detallesValido = true;
          let sumaDetalle = 0;
          stateFactura.facturaDetalle?.map((detalle) => {
            if (!detalle.validado) {
              detallesValido = false;
            }
            sumaDetalle = sumaDetalle + +detalle.total;
          });

          if (detallesValido) {
            if (sumaDetalle !== +(values.subtotal ?? 0)) {
              toast.error("El total de los detalles no es igual al subtotal");
              handleDisableButtons(false);
            } else {
              //call endpoint actualizar header
              updateHeaderMutation.mutate({
                invoiceId: id,
                putFacturaHeaderPayload: {
                  supplierId: values.proveedorId!.value,
                  invoiceNumber: values.noFactura!,
                  invoiceStatusId: values.statusFacturaId,
                  fiscalFolio: values.folioFiscal ?? "",
                  documentType: values.tipoDocumentoId!,
                  invoiceDate: values.fechaFactura!,
                  supplierProductService: values.productos![0].descripcion,
                  subtotal: values.subtotal!,
                  discount: values.descuento!,
                  taxIVA: values.impuestos!,
                  taxIVARetained: values.ivaRetenido ?? 0,
                  taxISRRetained: values.isrRetenido ?? 0,
                  total:
                    +values.subtotal! -
                    +values.descuento! +
                    +values.impuestos! -
                    +values.ivaRetenido! -
                    +values.isrRetenido!,
                  currencyId: values.monedaId!,
                  scheduledPaymentDate: values.fechaProgramadaPago!,
                  paymentDate: values.fechaPago ?? null,
                  reimbursementStatus: values.statusReembolsoId,
                  reimbursementDate: values.fechaReembolso ?? null,
                  reimbursementCollaboratorId: values.colaboradorId!.value,
                  paymentTermId: values.condicionesPagoId,
                },
              });

              const newDetalles = (stateFactura.facturaDetalle ?? []).map(
                (detalle) => {
                  return {
                    id: +detalle.id,
                    lineNumber: 0,
                    quantity: +detalle.cantidad,
                    productServiceKey: detalle.codigo.toString(),
                    concept: detalle.concepto.toString(),
                    unitPrice: +detalle.precio,
                    lineDiscount: 0,
                    lineTotal: +detalle.total,
                    uofMId: detalle.uMedida,
                  };
                }
              );

              // call endpoint actualizar detalle
              updateMutationDetalle.mutate({
                invoiceId: id,
                putFacturaDetallePayload: newDetalles,
              });
            }
          } else {
            toast.error("Los Campos en los detalles no son validos");
            handleDisableButtons(false);
          }
        } else {
          toast.error("La Factura no tiene detalles");
          handleDisableButtons(false);
        }
      }
    },
  });

  const { data: isDuplicateFactura } = useQuery({
    queryKey: [
      "Invoice",
      "CheckDuplicate",
      values.noFactura,
      values.folioFiscal,
    ],
    queryFn: () =>
      getCheckDuplicate(
        values.noFactura,
        values.folioFiscal,
        values.proveedorId.value
      ),
    enabled: callCheckDuplicateFactura,
  });

  useEffect(() => {
    if (isDuplicateFactura) {
      if (isDuplicateFactura?.exists) {
        toast.warning(isDuplicateFactura.message);
        setValidTabHeader(false);
      } else {
        setValidTabHeader(true);
      }
    }
  }, [isDuplicateFactura]);

  useEffect(() => {
    if (
      !id &&
      values.noFactura &&
      values.noFactura.length > 0 &&
      values.folioFiscal &&
      values.folioFiscal.length > 0
    ) {
      setCallCheckDuplicateFactura(true);
    } else {
      setCallCheckDuplicateFactura(false);
    }
  }, [values.noFactura, values.folioFiscal]);

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

  const setTipoEntidad = (tipoEntidadId: number | null) => {
    if (tipoEntidadId !== null) {
      setTipoEntidadId(tipoEntidadId);
    }
  };

  useEffect(() => {
    const newProveedores = proveedores?.map((proveedor: any) => {
      return {
        value: proveedor.id,
        label: proveedor.descripcion,
        tipoEntidadId: proveedor.tipoEntidadId,
        productos: proveedor.productos,
        condicionesPagoId: proveedor.condicionesPagoId,
        condicionesPagoLabel: proveedor.condicionesPagoLabel,
      };
    });

    setConvertProveedores(newProveedores ?? []);
  }, [proveedores]);

  useEffect(() => {
    if (values.proveedorId && values.proveedorId.value > 0) {
      const newListaProductos = values.proveedorId.productos?.map(
        (producto: any) => {
          return {
            id: producto.id,
            descripcion: producto.itemValue,
            //value: null
          };
        }
      );
      setListaProductos(newListaProductos);
      if (newListaProductos.length > 0) {
        setFieldValue("productos", [newListaProductos[0]]);
      } else {
        setFieldValue("productos", []);
      }
      setFieldValue("condicionesPagoId", values.proveedorId.condicionesPagoId);
      setFieldValue(
        "condicionesPagoLabel",
        values.proveedorId.condicionesPagoLabel
      );
    } else {
      setListaProductos([]);
      setFieldValue("productos", []);
      setFieldValue("condicionesPagoId", 0);
      setFieldValue("condicionesPagoLabel", "");
    }
  }, [values.proveedorId]);

  useEffect(() => {
    const newStatusFactura = statusFacturaData?.map((status: any) => {
      return {
        value: status.id,
        label: status.itemName,
      };
    });

    setConvertStatusFactura(newStatusFactura ?? []);
  }, [statusFacturaData]);

  useEffect(() => {
    if (onClickGuardar > 0) {
      if (values.statusReembolsoId === 4) {
        // no aplica
        setFieldValue("colaboradorId", {
          value: 1,
          label: "x",
        }).then(() => {
          handleSubmit();
        });
      } else {
        handleSubmit();
      }
    }
  }, [onClickGuardar]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const fetchScheduledPaymentDate = async () => {
      if (
        values.proveedorId &&
        values.proveedorId.value > 0 &&
        values.fechaFactura &&
        values.condicionesPagoId &&
        values.tipoDocumentoId !== 2 // No aplica para Nota de Crédito
      ) {
        const hasChanges = !id || (
          values.proveedorId.value !== initialSupplierId ||
          values.fechaFactura !== initialInvoiceDate ||
          values.condicionesPagoId !== initialPaymentTermId
        );

        if (hasChanges) {
          try {
            const response = await calculateScheduledPaymentDate({
              supplierId: values.proveedorId.value,
              invoiceDate: values.fechaFactura,
              paymentTermId: values.condicionesPagoId,
            });
            
            setFieldValue("fechaProgramadaPago", response.scheduledPaymentDate);
            
            setScheduledPaymentMessage(response.message);
          } catch (error) {
            console.log("Error al calcular fecha programada de pago:", error);
            setScheduledPaymentMessage(null);
          }
        }
      } else {
        setScheduledPaymentMessage(null);
      }
    };

    fetchScheduledPaymentDate();
  }, [values.proveedorId, values.fechaFactura, values.condicionesPagoId, values.tipoDocumentoId]);

  /* const onValidateTabHeader = () => {
    if (
      values.tipoDocumentoId &&
      values.proveedorId.value > 0 &&
      values.noFactura &&
      values.folioFiscal &&
      values.fechaFactura
    ) {
      setValidTabHeader(true);
    } else {
      setValidTabHeader(false);
    }
  }; */

  /*   useEffect(() => {
    onValidateTabHeader();
  }, [
    values.tipoDocumentoId,
    values.noFactura,
    values.folioFiscal,
    values.fechaFactura,
  ]);
 */
  /*  const onValidateTabDetail = () => {
    if (
      values.monedaId &&
      stateFactura.facturaDetalle &&
      stateFactura.facturaDetalle?.length > 0
    ) {
      setValidTabDetail(true);
    } else {
      setValidTabDetail(false);
    }
  }; */
  /* 
  useEffect(() => {
    onValidateTabDetail();
  }, [values.monedaId, stateFactura.facturaDetalle]);
 */
  return {
    onChangeAutocomplete,
    values,
    giros: listaProductos,
    convertProveedores,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleChangeTipoDocumento,
    setTipoEntidad,
    setCorrectAmoutValue,
    convertStatusFactura,
  };
};
