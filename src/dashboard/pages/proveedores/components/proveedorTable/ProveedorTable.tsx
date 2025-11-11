import { useState } from "react";
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
  const { rowClick, proveedores } = useProveedorTable();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("proveedores", proveedores);

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
          {proveedores &&
            proveedores.map((proveedor: any) => (
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
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={proveedores ? proveedores.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
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
