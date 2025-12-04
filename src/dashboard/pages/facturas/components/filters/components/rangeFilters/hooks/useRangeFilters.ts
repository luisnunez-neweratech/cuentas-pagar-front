import { useEffect, useState } from "react";
import type { DateRange } from "rsuite/esm/DateRangePicker";
import { useFilters } from "../../../hooks/useFilters";
import dayjs from "dayjs";

export const useRangeFilters = () => {
  const {
    filtrosFacturas,
    onChangeInvoiceDateFrom,
    onChangeInvoiceDateTo,
    onChangeScheduledPaymentFrom,
    onChangeScheduledPaymentTo,
    onChangePaymentDateFrom,
    onChangePaymentDateTo,
    onChangeReimbursementDateFrom,
    onChangeReimbursementDateTo,
  } = useFilters();

  const [fechaFactura, setFechaFacturaLocal] = useState<DateRange | null>(null);
  const [fechaPago, setFechaPagoLocal] = useState<DateRange | null>(null);
  const [fechaProgramadaPago, setFechaProgramadaPagoLocal] =
    useState<DateRange | null>(null);
  const [fechaReembolso, setFechaReembolsaLocal] = useState<DateRange | null>(
    null
  );

  const setFechaFactura = (value: DateRange | null) => {
    setFechaFacturaLocal(value);
    if (value && Array.isArray(value) && value.length === 2) {
      const fromDate = dayjs(value[0]).format("YYYY-MM-DD");
      const toDate = dayjs(value[1]).format("YYYY-MM-DD");
      onChangeInvoiceDateFrom(fromDate);
      onChangeInvoiceDateTo(toDate);
    } else {
      onChangeInvoiceDateFrom("");
      onChangeInvoiceDateTo("");
    }
  };

  const setFechaPago = (value: DateRange | null) => {
    setFechaPagoLocal(value);
    if (value && Array.isArray(value) && value.length === 2) {
      onChangePaymentDateFrom(dayjs(value[0]).format("YYYY-MM-DD"));
      onChangePaymentDateTo(dayjs(value[1]).format("YYYY-MM-DD"));
    } else {
      onChangePaymentDateFrom("");
      onChangePaymentDateTo("");
    }
  };

  const setFechaProgramadaPago = (value: DateRange | null) => {
    setFechaProgramadaPagoLocal(value);
    if (value && Array.isArray(value) && value.length === 2) {
      onChangeScheduledPaymentFrom(dayjs(value[0]).format("YYYY-MM-DD"));
      onChangeScheduledPaymentTo(dayjs(value[1]).format("YYYY-MM-DD"));
    } else {
      onChangeScheduledPaymentFrom("");
      onChangeScheduledPaymentTo("");
    }
  };

  const setFechaReembolsa = (value: DateRange | null) => {
    setFechaReembolsaLocal(value);
    if (value && Array.isArray(value) && value.length === 2) {
      onChangeReimbursementDateFrom(dayjs(value[0]).format("YYYY-MM-DD"));
      onChangeReimbursementDateTo(dayjs(value[1]).format("YYYY-MM-DD"));
    } else {
      onChangeReimbursementDateFrom("");
      onChangeReimbursementDateTo("");
    }
  };

  // Sincronizar con el store si se limpian los filtros
  useEffect(() => {
    if (!filtrosFacturas.invoiceDateFrom && !filtrosFacturas.invoiceDateTo) {
      setFechaFacturaLocal(null);
    }
    if (!filtrosFacturas.paymentDateFrom && !filtrosFacturas.paymentDateTo) {
      setFechaPagoLocal(null);
    }
    if (
      !filtrosFacturas.scheduledPaymentFrom &&
      !filtrosFacturas.scheduledPaymentTo
    ) {
      setFechaProgramadaPagoLocal(null);
    }
    if (
      !filtrosFacturas.reimbursementDateFrom &&
      !filtrosFacturas.reimbursementDateTo
    ) {
      setFechaReembolsaLocal(null);
    }
  }, [
    filtrosFacturas.invoiceDateFrom,
    filtrosFacturas.invoiceDateTo,
    filtrosFacturas.paymentDateFrom,
    filtrosFacturas.paymentDateTo,
    filtrosFacturas.scheduledPaymentFrom,
    filtrosFacturas.scheduledPaymentTo,
    filtrosFacturas.reimbursementDateFrom,
    filtrosFacturas.reimbursementDateTo,
  ]);

  return {
    fechaFactura,
    setFechaFactura,
    fechaPago,
    setFechaPago,
    fechaProgramadaPago,
    setFechaProgramadaPago,
    fechaReembolso,
    setFechaReembolsa,
  };
};
