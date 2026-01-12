import {
  Backdrop,
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface props {
  open: boolean;
  onClose: () => void;
  warnings: string[];
  info: string[];
}

export const XmlLoadedModal = ({ open, onClose, warnings, info }: props) => {
  const [openInfo, setOpenInfo] = useState(true);
  const [openWarnings, setOpenWarnings] = useState(false);

  const handleClickInfo = () => {
    setOpenInfo(!openInfo);
  };

  const handleClickWarnings = () => {
    setOpenWarnings(!openWarnings);
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
            width: 800,
            minHeight: 200,
          },
        }}
      >
        <Paper
          sx={{
            paddingTop: 4,
            paddingLeft: 2,
            paddingRight: 2,
            paddingBottom: 2,
          }}
          elevation={3}
        >
          <List
            sx={{ width: "100%",  bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Factura Cargada Correctamente
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClickWarnings}>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText primary="Advertencias" />
              {openWarnings ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openWarnings} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {warnings.map((warning, index) => (
                  <ListItemButton sx={{ pl: 4 }} key={`${index}-${warning}`}>
                    <ListItemText primary={warning} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickInfo}>
              <ListItemIcon>
                <InfoIcon color="info" />
              </ListItemIcon>
              <ListItemText primary="Información" />
              {openInfo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openInfo} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {info.map((infoItem, index) => (
                  <ListItemButton sx={{ pl: 4 }} key={`${index}-${infoItem}`}>
                    <ListItemText primary={infoItem} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            variant="outlined"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </Paper>
      </Box>
    </Backdrop>
  );
};
