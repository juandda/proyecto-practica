import { createTheme } from "@mui/material"; 
import { green, teal } from "@mui/material/colors";

const theme = createTheme ({
    palette: {
        primary: {
          main: teal[700],
        },
        secondary: {
          main: green[500],
        },
      },
});

export default theme;