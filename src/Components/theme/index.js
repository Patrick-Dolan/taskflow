import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0c0c0c',
    },
    secondary: {
      main: '#1c64bc',
    },
    error: {
      main: '#ff002d',
    },
    success: {
      main: '#26c72c',
    },
  }
})