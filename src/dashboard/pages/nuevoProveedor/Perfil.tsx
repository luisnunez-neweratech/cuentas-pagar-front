import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AutoCompleteComponent } from "../../../components/common/AutoComplete";
import { usePerfil } from "./hooks/usePerfil";

export const Perfil = () => {
  const {
    fileList,
    setFileList,
    tipoPersona,
    tipoProveedor,
    contractor,
    setContractor,
    inputRef,
    handleChangeTipoPersona,
    handleChangeTipoProveedor,
  } = usePerfil();

  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
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
        <FormControl fullWidth>
          <InputLabel id="tipo-proveedor-label">Tipo Proveedor</InputLabel>
          <Select
            labelId="tipo-proveedor-label"
            id="tipo-proveedor-select"
            value={tipoProveedor}
            label="Tipo Proveedor"
            onChange={handleChangeTipoProveedor}
          >
            <MenuItem value="local">Local</MenuItem>
            <MenuItem value="extranjero">Extranjero</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={4}>
        <Button
          fullWidth
          variant="contained"
          component="label"
          style={{ height: "100%" }}
        >
          Constancia de situaci&oacute;n fiscal
          <UploadFileIcon style={{ marginLeft: 8 }} />
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.length) {
                setFileList(e.target.files[0]);
              }
            }}
            hidden
          />
        </Button>
        {fileList && <span style={{ fontSize: 10 }}>{fileList.name}</span>}
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="rfc"
          label="RFC"
          name="rfc"
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
          id="email"
          label="Email"
          name="email"
          type="email"
        />
      </Grid>

      <Grid size={4}>
        <AutoCompleteComponent />
      </Grid>

      <Grid size={4}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={!contractor}
                onChange={() => setContractor(!contractor)}
              />
            }
            label="Contractor"
          />
          {!contractor && (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="contractor"
              label="Contractor"
              name="contractor"
              type="contractor"
              style={{ marginTop: 0 }}
            />
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
};
