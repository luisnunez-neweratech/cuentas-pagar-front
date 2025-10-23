import { useState } from "react";
import { useAuthStore } from "../../../../stores/auth/auth.store";

export const useIconAvatar = () => {
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    logoutUser,
    open,
    handleClick,
    handleClose,
    anchorEl,
  };
};
