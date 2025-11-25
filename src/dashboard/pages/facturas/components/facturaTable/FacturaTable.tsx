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
import { Link } from "@mui/material";

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

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
          {row.proveedor}
        </TableCell>
        <TableCell>{row.noFactura}</TableCell>
        <TableCell>{row.tipoDocumento}</TableCell>
        <TableCell>{row.folioFiscal}</TableCell>
        <TableCell>{row.fechaFactura}</TableCell>
        <TableCell>{row.statusFacturas}</TableCell>
        <TableCell>{row.statusReembolso}</TableCell>
        <TableCell>{row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
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
              <Typography variant="h6" gutterBottom component="div">
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
              <Typography variant="h6" gutterBottom component="div">
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
              <Typography variant="h6" gutterBottom component="div">
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
            <TableCell>Proveedor</TableCell>
            <TableCell>No. Factura</TableCell>
            <TableCell>Tipo Documento</TableCell>
            <TableCell>Fólio Fiscal</TableCell>
            <TableCell>Fecha Factura</TableCell>
            <TableCell>Estatus Factura</TableCell>
            <TableCell>Estatus Reembolso</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.proveedor} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
