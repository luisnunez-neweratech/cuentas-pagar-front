import { Box, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { useProveedorContratoPage } from "./hooks/useProveedorContratoPage";

export const ProveedorContratoPage = () => {
  const { steps, activeStep, isStepSkipped, getStepScreen } =
    useProveedorContratoPage();

  return (
    <Grid container>
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
