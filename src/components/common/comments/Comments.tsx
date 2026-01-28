import {
  Backdrop,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { mainBackgroundColor } from "../../../lib/constants";
import CloseIcon from "@mui/icons-material/Close";
import { ListaComentarios } from "./components/ListaComentarios/ListaComentarios";
import { useComments } from "./hooks/useComments";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  isProveedor: boolean;
}

export const Comments = ({ openModal, handleClose, isProveedor }: Props) => {
  const {
    proveedoresComments,
    nota,
    setNota,
    onClickGuardar,
    facturasComments,
  } = useComments({
    openModal,
    isProveedor,
  });

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
      id="testId"
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: `75vw`,
            height: `80vh`,
          },
        }}
      >
        <Paper
          sx={{
            paddingTop: 4,
            paddingLeft: 2,
            paddingRight: 2,
            overflow: "hidden",
            overflowY: "scroll",
          }}
          elevation={3}
        >
          <Grid container spacing={2}>
            <Grid size={11} />
            <Grid size={1}>
              <Tooltip title="Cerrar">
                <IconButton
                  sx={{ color: mainBackgroundColor, marginLeft: 5 }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid size={12}>
              <TextField
                id="outlined-multiline-static"
                label="Agregar Nota"
                multiline
                rows={5}
                fullWidth
                onChange={(e) => setNota(e.target.value)}
                value={nota}
                inputProps={{ maxLength: 4000 }}
              />
            </Grid>
            <Grid size={10} />
            <Grid size={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: mainBackgroundColor, marginTop: 2 }}
                disabled={!nota.trim().length}
                onClick={onClickGuardar}
              >
                Guardar <SaveIcon sx={{ marginLeft: 1 }} />
              </Button>
            </Grid>
            <Grid size={10} />
            {isProveedor &&
              proveedoresComments &&
              proveedoresComments.items.length > 0 && (
                <ListaComentarios items={proveedoresComments.items} />
              )}
            {!isProveedor &&
              facturasComments &&
              facturasComments.items.length > 0 && (
                <ListaComentarios items={facturasComments.items} />
              )}
          </Grid>
        </Paper>
      </Box>
    </Backdrop>
  );
};
