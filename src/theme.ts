import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#FFE81F",
    },
    secondary: {
      main: "#EB212E",
    },
    success: {
      main: "#f9d71c",
    },
  },
});

export default theme;
