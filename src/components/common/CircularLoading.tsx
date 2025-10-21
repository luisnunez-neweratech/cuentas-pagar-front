import CircularProgress from "@mui/material/CircularProgress";

export const CircularLoading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-50px",
        width: "100px",
        height: "100px",
      }}
    >
      <CircularProgress />
    </div>
  );
};
