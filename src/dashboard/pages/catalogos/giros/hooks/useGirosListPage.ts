import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllGiros } from "../../services/giros.service";
import { useEffect } from "react";

export const useGirosListPage = () => {
  const navigate = useNavigate();
  const rowClick = (row: any) => {
    navigate(row.id.toString());
  };

  const {
    isLoading,
    isError,
    error,
    data: giros,
    isFetching,
  } = useQuery({
    queryKey: ["SupplierActivity", "GetAll"],
    queryFn: () => getAllGiros(),
  });

  useEffect(() => {
    if (giros && giros?.length > 0) {
      console.log("giros", giros);
    }
  }, [giros]);

  return {
    rowClick,
    giros
  };
};
