import { Backdrop, Box, Button, Paper } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { mainBackgroundColor } from "../../../../../lib/constants";
import { useNuevaFactura } from "./hooks/useNuevaFactura";

export const NuevaFactura = () => {
  const {
    openFacturaModal,
    handleCloseFacturaModal,
    onClickManual,
    onClickXml,
  } = useNuevaFactura();

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={openFacturaModal}
      onClick={handleCloseFacturaModal}
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
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ backgroundColor: mainBackgroundColor }}
            onClick={onClickManual}
          >
            Manual <EditNoteIcon sx={{ marginLeft: 1 }} />
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: mainBackgroundColor, marginTop: 4 }}
            onClick={onClickXml}
          >
            Cargar XML <PostAddIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Paper>
      </Box>
    </Backdrop>
  );
};
