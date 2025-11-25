import { CustomAutocomplete } from "./CustomAutocomplete";
import { useAutocomplete } from "./hooks/useAutocomplete";
import type { Item } from "./interfaces/Item";

interface Props {
  onChange: (item: Item[]) => void;
  isGiros: boolean;
  setValues?: Item[];
}

export const AutoCompleteComponent = ({
  onChange,
  isGiros,
  setValues = [],
}: Props) => {
  const { data } = useAutocomplete({ isGiros });

  return (
    <CustomAutocomplete<Item>
      id="customized-autocomplete"
      options={data ? data : []}
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
