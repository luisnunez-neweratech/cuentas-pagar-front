import { useEffect } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useContactos } from "../hooks/useContactos";
import { ContactosData } from "./ContactosData";

export const Contactos = () => {
  const { items, addCuenta, deleteCuenta, setItems } = useContactos();

  useEffect(() => {
    setItems([{ id: 1 }]);
  }, []);

  return (
    <>
      {items.map((item) => (
        <ContactosData
          key={item.id}
          id={item.id}
          deleteCuenta={deleteCuenta}
          idInput={`caratulaBancaria-${item.id}`}
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
