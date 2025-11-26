import { CustomAutocomplete } from "./CustomAutocomplete";
import type { Item } from "./interfaces/Item";

interface Props {
  onChange: (item: Item[]) => void;
  setValues?: Item[];
  itemsList?: Item[];
  maxItems: number;
  title: string;
  id: string;
}

export const AutoCompleteComponent = ({
  onChange,
  setValues = [],
  itemsList,
  maxItems,
  title,
  id,
}: Props) => {
  return (
    <CustomAutocomplete<Item>
      id={id}
      options={itemsList ? itemsList : []}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.descripcion
      }
      onChange={(_e, newvalue) => {
        if (Array.isArray(newvalue) && newvalue.length < maxItems) {
          onChange(newvalue.filter((v): v is Item => typeof v !== "string"));
        }
      }}
      value={setValues}
      title={title}
    />
  );
};
