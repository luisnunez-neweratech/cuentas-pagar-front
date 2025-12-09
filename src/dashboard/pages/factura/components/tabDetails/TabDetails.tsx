import { Grid } from "@mui/material";
import { SelectCommon } from "../../../../../components/common/SelectCommon/SelectCommon";
import { FacturaDetalle } from "../facturaDetalle/FacturaDetalle";
import { useTabDetails } from "./hooks/useTabDetails";

interface props {
  values: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
}

export const TabDetails = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}: props) => {
  const { convertMonedas } = useTabDetails();

  return (
    <>
      <Grid size={2}>
        <SelectCommon
          id={"monedaId"}
          label={"Moneda"}
          options={convertMonedas}
          value={values.monedaId || ""}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>
      <FacturaDetalle
        onClickGuardar={1} /* onClickGuardar={onClickGuardar} */
      />
    </>
  );
};
