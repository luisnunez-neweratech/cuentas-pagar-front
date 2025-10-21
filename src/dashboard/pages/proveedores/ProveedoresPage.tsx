import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";

export const ProveedoresPage = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid size={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("nuevo")}
        >
          Nuevo Proveedor
        </Button>
      </Grid>
    </Grid>
  );
};
