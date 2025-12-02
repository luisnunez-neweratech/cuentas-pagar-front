import { Grid } from "@mui/material";
import { FacturaHeader } from "./components/facturaHeader/FacturaHeader";
import { FacturaDetalle } from "./components/facturaDetalle/FacturaDetalle";
import { FacturaFooter } from "./components/facturaFooter/FacturaFooter";
import { useFacturaPage } from "./hooks/useFacturaPage";

export const FacturaPage = () => {
  const { onClickGuardar, setOnClickGuardar } = useFacturaPage();

  return (
    <form
    onSubmit={() => {}}
    >
      <Grid container spacing={2}>
        <FacturaHeader  onClickGuardar={onClickGuardar} />
        <FacturaDetalle />
        <FacturaFooter setOnClickGuardar={setOnClickGuardar} onClickGuardar={onClickGuardar} />
      </Grid>
    </form>
  );
};
