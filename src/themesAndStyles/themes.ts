import { createTheme } from '@material-ui/core'

export const lightTheme = createTheme({
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
    info: {
      main: '#616161',
    },
    text: {
      primary: '#616161',
    },
    divider: 'rgba(0,0,0,0.4)',
  },
})

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#e0e0e0',
    },
    info: {
      main: '#e0e0e0',
    },
    text: {
      primary: '#e0e0e0',
    },
    divider: 'rgba(255,255,255,0.4)',
  },
})
