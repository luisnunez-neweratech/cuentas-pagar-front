import { useNavigate } from "react-router";
import { Backdrop, Box, Button, Paper } from "@mui/material";
import { useProveedoresPageStore } from "../store/ProveedoresPage.store";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { mainBackgroundColor } from "../../../../lib/constants";

export const NuevoProvedor = () => {
  const navigate = useNavigate();
  const openModal = useProveedoresPageStore((state) => state.openModal);
  const handleClose = useProveedoresPageStore((state) => state.handleClose);
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
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ backgroundColor: mainBackgroundColor }}
            onClick={() => navigate("nuevo-ocasional")}
          >
            Ocasional <ReceiptLongIcon sx={{ marginLeft: 1 }} />
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: mainBackgroundColor, marginTop: 4 }}
            onClick={() => navigate("nuevo-contrato")}
          >
            Contrato <HistoryEduIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Paper>
      </Box>
    </Backdrop>
  );
};
