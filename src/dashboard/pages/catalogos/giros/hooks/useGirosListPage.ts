import { useNavigate } from "react-router";

export const useGirosListPage = () => {
  const navigate = useNavigate();
  const rowClick = (row: any) => {
    navigate(row.id.toString());
  };

  return {
    rowClick,
  };
};
