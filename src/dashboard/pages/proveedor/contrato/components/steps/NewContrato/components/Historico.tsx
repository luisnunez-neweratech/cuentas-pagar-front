import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Link } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useHistorico } from "../hooks/useHistorico";
import { converDateFormat } from "../../../../../../../../lib/dates";

export const Historico = () => {
  const { rows } = useHistorico();

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
              {rows?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.tipoDocumento}
                  </TableCell>
                  <TableCell>
                    <Link href={row.fileUrl}> {row.fileName}</Link>
                  </TableCell>
                  <TableCell>{converDateFormat(row.fechaInicio)}</TableCell>
                  <TableCell>
                    {row.fechaFin ? converDateFormat(row.fechaFin) : ""}
                  </TableCell>
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
