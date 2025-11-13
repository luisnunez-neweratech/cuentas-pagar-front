import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { TablePaginationActions } from "./components/TablePaginationActions";
import { useProveedorTable } from "./hooks/useProveedorTable";

const cellHeaderStyle = { fontWeight: "bold" };

export const ProveedorTable = () => {
  const {
    rowClick,
    proveedoresData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    totalRows,
  } = useProveedorTable();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={cellHeaderStyle}>RFC</TableCell>
            <TableCell style={cellHeaderStyle}>Alias</TableCell>
            <TableCell style={cellHeaderStyle}>Razón Social</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Alta</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Inicio Contrato</TableCell>
            <TableCell style={cellHeaderStyle}>Fecha Fin Contrato</TableCell>
            <TableCell style={cellHeaderStyle}>CSF</TableCell>
            <TableCell style={cellHeaderStyle}>
              Identificación Rep Legal
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
          {proveedoresData &&
            proveedoresData.map((proveedor: any) => (
              <TableRow
                hover
                key={proveedor.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={(_e) => {
                  rowClick(proveedor);
                }}
              >
                <TableCell component="th" scope="row">
                  {proveedor.rfc}
                </TableCell>
                <TableCell>{proveedor.alias}</TableCell>
                <TableCell>{proveedor.razonSocial}</TableCell>
                <TableCell>{proveedor.fechaAlta}</TableCell>
                <TableCell>{proveedor.fechaInicioContrato}</TableCell>
                <TableCell>{proveedor.fechaFinContrato}</TableCell>
                <TableCell align="center">
                  {proveedor.indicadorCSF && <TaskIcon />}
                </TableCell>
                <TableCell align="center">
                  {proveedor.indicadorIdRepLegal && <TaskIcon />}
                </TableCell>
                <TableCell align="center">
                  {proveedor.indicadorCompDom && <TaskIcon />}
                </TableCell>
                <TableCell align="center">
                  {proveedor.indicadorPoderRep && <TaskIcon />}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={12}
              count={totalRows}
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
