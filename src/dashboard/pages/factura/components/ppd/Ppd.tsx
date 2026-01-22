import { Grid } from "@mui/material";
import { TextFieldCommon } from "../../../../../components/common/TextFieldCommon/TextFieldCommon";

interface Props {
  values: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
}

export const Ppd = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}: Props) => {
  return (
    <>
      <Grid size={2} sx={{ marginTop: -2 }}>
        <TextFieldCommon
          id="noParcialidad"
          label="No de Parcialidad"
          value={values.noParcialidad || ""}
          handleChange={handleChange}
          typeMoneda={false}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2} sx={{ marginTop: -2 }}>
        <TextFieldCommon
          id="saldoInsoluto"
          label="Saldo Insoluto"
          value={values.saldoInsoluto || ""}
          handleChange={handleChange}
          typeMoneda={false}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>
    </>
  );
};
