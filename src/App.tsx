import { useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AppBar } from './components/general/AppBar'
import { lightTheme, darkTheme } from './themesAndStyles/themes'
import { NmrResiduePage } from './components/nmr/NmrResiduePage'

function App() {
  const [isThemeDark, setIsThemeDark] = useState(false)

  return (
    <ThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar
          isDarkTheme={isThemeDark}
          onThemeToggle={() => setIsThemeDark((prevValue) => !prevValue)}
        />
        <div className="content">
          <Alert
            severity="error"
            variant="outlined"
            style={{ marginTop: '35px' }}
          >
            This website is not yet finished and is still under construction.
            Keep this in mind when using the site.
          </Alert>
          <NmrResiduePage />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
