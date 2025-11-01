import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

export const CatalogosPage = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          <Card>
            <CardActionArea
              onClick={() => navigate("/catalogos/giros")}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                }}
              >
                <Typography align="center" variant="h5" component="div">
                  Giros
                </Typography>
                <Typography align="center" variant="body2" color="text.secondary">
                  2
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};
