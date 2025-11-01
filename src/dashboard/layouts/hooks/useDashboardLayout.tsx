import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { mainBackgroundColor } from "../../../lib/constants";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const menuOptions = ["Proveedores", "Facturas", "Reportes", "Catalogos"];

export const useDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const checkPathname = () => {
    if (location.pathname.includes("/proveedor")) {
      return 0;
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
          <GroupsIcon
            style={{ color: optionSelected === 0 ? mainBackgroundColor : "" }}
          />
        );
      case 1:
        return (
          <ReceiptIcon
            style={{ color: optionSelected === 1 ? mainBackgroundColor : "" }}
          />
        );
      case 2:
        return (
          <AssessmentIcon
            style={{ color: optionSelected === 2 ? mainBackgroundColor : "" }}
          />
        );
      case 3:
        return (
          <LibraryBooksIcon
            style={{ color: optionSelected === 2 ? mainBackgroundColor : "" }}
          />
        );
    }
  };

  const optionClicked = (index: number) => {
    switch (index) {
      case 0:
        navigate("/proveedor");
        setOptionSelected(0);
        break;
      case 1:
        navigate("/");
        setOptionSelected(1);
        break;
      case 2:
        navigate("/");
        setOptionSelected(2);
        break;
      case 3:
        navigate("/catalogos");
        setOptionSelected(3);
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
