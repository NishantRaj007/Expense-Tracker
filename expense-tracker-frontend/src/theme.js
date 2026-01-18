import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f4f6f8",
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 12,
  }
});

export default theme;
