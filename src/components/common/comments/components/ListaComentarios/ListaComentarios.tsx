import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";

interface Props {
  items: Array<{
    id: number;
    commentText: string;
    createdAt: string;
  }>;
}

export const ListaComentarios = ({ items }: Props) => {
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
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.commentText}
                secondary={item.createdAt}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
};
