import { useEffect } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ColaboradorData } from "./ColaboradorData";
import { usecolaboradorMoral } from "../hooks/useColaboradorMoral";

export const ColaboradorMoral = () => {
  const {
    clickAddColaborador,
    deleteColaborador,    
    setColaboradoresValidos,
    stepContrato,
    validateColaboradores,
    isValidForm
  } = usecolaboradorMoral();

  useEffect(() => {
    setColaboradoresValidos(false);
  }, []);

  return (
    <>
      {(stepContrato?.colaboradores ?? []).map((item, index) => (
        <ColaboradorData
          key={item.id}
          id={item.id}
          deleteColaborador={deleteColaborador}
          isValidForm={isValidForm}
          validateColaboradores={validateColaboradores}
          index={index}
        />
      ))}
      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Colaborador">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={() => clickAddColaborador()}
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
