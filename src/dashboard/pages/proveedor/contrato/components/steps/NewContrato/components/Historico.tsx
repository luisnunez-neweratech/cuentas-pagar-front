import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function createData(
  tipo: string,
  documento: string,
  fechaInicio: string,
  fechaVencimiento: string,
  indeterminado: boolean
) {
  return { tipo, documento, fechaInicio, fechaVencimiento, indeterminado };
}

const rows = [
  createData(
    "Contrato",
    "contrato-C25119004",
    "01/10/2025",
    "01/10/2025",
    false
  ),
  createData(
    "Contrato",
    "contrato-C25119005",
    "01/10/2025",
    "01/10/2025",
    false
  ),
  createData("Propuesta", "propuesta-C25119004", "01/10/2025", "", true),
  createData("CSF", "csf-C25119004", "01/10/2025", "01/10/2025", false),
  createData("Comprobante Domicilio", "csf-C25119004", "01/10/2025", "", true),
];

export const Historico = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Documento</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Fecha Inicio
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Fecha Vencimiento
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Indeterminado
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
                    {row.tipo}
                  </TableCell>
                  <TableCell>{row.documento}</TableCell>
                  <TableCell>{row.fechaInicio}</TableCell>
                  <TableCell>{row.fechaVencimiento}</TableCell>
                  <TableCell>
                    {row.indeterminado && <CheckCircleOutlineIcon />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
