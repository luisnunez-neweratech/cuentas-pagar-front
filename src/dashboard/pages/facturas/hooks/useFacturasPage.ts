import { useState } from "react";

export const useFacturasPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  const onClickShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return {
    showFilter,
    onClickShowFilter,
  };
};
