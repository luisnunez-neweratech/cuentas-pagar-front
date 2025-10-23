import { useNavigate } from "react-router";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AutoCompleteComponent } from "../../../../components/common/AutoComplete";
import { useNuevoProveedorOcasional } from "./hooks/useNuevoProveedorOcasional";

export const NuevoProveedorOcasionalPage = () => {
  const navigate = useNavigate();
  const {
    tipoPersona,
    tipoEntidad,
    handleChangeTipoPersona,
    handleChangeTipoEntidad,
  } = useNuevoProveedorOcasional();

  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <Tooltip title="Regresar">
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => navigate("/proveedor")}
          >
            <ArrowBackIcon sx={{ color: "black" }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid size={10} />
      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="tipo-entidad-label">Tipo Entidad</InputLabel>
          <Select
            labelId="tipo-entidad-label"
            id="tipo-entidad-select"
            value={tipoEntidad}
            label="Tipo Entidad"
            onChange={handleChangeTipoEntidad}
          >
            <MenuItem value="local">Local</MenuItem>
            <MenuItem value="extranjero">Extranjero</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="tipo-persona-label">Tipo Persona</InputLabel>
          <Select
            labelId="tipo-persona-label"
            id="tipo-persona-select"
            value={tipoPersona}
            label="Tipo Persona"
            onChange={handleChangeTipoPersona}
          >
            <MenuItem value="fisica">F&iacute;sica</MenuItem>
            <MenuItem value="moral">Moral</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="rfc"
          label="RFC"
          name="rfc"
          sx={{ marginTop: 0 }}
        />
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="razonSocial"
          label="Raz&oacute;n Social"
          name="razonSocial"
        />
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="alias"
          label="Alias"
          name="alias"
        />
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"          
        />
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="giroPrincipal"
          label="Giro Principal"
          name="giroPrincipal"
          sx={{ marginTop: 4,}}
        />
      </Grid>

      <Grid size={4}>
        <AutoCompleteComponent />
      </Grid>
    </Grid>
  );
};
