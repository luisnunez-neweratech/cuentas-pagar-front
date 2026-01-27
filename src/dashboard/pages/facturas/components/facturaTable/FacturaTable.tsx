import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Link,
  TableFooter,
  TablePagination,
  TablePaginationActions,
  Tooltip,
} from "@mui/material";
import { useFacturaTable } from "./hooks/useFacturaTable";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import type { InvoiceListResponse } from "../../interfaces/InvoiceListResponse";
import dayjs from "dayjs";
import { CircularLoading } from "../../../../../components/common/CircularLoading";
import { TipoDocumento } from "../../interfaces/TipoDocumento";
import { StatusReembolso } from "../../interfaces/StatusReembolso";
import ChatIcon from "@mui/icons-material/Chat";
import { mainBackgroundColor } from "../../../../../lib/constants";
import { getFacturaId } from "../../../factura/lib/facturas";

const cellHeaderStyle = { fontWeight: "bold" };

interface props {
  invoice: InvoiceListResponse;
  onEdit: (id: number) => void;
  onRowClick: (invoice: InvoiceListResponse) => void;
  handleOpenModal: () => void;
  statusFacturaData?: any;
}

function Row({ invoice, onEdit, onRowClick, statusFacturaData, handleOpenModal }: props) {
  const [open, setOpen] = React.useState(false);

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return dayjs(date).format("DD/MM/YYYY");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: invoice.currencyCode || "MXN",
    }).format(amount);
  };

  const getDocumentTypeLabel = (type: number) => {
    return type === TipoDocumento.Factura.value
      ? TipoDocumento.Factura.label
      : TipoDocumento.NotaCredito.label;
  };

  const getReimbursementStatusLabel = (status: number) => {
    const statusObj = Object.values(StatusReembolso).find(
      (s) => s.value === status,
    );
    return statusObj?.label || "N/A";
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Tooltip title="Ver Notas">
            <IconButton color="inherit" edge="start" onClick={handleOpenModal}>
              <ChatIcon
                style={{ width: 24, height: 24, color: mainBackgroundColor }}
              />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          onClick={() => onRowClick(invoice)}
        >
          {invoice.supplierAlias || "N/A"}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {invoice.invoiceNumber || "N/A"}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {getDocumentTypeLabel(invoice.documentType)}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {invoice.supplierProductService || "N/A"}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {formatDate(invoice.invoiceDate)}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {invoice.invoiceStatusName || "N/A"}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {formatDate(invoice.scheduledPaymentDate)}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {formatCurrency(invoice.subtotal)}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {formatCurrency(invoice.total)}
        </TableCell>
        <TableCell onClick={() => onRowClick(invoice)}>
          {getReimbursementStatusLabel(invoice.reimbursementStatus)}
        </TableCell>
        <TableCell>
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              edge="start"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(invoice.id);
              }}
              sx={{ marginRight: 3 }}
              disabled={
                invoice.invoiceStatusId ===
                  getFacturaId("PAGADA", statusFacturaData) ||
                invoice.invoiceStatusId ===
                  getFacturaId("CANCELADA", statusFacturaData) ||
                invoice.invoiceStatusId ===
                  getFacturaId("REEMBOLSADA", statusFacturaData)
              }
            >
              <ModeEditIcon style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ paddingLeft: 8 }}
          >
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                gutterBottom
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Fechas
              </Typography>

              <Table size="small" aria-label="fechas">
                <TableHead>
                  <TableRow>
                    <TableCell>Pago</TableCell>
                    <TableCell>Reembolso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {formatDate(invoice.paymentDate)}
                    </TableCell>
                    <TableCell>
                      {formatDate(invoice.reimbursementDate)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                gutterBottom
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Información
              </Typography>

              <Table size="small" aria-label="informacion">
                <TableHead>
                  <TableRow>
                    <TableCell>Folio Fiscal</TableCell>
                    <TableCell>Moneda</TableCell>
                    <TableCell>Condiciones de Pago</TableCell>
                    <TableCell>Colaborador</TableCell>
                    <TableCell>PDF</TableCell>
                    <TableCell>XML</TableCell>
                    <TableCell>Comprobante Pago</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {invoice.fiscalFolio || "N/A"}
                    </TableCell>
                    <TableCell>
                      {invoice.currencyName || invoice.currencyCode || "N/A"}
                    </TableCell>
                    <TableCell>{invoice.paymentTerms || "N/A"}</TableCell>
                    <TableCell>
                      {invoice.reimbursementCollaboratorName || "N/A"}
                    </TableCell>
                    <TableCell>
                      {invoice.hasPdf && invoice.pdfDownloadUrl ? (
                        <Link
                          href={invoice.pdfDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Descargar PDF
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      {invoice.hasXml && invoice.xmlDownloadUrl ? (
                        <Link
                          href={invoice.xmlDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Descargar XML
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      {invoice.hasPaymentProof &&
                      invoice.paymentProofDownloadUrl ? (
                        <Link
                          href={invoice.paymentProofDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Descargar Comprobante
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table size="small" aria-label="proyecto" sx={{ marginTop: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Proyecto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {invoice.project || "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                gutterBottom
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Importes
              </Typography>

              <Table size="small" aria-label="importes">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Subtotal
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(invoice.subtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Descuento
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(invoice.discount)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      IVA
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(invoice.taxIVA)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      IVA Retenido
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(invoice.taxIVARetained)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ISR Retenido
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(invoice.taxISRRetained)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const FacturaTable = () => {
  const {
    data,
    isLoading,
    page,
    rowsPerPage,
    rowClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleOpenCommentsModal,
    statusFacturaData,
  } = useFacturaTable();

  if (isLoading) {
    return <CircularLoading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={cellHeaderStyle}>Notas</TableCell>
            <TableCell style={cellHeaderStyle}>Proveedor</TableCell>
            <TableCell style={cellHeaderStyle}>No. Factura</TableCell>
            <TableCell style={cellHeaderStyle}>Tipo</TableCell>
            <TableCell style={cellHeaderStyle}>Producto/Servicio</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Factura</TableCell>
            <TableCell style={cellHeaderStyle}>Estatus Factura</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Próximo Pago</TableCell>
            <TableCell style={cellHeaderStyle}>Subtotal</TableCell>
            <TableCell style={cellHeaderStyle}>Total</TableCell>
            <TableCell style={cellHeaderStyle}>Estatus Reembolso</TableCell>
            <TableCell style={cellHeaderStyle}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map((invoice) => (
            <Row
              key={invoice.id}
              invoice={invoice}
              onEdit={handleEdit}
              onRowClick={() => rowClick(invoice)}
              handleOpenModal={handleOpenCommentsModal}
              statusFacturaData={statusFacturaData}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              colSpan={12}
              count={data?.totalCount || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
