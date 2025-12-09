import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";

export const useTabPago = () => {
  const [convertColaboradores, setConvertColaboradores] = useState<
    { value: number; label: string }[]
  >([]);

  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
  });

  useEffect(() => {
    const newColaboradores = colaboradores?.map((colaborador: any) => {
      return {
        value: colaborador.id,
        label: colaborador.name,
      };
    });

    setConvertColaboradores(newColaboradores ?? []);
  }, [colaboradores]);

  return {
    convertColaboradores,
  };
};
