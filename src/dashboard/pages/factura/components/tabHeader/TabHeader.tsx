import { FormControl, FormHelperText, Grid } from "@mui/material";
import { SelectCommon } from "../../../../../components/common/SelectCommon/SelectCommon";
import { NormalAutocomplete } from "../../../../../components/common/NormalAutocomplete/NormalAutocomplete";
import { TextFieldCommon } from "../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { DatePickerCommon } from "../../../../../components/common/DatePickerCommon/DatePickerCommon";
import { useTabHeader } from "./hooks/useTabHeader";
import { TipoDocumento } from "../../../facturas/interfaces/TipoDocumento";
import { AutoCompleteComponent } from "../../../../../components/common/AutoComplete/AutoComplete";
import { TabDetails } from "../tabDetails/TabDetails";
import { TabTotal } from "../tabTotal/TabTotal";
import { TabPago } from "../tabPago/TabPago";

interface props {
  tabIndex: number;
  setOnClickGuardar: any;
  onClickGuardar: number;
}

export const TabHeader = ({
  tabIndex,
  setOnClickGuardar,
  onClickGuardar,
}: props) => {
  const {
    onChangeAutocomplete,
    values,
    giros,
    convertProveedores,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleChangeTipoDocumento,
    setTipoEntidad,
    setCorrectAmoutValue,
    convertStatusFactura,
  } = useTabHeader({ onClickGuardar });

  return (
    <Grid container spacing={2} sx={{ marginTop: 4 }}>
      {tabIndex === 0 && (
        <>
          <Grid size={2}>
            <SelectCommon
              id={"tipoDocumentoId"}
              label={"Documento"}
              options={[TipoDocumento.Factura, TipoDocumento.NotaCredito]}
              value={values.tipoDocumentoId}
              handleChange={handleChangeTipoDocumento}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
            />
          </Grid>
          <Grid size={2}>
            <NormalAutocomplete
              options={convertProveedores}
              label="Proveedor"
              id="proveedorId"
              value={values.proveedorId}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched.proveedorId?.value}
              errors={errors.proveedorId?.value}
              setTipoEntidad={setTipoEntidad}
            />
          </Grid>
          <Grid size={2}>
            <TextFieldCommon
              id="noFactura"
              label="No Factura"
              value={values.noFactura || ""}
              handleChange={handleChange}
              typeMoneda={false}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
            />
          </Grid>
          <Grid size={2} sx={{ marginTop: 0 }}>
            <TextFieldCommon
              id="folioFiscal"
              label="Folio Fiscal"
              value={values.folioFiscal || ""}
              handleChange={handleChange}
              typeMoneda={false}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
            />
          </Grid>
          <Grid size={2}>
            <DatePickerCommon
              id="fechaFactura"
              label="Fecha de Factura"
              fechaValue={values.fechaFactura ?? ""}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              setFieldTouched={setFieldTouched}
            />
          </Grid>
          <Grid size={2}>
            <FormControl
              fullWidth
              size="small"
              error={touched.productos && Boolean(errors.productos)}
            >
              <AutoCompleteComponent
                onChange={(e) => onChangeAutocomplete(e, "productos")}
                setValues={values.productos ?? []}
                itemsList={giros}
                maxItems={2}
                title="Productos o Servicios"
                id="giros-autocomplete"
              />
              <FormHelperText>
                {touched.productos && errors.productos?.toString()}
              </FormHelperText>
            </FormControl>
          </Grid>

          <TabTotal
            setCorrectAmoutValue={setCorrectAmoutValue}
            values={values}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
          />

          <TabPago
            setOnClickGuardar={setOnClickGuardar}
            onClickGuardar={onClickGuardar}
            convertStatusFactura={convertStatusFactura}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </>
      )}

      {tabIndex > 0 && <TabDetails />}
    </Grid>
  );
};
