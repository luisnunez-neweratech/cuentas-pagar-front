import { Chip } from "@mui/material";

interface props {
  value: string;
  label: string;
}

export const ChipElement = ({ label, value }: props) => {
  return (
    <Chip
      sx={{ fontSize: 10 }}
      label={`${label}: ${value}`}
      color="primary"
    />
  );
};
