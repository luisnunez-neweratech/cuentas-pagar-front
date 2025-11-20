import { useEffect } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ColaboradorData } from "./ColaboradorData";
import { usecolaboradorMoral } from "../hooks/useColaboradorMoral";

interface myProps {
  validateColaboradores: number;
}

export const ColaboradorMoral = ({ validateColaboradores }: myProps) => {
  const {
    clickAddColaborador,
    deleteColaborador,
    setColaboradoresValidos,
    newStepContrato,
    isValidForm,
  } = usecolaboradorMoral();

  useEffect(() => {
    setColaboradoresValidos(false);
  }, []);

  return (
    <>
      {(newStepContrato?.colaboradores ?? []).map((item) => (
        <ColaboradorData
          key={`${item.id}${Date()}`}
          id={item.id}
          deleteColaborador={deleteColaborador}
          isValidForm={isValidForm}
          validateColaboradores={validateColaboradores}
          total={newStepContrato?.colaboradores?.length!}
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
