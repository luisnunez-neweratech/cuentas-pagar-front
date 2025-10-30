import { Backdrop, Box, Button, Paper } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { mainBackgroundColor } from "../../../../../lib/constants";
import { useNuevoProveedor } from "./hooks/useNuevoProveedor";

export const NuevoProvedor = () => {
  const { openModal, handleClose, onClickOcasional, onClickContrato } =
    useNuevoProveedor();

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
            onClick={onClickOcasional}
          >
            Ocasional <ReceiptLongIcon sx={{ marginLeft: 1 }} />
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: mainBackgroundColor, marginTop: 4 }}
            onClick={onClickContrato}
          >
            Contrato <HistoryEduIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Paper>
      </Box>
    </Backdrop>
  );
};
