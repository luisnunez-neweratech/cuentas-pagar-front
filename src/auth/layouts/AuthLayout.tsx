import { Navigate, Outlet } from "react-router";
import { Grid } from "@mui/material";
import { CircularLoading } from "../../components/common/CircularLoading";
import { useAuthStore } from "../../stores/auth/auth.store";
import logo from "../../assets/newera-logo.svg";
import "./authStyle.css";
import { useAuthLayoutStore } from "../store/authLayout.store";

const AuthLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const isLoading = useAuthLayoutStore((state) => state.isLoading);

  if (authStatus === "authorized") {
    return <Navigate to="/proveedor" />;
  }

  return (
    <Grid container style={{ width: "100%", height: "100%" }}>
      {isLoading && <CircularLoading />}
      <div className="loginBackground" />
      <Grid size={6}>
        <div className="imageContainer">
          <img style={{ width: "400px" }} src={logo} alt="New Era Technology" />
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
        <span style={{ color: "#00b0f0", fontWeight: 500, fontSize: "1.2em" }}>
          Community, Integrity, Agility and Commitment.
        </span>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
