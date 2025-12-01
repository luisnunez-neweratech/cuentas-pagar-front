import { Box, Button, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { useProveedorContratoPage } from "./hooks/useProveedorContratoPage";
import { mainBackgroundColor } from "../../../../lib/constants";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProveedorContratoPage = () => {
  const { steps, activeStep, isStepSkipped, getStepScreen, id, onClickEliminar } =
    useProveedorContratoPage();

  return (
    <Grid container>
      {id && (
        <>
          <Grid size={10} />
          <Grid size={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: mainBackgroundColor }}
              fullWidth
              type="button"
              size="small"
              onClick={onClickEliminar}
            >
              Dar de baja
              <DeleteIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Grid>
        </>
      )}

      <Grid size={12} sx={{ marginTop: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Grid container>
            <Grid size={12}>{getStepScreen(activeStep)}</Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
