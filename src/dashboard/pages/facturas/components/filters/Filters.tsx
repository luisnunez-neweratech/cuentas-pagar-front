import { Divider, Grid } from "@mui/material";
import { AutocompleteFilters } from "./components/autocompleteFilters/AutocompleteFilters";
import { RangeFilters } from "./components/rangeFilters/RangeFilters";

interface FiltersProps {
  showFilter: boolean;
}

export const Filters = ({ showFilter }: FiltersProps) => {
  return (
    <>
      {showFilter && (
        <>
          <RangeFilters />
          <Grid size={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Divider />
          </Grid>
          <AutocompleteFilters />
        </>
      )}
    </>
  );
};
