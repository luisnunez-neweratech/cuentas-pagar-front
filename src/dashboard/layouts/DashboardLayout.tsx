import { Navigate, Outlet } from "react-router";
import { useTheme } from "@mui/material/styles";
import {
  ListItem,
  IconButton,
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DrawerHeader } from "./components/DrawerHeader";
import { AppBar } from "./components/AppBar";
import { Drawer } from "./components/Drawer";

import { useDashboardLayout } from "./hooks/useDashboardLayout";
import { IconAvatar } from "./components/IconAvatar";
import { mainBackgroundColor } from "../../lib/constants";
import logo from "../../assets/newera-logo.svg";
import { useAuthStore } from "../../stores/auth/auth.store";
import { CircularLoading } from "../../components/common/CircularLoading";
import { useDashboardLayoutStore } from "../store/dashboardLayout.store";
import appInfo from "../../../package.json";

const DashboardLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const isLoading = useDashboardLayoutStore((state) => state.isLoading);
  const theme = useTheme();
  const {
    open,
    handleDrawerOpen,
    optionSelected,
    menuOptions,
    handleDrawerClose,
    optionClicked,
    iconDrawer,
  } = useDashboardLayout();

  if (authStatus !== "authorized") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ backgroundColor: mainBackgroundColor }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {optionSelected >= 0 ? menuOptions[optionSelected] : ""}
            </Typography>
            <IconAvatar />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{ backgroundColor: mainBackgroundColor }}>
          <img
            style={{
              height: "50px",
              width: "180px",
            }}
            src={logo}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuOptions.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
                onClick={() => optionClicked(index)}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {iconDrawer(index)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {isLoading && <CircularLoading />}
        <Outlet />
        <div
          style={{
            display: "table",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
            color: 'grey'
          }}
        >
          v {appInfo.version}
        </div>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
