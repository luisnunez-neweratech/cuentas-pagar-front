import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const DetalleFactura = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <h5 style={{ margin: 0 }}>Detalle</h5>
      </Grid>
      <Grid size={10} />
      <Grid size={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", width: 120 }}>
                  Cantidad
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: 200 }}>
                  U. Medida
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: 120 }}>
                  Código
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: 300 }}>
                  Concepto
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: 150 }}>
                  Precio
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: 150 }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {(rows ?? []).map((row) => (
                <RowDetalle key={row.id} id={row.id} />
              ))} */}
              <TableRow
                // key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell>Lg</TableCell>
                <TableCell>AA-B</TableCell>
                <TableCell>lsadlfjlsdf</TableCell>
                <TableCell>$300.00</TableCell>
                <TableCell>$300.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
