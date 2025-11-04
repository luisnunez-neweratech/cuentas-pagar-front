import { useNavigate } from "react-router";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { mainBackgroundColor } from "../../../../lib/constants";
import { useMonedaVentaListPage } from "./hooks/useMonedaVentaListPage";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const cellHeaderStyle = { fontWeight: "bold" };

export const MonedaVentaListPage = () => {
  const navigate = useNavigate();
  const { rowClick, monedas, onClickEliminar } = useMonedaVentaListPage();

  return (
    <Grid container>
      <Grid size={3}>
        <h1>Moneda de Venta</h1>
      </Grid>
      <Grid size={8} />
      <Grid size={1} sx={{ marginTop: 2 }}>
        <Tooltip title="Nuevo">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={() => navigate("/catalogos/moneda-venta/nuevo")}
          >
            <AddCircleIcon
              style={{
                height: "36px",
                width: "36px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid size={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={cellHeaderStyle}>Id</TableCell>
                <TableCell style={cellHeaderStyle}>Descripcion</TableCell>
                <TableCell style={cellHeaderStyle} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monedas &&
                monedas.map((moneda) => (
                  <TableRow
                    hover
                    key={moneda.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={(_e) => {
                      rowClick(moneda);
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {moneda.id}
                    </TableCell>
                    <TableCell>{moneda.descripcion}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Modificar">
                        <IconButton
                          color="primary"
                          edge="start"
                          onClick={(e) => {
                            e.stopPropagation();
                            rowClick(moneda);
                          }}
                          sx={{ marginRight: 3 }}
                        >
                          <ModeEditIcon style={{ width: 32, height: 32 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          color="error"
                          edge="start"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickEliminar(moneda.id.toString());
                          }}
                          sx={{ marginLeft: 3 }}
                        >
                          <DeleteIcon style={{ width: 32, height: 32 }} />
                        </IconButton>
                      </Tooltip>
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
