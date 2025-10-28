import {
  Box,
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
    getStepScreen,
  } = useProveedorContratoPage();

  return (
    <Grid container>
      
      <Grid size={12} sx={{marginTop:3}}>
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
              </Box>
            </>
          ) : (
            <Grid container>
              <Grid size={12}>{getStepScreen(activeStep)}</Grid>           
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
