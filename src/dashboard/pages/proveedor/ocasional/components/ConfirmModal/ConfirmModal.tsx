import { Backdrop, Box, Button, Paper } from "@mui/material";
import { useConfirmModal } from "./hooks/useConfirmModal";

interface myProps {
  actualizarProovedor: () => void;
}

export const ConfirmModal = ({ actualizarProovedor }: myProps) => {
  const { openModal, handleClose } = useConfirmModal();

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
      onClick={handleClose}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 260,
            height: 175,
          },
        }}
      >
        <Paper
          sx={{ paddingTop: 4, paddingLeft: 1, paddingRight: 1 }}
          elevation={3}
        >
          ¿Actualizar proveedor a contrato?
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            variant="contained"
            onClick={actualizarProovedor}
          >
            Aceptar
          </Button>
          <Button sx={{ marginTop: 2 }} fullWidth variant="contained">
            Cancelar
          </Button>
        </Paper>
      </Box>
    </Backdrop>
  );
};
