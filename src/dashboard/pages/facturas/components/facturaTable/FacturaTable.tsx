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

const cellHeaderStyle = { fontWeight: "bold" };

function createData(
  proveedor: string,
  noFactura: string,
  tipoDocumento: string,
  folioFiscal: string,
  fechaFactura: string,
  statusFacturas: string,
  statusReembolso: string,
  total: number,
  fechaProximoPago: string,
  fechaPago: string,
  fechaReembolso: string,
  subtotal: number,
  descuento: number,
  impuestos: number,
  ivaRetenido: number,
  isrRetenido: number,
  moneda: string,
  colaborador: string,
  documento: string
) {
  return {
    proveedor,
    noFactura,
    tipoDocumento,
    folioFiscal,
    fechaFactura,
    statusFacturas,
    statusReembolso,
    total,

    fechaProximoPago,
    fechaPago,
    fechaReembolso,

    subtotal,
    descuento,
    impuestos,
    ivaRetenido,
    isrRetenido,

    moneda,
    colaborador,
    documento,

    productos: [
      {
        id: 0,
        nombre: "producto 1",
      },
      {
        id: 1,
        nombre: "servicio 2",
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const { rowClick } = useFacturaTable();

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
        <TableCell
          component="th"
          scope="row"
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.proveedor}
        </TableCell>
        <TableCell
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.noFactura}
        </TableCell>
        <TableCell
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.tipoDocumento}
        </TableCell>
        <TableCell
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.folioFiscal}
        </TableCell>
        <TableCell
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.fechaFactura}
        </TableCell>
        <TableCell
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.statusFacturas}
        </TableCell>
        <TableCell
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.statusReembolso}
        </TableCell>
        <TableCell
          onClick={(_e) => {
            rowClick(row);
          }}
        >
          {row.total}
        </TableCell>
        <TableCell>
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              edge="start"
              onClick={(e) => {
                e.stopPropagation();
                //rowClick(giro);
              }}
              sx={{ marginRight: 3 }}
            >
              <ModeEditIcon style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Próximo Pago</TableCell>
                    <TableCell>Pago</TableCell>
                    <TableCell>Reembolso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={"fecha-row-0"}>
                    <TableCell component="th" scope="row">
                      {row.fechaProximoPago}
                    </TableCell>
                    <TableCell>{row.fechaPago}</TableCell>
                    <TableCell>{row.fechaReembolso}</TableCell>
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

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Descuento</TableCell>
                    <TableCell>Impuestos</TableCell>
                    <TableCell>IVA Retenido</TableCell>
                    <TableCell>ISR Retenido</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={"fecha-row-0"}>
                    <TableCell component="th" scope="row">
                      {row.subtotal}
                    </TableCell>
                    <TableCell>{row.descuento}</TableCell>
                    <TableCell>{row.impuestos}</TableCell>
                    <TableCell>{row.ivaRetenido}</TableCell>
                    <TableCell>{row.isrRetenido}</TableCell>
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

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Moneda</TableCell>
                    <TableCell>Colaborador</TableCell>
                    <TableCell>Documento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={"fecha-row-0"}>
                    <TableCell component="th" scope="row">
                      {row.moneda}
                    </TableCell>
                    <TableCell>{row.colaborador}</TableCell>
                    <TableCell>
                      <Link href="#">{row.documento}</Link>
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
                Productos o Servicios
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productos.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell component="th" scope="row">
                        {producto.nombre}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
  createData(
    "Office Depot",
    "159",
    "Factura",
    "01010101",
    "25/11/2026",
    "Pendiente",
    "Pendiente",
    3.99,
    "26/01/2026",
    "26/01/2026",
    "26/01/2026",
    100,
    0,
    12,
    1,
    0,
    "MXN",

    "Luis Nuñez",
    "archivo1.pdf"
  ),
  createData(
    "Ice cream sandwich",
    "237",
    "Nota Credito",
    "01010101",
    "26/11/2026",
    "Pagada",
    "Pagada",
    4.99,
    "26/11/2026",
    "26/11/2026",
    "26/11/2026",
    102,
    1,
    23,
    2,
    9,
    "MXN",
    "Luis Nuñez",
    "archivo1.pdf"
  ),
  createData(
    "Eclair",
    "262",
    "Factura",
    "01010101",
    "27/11/2026",
    "Cancelada",
    "Cancelada",
    3.79,
    "29/11/2026",
    "29/11/2026",
    "29/11/2026",
    203,
    2,
    34,
    3,
    8,
    "MXN",
    "Luis Nuñez",
    "archivo1.pdf"
  ),
  createData(
    "Cupcake",
    "305",
    "Factura",
    "01010101",
    "28/11/2026",
    "En Revision",
    "N/A",
    2.5,
    "26/11/2026",
    "26/11/2026",
    "26/11/2026",
    987,
    3,
    45,
    4,
    7,
    "MXN",
    "Luis Nuñez",
    "archivo1.pdf"
  ),
  createData(
    "Gingerbread",
    "356",
    "Nota Credito",
    "01010101",
    "29/11/2026",
    "Pendiente",
    "Pendiente",
    1.5,
    "26/12/2026",
    "26/12/2026",
    "26/12/2026",
    987,
    4,
    56,
    5,
    6,
    "MXN",
    "Luis Nuñez",
    "archivo1.pdf"
  ),
];

export const FacturaTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={cellHeaderStyle}>Proveedor</TableCell>
            <TableCell style={cellHeaderStyle}>No. Factura</TableCell>
            <TableCell style={cellHeaderStyle}>Tipo</TableCell>
            <TableCell style={cellHeaderStyle}>Folio Fiscal</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Factura</TableCell>
            <TableCell style={cellHeaderStyle}>Estatus Factura</TableCell>
            <TableCell style={cellHeaderStyle}>Estatus Reembolso</TableCell>
            <TableCell style={cellHeaderStyle}>Total</TableCell>
            <TableCell style={cellHeaderStyle}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.proveedor} row={row} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={12}
              //count={totalRows}
              count={10}
              //rowsPerPage={rowsPerPage}
              rowsPerPage={5}
              //page={page}
              page={0}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
              //onPageChange={handleChangePage}
              onPageChange={() => {}}
              //onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
