import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import GroupsIcon from "@mui/icons-material/Groups";
import { mainBackgroundColor } from "../../../lib/constants";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Tooltip } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useDashboardLayoutStore } from "../../store/dashboardLayout.store";

const menuOptions = ["Facturas", "Proveedores", "Catálogos"];

export const useDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const checkPathname = () => {
    if (location.pathname.includes("/facturas")) {
      return 0;
    }
    if (location.pathname.includes("/proveedor")) {
      return 1;
    }
    if (location.pathname.includes("/catalogos")) {
      return 2;
    }
    return -1;
  };

  const [optionSelected, setOptionSelected] = useState<number>(checkPathname());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const iconDrawer = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Tooltip title="Facturas">
            <ReceiptIcon
              style={{ color: optionSelected === 0 ? mainBackgroundColor : "" }}
            />
          </Tooltip>
        );
      case 1:
        return (
          <Tooltip title="Proveedores">
            <GroupsIcon
              style={{ color: optionSelected === 1 ? mainBackgroundColor : "" }}
            />
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip title="Catálogos">
            <LibraryBooksIcon
              style={{ color: optionSelected === 2 ? mainBackgroundColor : "" }}
            />
          </Tooltip>
        );
    }
  };

  const optionClicked = (index: number) => {
    setIsLoading(false);
    switch (index) {
      case 0:
        navigate("/facturas");
        setOptionSelected(0);
        break;
      case 1:
        navigate("/proveedor");
        setOptionSelected(1);
        break;
      case 2:
        navigate("/catalogos");
        setOptionSelected(2);
        break;
      default:
        navigate("/");
        setOptionSelected(-1);
        break;
    }
  };

  return {
    open,
    optionSelected,
    menuOptions,

    handleDrawerOpen,
    handleDrawerClose,
    optionClicked,
    iconDrawer,
  };
};
