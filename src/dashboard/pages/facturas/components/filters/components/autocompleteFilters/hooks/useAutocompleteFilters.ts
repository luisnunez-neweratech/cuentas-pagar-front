import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Item } from "../../../../../../../../components/common/AutoComplete/interfaces/Item";
import { getProveedores } from "../../../../../services/proveedor.service";
import { getAllGiros } from "../../../../../../catalogos/services/giros.service";
import { useFilters } from "../../../hooks/useFilters";
import { StatusFactura } from "../../../../../interfaces/StatusFactura";
import { StatusReembolso } from "../../../../../interfaces/StatusReembolso";

const meses = [
  { id: 1, descripcion: "Enero" },
  { id: 2, descripcion: "Febrero" },
  { id: 3, descripcion: "Marzo" },
  { id: 4, descripcion: "Abril" },
  { id: 5, descripcion: "Mayo" },
  { id: 6, descripcion: "Junio" },
  { id: 7, descripcion: "Julio" },
  { id: 8, descripcion: "Agosto" },
  { id: 9, descripcion: "Septiembre" },
  { id: 10, descripcion: "Octubre" },
  { id: 11, descripcion: "Noviembre" },
  { id: 12, descripcion: "Diciembre" },
];

const estatusReembolso = [
  { id: StatusReembolso.Pendiente.value, descripcion: StatusReembolso.Pendiente.label },
  { id: StatusReembolso.Pagado.value, descripcion: StatusReembolso.Pagado.label },
  { id: StatusReembolso.Cancelado.value, descripcion: StatusReembolso.Cancelado.label },
  { id: StatusReembolso.NoAplica.value, descripcion: StatusReembolso.NoAplica.label },
];

const estatusFactura = [
  { id: StatusFactura.Pendiente.value, descripcion: StatusFactura.Pendiente.label },
  { id: StatusFactura.Pagado.value, descripcion: StatusFactura.Pagado.label },
  { id: StatusFactura.Cancelado.value, descripcion: StatusFactura.Cancelado.label },
  { id: StatusFactura.EnRevision.value, descripcion: StatusFactura.EnRevision.label },
];

export const useAutocompleteFilters = () => {
  const {
    filtrosFacturas,
    onChangeSupplierAliases,
    onChangeProductServices,
    onChangeMonths,
    onChangeInvoiceStatusIds,
    onChangeReimbursementStatuses,
  } = useFilters();

  const [values, setValues] = useState({
    proveedores: [] as Item[],
    productos: [] as Item[],
    meses: [] as Item[],
    estatusReembolso: [] as Item[],
    estatusFactura: [] as Item[],
  });

  const { data: proveedores } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedores(),
  });

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const onChangeAutocomplete = (newValues: Item[], fieldValue: string) => {
    setValues((prev) => ({
      ...prev,
      [fieldValue]: newValues,
    }));

    switch (fieldValue) {
      case "proveedores":
        onChangeSupplierAliases(newValues.map((item) => item.descripcion));
        break;
      case "productos":
        onChangeProductServices(newValues.map((item) => item.descripcion));
        break;
      case "meses":
        onChangeMonths(newValues.map((item) => item.id));
        break;
      case "estatusReembolso":
        onChangeReimbursementStatuses(newValues.map((item) => item.id));
        break;
      case "estatusFactura":
        onChangeInvoiceStatusIds(newValues.map((item) => item.id));
        break;
    }
  };

  useEffect(() => {
    if (!filtrosFacturas) return;
    
    if (filtrosFacturas.supplierAliases?.length === 0) {
      setValues((prev) => ({ ...prev, proveedores: [] }));
    }
    if (filtrosFacturas.productServices?.length === 0) {
      setValues((prev) => ({ ...prev, productos: [] }));
    }
    if (filtrosFacturas.months?.length === 0) {
      setValues((prev) => ({ ...prev, meses: [] }));
    }
    if (filtrosFacturas.invoiceStatusIds?.length === 0) {
      setValues((prev) => ({ ...prev, estatusFactura: [] }));
    }
    if (filtrosFacturas.reimbursementStatuses?.length === 0) {
      setValues((prev) => ({ ...prev, estatusReembolso: [] }));
    }
  }, [filtrosFacturas]);

  return {
    proveedores,
    values,
    giros,
    meses,
    onChangeAutocomplete,
    estatusReembolso,
    estatusFactura,
  };
};
