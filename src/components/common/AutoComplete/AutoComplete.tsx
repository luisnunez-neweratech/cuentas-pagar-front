import { CustomAutocomplete } from "./CustomAutocomplete";
import { useAutocomplete } from "./hooks/useAutocomplete";
import type { Giro } from "../../../dashboard/pages/catalogos/giros/interfaces/Giro";

interface Props {
  onChange: (giro: Giro[]) => void;
  setValues?: Giro[];
}

export const AutoCompleteComponent = ({ onChange, setValues = [] }: Props) => {
  const { giros } = useAutocomplete();

  return (
    <CustomAutocomplete<Giro>
      id="customized-autocomplete"
      options={giros ? giros : []}
      getOptionLabel={(option) => option.descripcion}
      onChange={(_e, newvalue) => {
        if (newvalue.length < 5) {
          onChange(newvalue);
        }
      }}
      value={setValues}
    />
  );
};
