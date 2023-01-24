import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0c0c0c',
      light: '#3C3C3C',
      dark: '#080808'
    },
    secondary: {
      main: '#1c64bc',
      light: '#4983C9',
      dark: '#134683',
      contrastText: '#fff'
    },
    error: {
      main: '#ff002d',
    },
    success: {
      main: '#26c72c',
      light: '#51D256',
      dark: '#1A8B1E'
    },
  }
})