import { Grid, IconButton, Tooltip } from "@mui/material";

import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ColaboradorData } from "./ColaboradorData";
import { usecolaboradorMoral } from "../hooks/useColaboradorMoral";
import { useEffect, useState } from "react";

type Colaborador = { id: number };

export const ColaboradorMoral = () => {
 /*  const { items, addColaborador, deleteColaborador } = usecolaboradorMoral(); */
 const [items, setItems] = useState<Colaborador[]>([]);
 
   useEffect(() => {
     setItems([{ id: 1 }]);
     console.log('lo agregor?')
   }, []);
 
   const addColaborador = () => {
     setItems([...items, { id: items.length + 1 }]);
     console.log("here?", items);
   };
 
   const deleteColaborador = (id: number) => {
     setItems(items.filter((item) => item.id !== id));
 
     console.log("here?", items);
   };

  console.log('items', items)

  return (
    <>
      {items.map((item) => (
        <ColaboradorData key={item.id} id={item.id} deleteColaborador={deleteColaborador} />
      ))}
      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Colaborador">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={()=>addColaborador()}
          >
            <AddCircleIcon
              style={{
                height: "36px",
                width: "36px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};
