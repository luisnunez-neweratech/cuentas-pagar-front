import { Backdrop, Box, Paper } from "@mui/material";
import { useDetalleFacturaModal } from "./hooks/useDetalleFacturaModal";
import { DetalleFactura } from "./detalleFactura/DetalleFactura";

export const DetalleFacturaModal = () => {
  const { openModal, handleClose } = useDetalleFacturaModal();

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
            width: "80vw",
            height: "80vh",
          },
        }}
      >
        <Paper
          sx={{ paddingTop: 4, paddingLeft: 1, paddingRight: 1 }}
          elevation={3}
        >
          <DetalleFactura />
        </Paper>
      </Box>
    </Backdrop>
  );
};
