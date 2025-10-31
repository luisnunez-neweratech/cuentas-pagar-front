import { useEffect } from "react";
import { CuentasBancariasData } from "./CuentasBancariasData";
import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCuentasBancarias } from "../hooks/useCuentasBancarias";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const CuentasBancarias = () => {
  const { addCuenta, deleteCuenta, isValidForm, setCuentasValidos } =
    useCuentasBancarias();

  const stepCuentaBancaria = useProveedorContratoStore(
    (state) => state.stepCuentaBancaria
  );

  useEffect(() => {
    setCuentasValidos(false);
  }, []);

  return (
    <>
      {(stepCuentaBancaria ?? []).map((item) => (
        <CuentasBancariasData
          key={item.id}
          id={item.id}
          deleteCuenta={deleteCuenta}
          idInput={`caratulaBancaria-${item.id}`}
          isValidForm={isValidForm}
        />
      ))}

      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Cuenta">
          <IconButton color="primary" onClick={() => addCuenta()}>
            <AddCircleIcon
              style={{
                height: "36px",
                width: "36px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};
