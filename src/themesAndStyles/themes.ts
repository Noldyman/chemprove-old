import { createMuiTheme } from '@material-ui/core'

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#b0bec5',
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
      main: '#b0bec5',
    },
  },
})
