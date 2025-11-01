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
import { useNavigate } from "react-router";

const cellHeaderStyle = { fontWeight: "bold" };

function createData(id: number, nombre: string) {
  return {
    id,
    nombre,
  };
}

const rows = [
  createData(1, "ALIMENTOS"),
  createData(2, "ARTICULOS DE REGALOS"),
];

export const GirosListPage = () => {

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid size={3}>
        <h1>Giros</h1>
      </Grid>
      <Grid size={8} />
      <Grid size={1} sx={{marginTop:2}}>
        <Tooltip title="Nuevo">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={() => navigate("/catalogos/giros/nuevo")}
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
                <TableCell style={cellHeaderStyle}>Nombre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={(_e) => {
                    //rowClick(row);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.nombre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
