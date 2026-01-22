import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";

export const ListaComentarios = () => {
  return (
    <>
      <Grid size={12}>
        <h4 style={{ marginBottom: 0 }}>Ultimos Comentarios</h4>
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>
      <Grid size={12}>
        <List sx={{ bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Comentario" secondary="Jan 9, 2014" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Comentario" secondary="Jan 9, 2014" />
          </ListItem>

          <ListItem>
            <ListItemText primary="Comentario" secondary="Jan 9, 2014" />
          </ListItem>
        </List>
      </Grid>
    </>
  );
};
