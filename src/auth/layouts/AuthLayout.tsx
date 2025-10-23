import { Outlet } from "react-router";
import { Grid } from "@mui/material";
import { CircularLoading } from "../../components/common/CircularLoading";
import { useAuthStore } from "../store/auth.store";
import { NotAuthenticatedRoute } from "../../components/routes/ProtectedRoutes";

import logo from "../../assets/newera-logo.svg";
import "./authStyle.css";

//TODO check if is logged
const AuthLayout = () => {
  const { loading } = useAuthStore();

  return (
    <NotAuthenticatedRoute>
      <Grid container style={{ width: "100%", height: "100%" }}>
        {loading && <CircularLoading />}
        <div className="loginBackground" />
        <Grid size={6}>
          <div className="imageContainer">
            <img
              style={{ width: "400px" }}
              src={logo}
              alt="New Era Technology"
            />
          </div>
        </Grid>

        <Grid size={6}>
          <Outlet />
        </Grid>
        <Grid size={6} />
        <Grid
          size={6}
          sx={{
            borderLeft: "4px solid #FFC000",
            paddingLeft: "8px",
            position: "absolute",
            top: "90%",
            right: 0,
          }}
        >
          <span
            style={{ color: "#00b0f0", fontWeight: 500, fontSize: "1.2em" }}
          >
            Community, Integrity, Agility and Commitment.
          </span>
        </Grid>
      </Grid>
    </NotAuthenticatedRoute>
  );
};

export default AuthLayout;
