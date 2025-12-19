import { Grid, Stack, Chip } from "@mui/material";

interface myProps {
  value: string;
  label: string;
}

export const ChipElement = ({ label, value }: myProps) => {
  return (
    <Grid size={1}>
      <Stack spacing={1} sx={{ alignItems: "center", marginTop: 1 }}>
        <Stack direction="row" spacing={1}>
          <Chip
            sx={{ fontSize: 10 }}
            label={`${label} ${value}`}
            color="primary"
          />
        </Stack>
      </Stack>
    </Grid>
  );
};
