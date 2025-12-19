import { useState } from "react";

export const useProveedoresPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  const onClickShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return {
    showFilter,
    onClickShowFilter,
  };
};
