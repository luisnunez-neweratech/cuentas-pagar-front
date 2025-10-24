import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useProveedorContratoPage } from "./hooks/useProveedorContratoPage";

export const ProveedorContratoPage = () => {
  const {
    steps,
    activeStep,
    isStepSkipped,
    handleNext,
    handleBack,
    handleReset,
    getStepScreen,
  } = useProveedorContratoPage();

  return (
    <Grid container>
      <Grid size={12}>
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
          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <Grid container>
              <Grid size={12}>{getStepScreen(activeStep)}</Grid>
              <Grid size={12}>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atras
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Guardar" : "Siguiente"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
