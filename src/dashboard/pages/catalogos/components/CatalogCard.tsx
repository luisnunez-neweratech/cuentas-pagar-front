import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

interface props {
  titulo: string;
  navigateTo: string;
  cantidad?: number;
}

export const CatalogCard = ({ titulo, navigateTo, cantidad = 0 }: props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      <Card>
        <CardActionArea
          onClick={() => navigate(navigateTo)}
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
              {titulo}
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary">
              {cantidad}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
