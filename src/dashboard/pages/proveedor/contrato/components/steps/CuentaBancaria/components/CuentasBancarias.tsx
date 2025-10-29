import { useEffect } from "react";
import { CuentasBancariasData } from "./CuentasBancariasData";
import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCuentasBancarias } from "../hooks/useCuentasBancarias";

export const CuentasBancarias = () => {
  const { items, addCuenta, deleteCuenta, setItems } = useCuentasBancarias();

  useEffect(() => {
    setItems([{ id: 1 }]);
  }, []);

  return (
    <>
      {items.map((item) => (
        <CuentasBancariasData
          key={item.id}
          id={item.id}
          deleteCuenta={deleteCuenta}
          idInput={`caratulaBancaria-${item.id}`}
        />
      ))}
      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Colaborador">
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
