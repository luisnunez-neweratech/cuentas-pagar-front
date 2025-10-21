import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Tooltip } from "@mui/material";

export const IconAvatar = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title="Luis Nuñez">
        <AccountCircleIcon style={{ width: 32, height: 32 }} />
      </Tooltip>
    </Stack>
  );
};
