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
import { mainBackgroundColor } from "../../../../../lib/constants";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useState } from "react";

interface props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const XmlLoadedModal = ({ open, onClose, onConfirm }: props) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const [_open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!_open);
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
          sx={{
            paddingTop: 4,
            paddingLeft: 2,
            paddingRight: 2,
            paddingBottom: 2,
          }}
          elevation={3}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {_open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={_open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
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
