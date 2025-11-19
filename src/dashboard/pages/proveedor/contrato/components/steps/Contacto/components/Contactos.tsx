import { useEffect } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useContactos } from "../hooks/useContactos";
import { ContactosData } from "./ContactosData";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

interface ContactosProps {
  validateContactos: number;
}

export const Contactos = ({ validateContactos }: ContactosProps) => {
  const { clickAddContacto, deleteContacto, setContactosValidos, isValidForm } =
    useContactos();

  const stepContacto = useProveedorContratoStore((state) => state.stepContacto);

  useEffect(() => {
    setContactosValidos(false);
  }, []);

  return (
    <>
      {(stepContacto ?? []).map((item) => (
        <ContactosData
          key={item.id}
          id={item.id}
          deleteContacto={deleteContacto}
          isValidForm={isValidForm}
          validateContactos={validateContactos}
          total={stepContacto?.length!}
        />
      ))}
      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Cuenta">
          <IconButton color="primary" onClick={() => clickAddContacto()}>
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
