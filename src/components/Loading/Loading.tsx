import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function Loading({ isLoading, children }: Props) {
  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      role="alert"
      aria-busy="true"
    >
      <CircularProgress />
    </Box>
  ) : (
    <>{children}</>
  );
}
