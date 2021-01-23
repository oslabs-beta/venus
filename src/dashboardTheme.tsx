
import { createMuiTheme } from "@material-ui/core/styles";
import {purple, green } from "@material-ui/core/colors";
// import { blue } from "@material-ui/core/styles";


const theme:any = createMuiTheme({
    palette: {
        type: 'dark',
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

export const light:any = {
    palette: {
    type: 'light',
    },
  }
  
  export const dark:any = {
    palette: {
    type: 'dark',
    },
  }
export default theme