import { Grid, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, green } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function createData(
  id: number,
  tipoDeContacto: string,
  contacto: string,
  telefono: string,
  correo: string,
  paginaWeb: string
) {
  return {
    id,
    tipoDeContacto,
    contacto,
    telefono,
    correo,
    paginaWeb,
  };
}

const rows = [
  createData(
    1,
    "Venta",
    "Persona A",
    "123273373",
    "sdgap@kid.co",
    "www.google.com"
  ),
  createData(2, "Pago", "L F Delgado", "82827276", "correo@kil.coo", ""),
];

export const Contacto = () => {
  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo de contacto</TableCell>
              <TableCell align="right">Contacto</TableCell>
              <TableCell align="right">Télefono</TableCell>
              <TableCell align="right">Correo</TableCell>
              <TableCell align="right">Página Web</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.tipoDeContacto}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.contacto}
                </TableCell>
                <TableCell align="right">{row.telefono}</TableCell>
                <TableCell align="right">{row.correo}</TableCell>
                <TableCell align="right">{row.paginaWeb}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="open drawer" edge="start">
                    <DeleteIcon style={{ color: red[400] }} />
                  </IconButton>
                  {index === rows.length - 1 && (
                    <IconButton aria-label="open drawer" edge="start">
                      <AddCircleIcon style={{ color: green[400] }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
