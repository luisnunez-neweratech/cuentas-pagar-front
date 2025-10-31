import { useEffect } from "react";
import { CuentasBancariasData } from "./CuentasBancariasData";
import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCuentasBancarias } from "../hooks/useCuentasBancarias";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const CuentasBancarias = () => {
  const {
    items,
    addCuenta,
    deleteCuenta,
    setItems,
    isValidForm,
    setCuentasValidos,
  } = useCuentasBancarias();

  const stepCuentaBancaria = useProveedorContratoStore(
    (state) => state.stepCuentaBancaria
  );

  /* useEffect(() => {
    setItems([{ id: 1, valido: false }]);
    setCuentasValidos(false);
  }, []); */

  return (
    <>
      {/* {items.map((item) => (
        <CuentasBancariasData
          key={item.id}
          id={item.id}
          deleteCuenta={deleteCuenta}
          idInput={`caratulaBancaria-${item.id}`}
          isValidForm={isValidForm}
        />
      ))} */}

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
