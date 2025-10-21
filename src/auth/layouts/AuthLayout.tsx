import { Outlet } from "react-router";
import { Grid } from "@mui/material";
import { CircularLoading } from "../../components/common/CircularLoading";
import { useAuthStore } from "../store/auth.store";
import logo from "../../assets/newera-logo.svg";
import "./authStyle.css";


//TODO check if is logged
const AuthLayout = () => {
  const { loading } = useAuthStore();

  return (
    <Grid container style={{ width: "100%", height: "100%" }}>
      {loading && <CircularLoading />}
      <div className="loginBackground" />
      <Grid size={6}>
        <div className="imageContainer">
          <img style={{ width: "400px" }} src={logo} alt="New Era Technology" />
        </div>
      </Grid>

      <Grid size={6}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
