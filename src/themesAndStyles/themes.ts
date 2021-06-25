import { createMuiTheme } from '@material-ui/core'

export const lightTheme = createMuiTheme({
  palette: {
    background: {
      paper: '#eee',
      default: '#e0e0e0',
    },
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#616161',
    },
    text: {
      primary: '#616161',
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#e0e0e0',
    },
    text: {
      primary: '#e0e0e0',
    },
  },
})
