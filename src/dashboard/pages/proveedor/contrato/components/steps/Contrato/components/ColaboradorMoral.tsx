import { Grid, IconButton, Tooltip } from "@mui/material";
import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ColaboradorData } from "./ColaboradorData";
import { usecolaboradorMoral } from "../hooks/useColaboradorMoral";
import { useEffect } from "react";

export const ColaboradorMoral = () => {
  const {
    items,
    addColaborador,
    deleteColaborador,
    setItems,
    isValidForm,
    setColaboradoresValidos,
  } = usecolaboradorMoral();

  useEffect(() => {
    setItems([{ id: 1, valido: false }]);
    setColaboradoresValidos(false);
  }, []);

  return (
    <>
      {items.map((item) => (
        <ColaboradorData
          key={item.id}
          id={item.id}
          deleteColaborador={deleteColaborador}
          isValidForm={isValidForm}
        />
      ))}
      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Colaborador">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={() => addColaborador()}
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
