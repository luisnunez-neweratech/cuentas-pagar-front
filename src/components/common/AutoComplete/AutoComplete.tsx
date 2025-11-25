import { CustomAutocomplete } from "./CustomAutocomplete";
import type { Item } from "./interfaces/Item";

interface Props {
  onChange: (item: Item[]) => void;
  setValues?: Item[];
  itemsList?: Item[];
}

export const AutoCompleteComponent = ({
  onChange,
  setValues = [],
  itemsList,
}: Props) => {
  return (
    <CustomAutocomplete<Item>
      id="customized-autocomplete"
      options={itemsList ? itemsList : []}
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
