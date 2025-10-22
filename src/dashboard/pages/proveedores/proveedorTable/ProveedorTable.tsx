import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";

function createData(
  rfc: string,
  alias: string,
  razonSocial: string,
  fechaAlta: string,
  fechaInicioContrato: string,
  fechaFinContrato: string,
  cfs: boolean,
  identificacionRepLegal: boolean,
  comprobanteDomicilio: boolean,
  poderRepresentanteLegal: boolean
) {
  return {
    rfc,
    alias,
    razonSocial,
    fechaAlta,
    fechaInicioContrato,
    fechaFinContrato,
    cfs,
    identificacionRepLegal,
    comprobanteDomicilio,
    poderRepresentanteLegal,
  };
}

const rows = [
  createData(
    "NUDL910103CR9",
    "Luis Fernando",
    "Luis Fernando",
    "21/10/2025",
    "22/10/2025",
    "01/01/2026",
    true,
    true,
    true,
    true
  ),
  createData(
    "NUDL910103CR9",
    "Luis Fernando",
    "Luis Fernando",
    "21/10/2025",
    "22/10/2025",
    "01/01/2026",
    false,
    true,
    true,
    true
  ),
  createData(
    "NUDL910103CR9",
    "Luis Fernando",
    "Luis Fernando",
    "21/10/2025",
    "22/10/2025",
    "01/01/2026",
    true,
    true,
    false,
    true
  ),
  createData(
    "NUDL910103CR9",
    "Luis Fernando",
    "Luis Fernando",
    "21/10/2025",
    "22/10/2025",
    "01/01/2026",
    true,
    false,
    true,
    false
  ),
];

const cellHeaderStyle = { fontWeight: "bold" };

export const ProveedorTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={cellHeaderStyle}>RFC</TableCell>
            <TableCell style={cellHeaderStyle}>Alias</TableCell>
            <TableCell style={cellHeaderStyle}>Razon Social</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Alta</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Inicio Contrato</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Fin Contrato</TableCell>
            <TableCell style={cellHeaderStyle}>CSF</TableCell>
            <TableCell style={cellHeaderStyle}>
              Identificacion Rep Legal
            </TableCell>
            <TableCell style={cellHeaderStyle}>
              Comprobante de Domicilio
            </TableCell>
            <TableCell style={cellHeaderStyle}>
              Poder Representante Legal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rfc}
              </TableCell>
              <TableCell>{row.alias}</TableCell>
              <TableCell>{row.razonSocial}</TableCell>
              <TableCell>{row.fechaAlta}</TableCell>
              <TableCell>{row.fechaInicioContrato}</TableCell>
              <TableCell>{row.fechaFinContrato}</TableCell>
              <TableCell align="center">{row.cfs && <TaskIcon />}</TableCell>
              <TableCell align="center">
                {row.identificacionRepLegal && <TaskIcon />}
              </TableCell>
              <TableCell align="center">
                {row.comprobanteDomicilio && <TaskIcon />}
              </TableCell>
              <TableCell align="center">
                {row.poderRepresentanteLegal && <TaskIcon />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
