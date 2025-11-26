import { Backdrop, Box, Paper } from "@mui/material";
import { useDetalleFactura } from "./hooks/useDetalleFactura";

export const DetalleFactura = () => {
  const { openModal, handleClose } = useDetalleFactura();

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
            width: 200,
            height: 165,
          },
        }}
      >
        <Paper
          sx={{ paddingTop: 4, paddingLeft: 1, paddingRight: 1 }}
          elevation={3}
        ></Paper>
      </Box>
    </Backdrop>
  );
};
