import { Backdrop, Box, Button, Paper, Typography } from "@mui/material";
import { mainBackgroundColor } from "../../../../../lib/constants";

interface props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
}: props) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: { xs: 300, sm: 400 },
            minHeight: 200,
          },
        }}
      >
        <Paper
          sx={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}
          elevation={3}
        >
          <Typography variant="h6" gutterBottom textAlign="center">
            Esta factura ya no se podra editar ya que su estatus es de Pagada/Cancelada ¿Desea continuar?
          </Typography>          
          <Button
            sx={{
              marginTop: 2,
              backgroundColor: mainBackgroundColor,
            }}
            fullWidth
            variant="contained"
            onClick={handleConfirm}
          >
            Aceptar
          </Button>
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            variant="outlined"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </Paper>
      </Box>
    </Backdrop>
  );
};
