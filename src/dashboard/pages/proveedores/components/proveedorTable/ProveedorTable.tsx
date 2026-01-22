import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { TablePaginationActions } from "./components/TablePaginationActions";
import { useProveedorTable } from "./hooks/useProveedorTable";
import ChatIcon from "@mui/icons-material/Chat";

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
    handleOpenModal,
  } = useProveedorTable();

  return (
    <TableContainer  sx={{ width: "95% !important" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={cellHeaderStyle}>ID</TableCell>
            <TableCell style={cellHeaderStyle}>Notas</TableCell>
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
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.providerCode}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Tooltip title="Ver Notas">
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={handleOpenModal}
                    >
                      <ChatIcon style={{ width: 24, height: 24 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.rfc}
                </TableCell>
                <TableCell
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.alias}
                </TableCell>
                <TableCell
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.razonSocial}
                </TableCell>
                <TableCell
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.fechaAlta}
                </TableCell>
                <TableCell
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.fechaInicioContrato}
                </TableCell>
                <TableCell
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.fechaFinContrato}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.indicadorCSF && <TaskIcon />}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.indicadorIdRepLegal && <TaskIcon />}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
                  {proveedor.indicadorCompDom && <TaskIcon />}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={(_e) => {
                    rowClick(proveedor);
                  }}
                >
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
