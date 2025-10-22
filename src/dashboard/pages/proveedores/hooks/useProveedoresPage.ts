import { useState } from "react";

export const useProveedoresPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  const onClickShowFilter = () => {
    console.log("here", showFilter);
    setShowFilter(!showFilter);
  };

  return {
    showFilter,
    onClickShowFilter,
  };
};
