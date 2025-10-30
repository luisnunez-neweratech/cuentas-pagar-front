import type { ActividadType } from "./interfaces/Actividad";
import { CustomAutocomplete } from "./CustomAutocomplete";

interface Props {
  onChange: (actividades: ActividadType[]) => void;
  setValues?: ActividadType[];
}

export const AutoCompleteComponent = ({ onChange, setValues = [] }: Props) => {
  return (
    <CustomAutocomplete<ActividadType>
      id="customized-autocomplete"
      options={actividades}
      getOptionLabel={(option) => option.title}
      onChange={(_e, newvalue) => onChange(newvalue)}      
      value={setValues}
    />
  );
};

const actividades = [
  { title: "Actividad Economica 1", id: 1 },
  { title: "Actividad Economica 2", id: 2 },
  { title: "Actividad Economica 3", id: 3 },
  { title: "Actividad Economica 4", id: 4 },
];
