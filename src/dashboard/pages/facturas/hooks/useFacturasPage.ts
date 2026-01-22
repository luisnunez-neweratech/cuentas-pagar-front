import { useState } from "react";
import { useFacturasPageStore } from "../store/FacturasPage.store";

export const useFacturasPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  const openCommentsModal = useFacturasPageStore(
    (state) => state.openCommentsModal,
  );
  const handleCloseCommentsModal = useFacturasPageStore(
    (state) => state.handleCloseCommentsModal,
  );

  const onClickShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return {
    showFilter,
    onClickShowFilter,
    openCommentsModal,
    handleCloseCommentsModal,
  };
};
