import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useIconAvatar } from "./hooks/useIconAvatar";

export const IconAvatar = () => {
  const { logoutUser, open, handleClick, handleClose, anchorEl, userName } =
    useIconAvatar();

  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title={userName}>
        <IconButton color="inherit" edge="start" onClick={handleClick}>
          <AccountCircleIcon style={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </Menu>
    </Stack>
  );
};
