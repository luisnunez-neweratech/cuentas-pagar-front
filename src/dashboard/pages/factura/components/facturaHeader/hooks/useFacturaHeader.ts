import { /* useMutation, */ useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { Item } from "../../../../../../components/common/AutoComplete/interfaces/Item";
import { getAllGiros } from "../../../../catalogos/services/giros.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";
import { useFacturaStore } from "../../../store/Factura.store";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";
import { /* useNavigate, */ useParams } from "react-router";
import { validationSchema } from "../../../Validations";
import { getProveedores } from "../../../../facturas/services/proveedor.service";
/* import { addFacturaHeader } from "../../../services/factura.service";
import { toast } from "sonner";
import { AxiosError } from "axios"; */

interface props {
  onClickGuardar: number;
}

export const useFacturaHeader = ({ onClickGuardar }: props) => {
  const { id } = useParams();
  //const navigate = useNavigate();

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

 /*  const createMutation = useMutation({
    mutationFn: addFacturaHeader,
    onSuccess: () => {
      toast.success("Factura creada correctamente");
      navigate("/facturas");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el proveedor");
      return;
    },
    onSettled: () => {
      //handleDisableButtons(false);
    },
  }); */

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
    onSubmit: async (_values) => {
      //handleDisableButtons(true);
     // console.log('values', values)
      /* createMutation.mutate({
        id: 0,
        supplierId: values.proveedorId!,
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
        total: values.total!,
        currencyId: values.monedaId!,
        exchangeRate: 0,
        paymentForm: "string",
        paymentTerms: "string",
        scheduledPaymentDate: values.fechaProgramadaPago!,
        paymentDate: values.fechaPago!,
        reimbursementStatus: 1,
        reimbursementDate: "2025-12-02T21:50:34.447Z",
        reimbursementCollaboratorId: values.colaboradorId!,
      }); */
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
  };
};
