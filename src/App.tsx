import { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AppBar } from './components/general/AppBar'
import { lightTheme, darkTheme } from './themesAndStyles/themes'
import { NmrResiduePage } from './components/nmr/NmrResiduePage'

function App() {
  const [isThemeDark, setIsThemeDark] = useState(
    localStorage.getItem('isThemeDark') === 'true' || false
  )

  useEffect(() => {
    if (!localStorage.getItem('isThemeDark')) {
      localStorage.setItem('isThemeDark', 'false')
    }
  }, [])

  const handleThemeToggle = () => {
    setIsThemeDark((prevValue) => !prevValue)
    const isDarkTheme = localStorage.getItem('isThemeDark') === 'true'
    localStorage.setItem('isThemeDark', (!isDarkTheme).toString())
  }

  return (
    <ThemeProvider
      theme={
        localStorage.getItem('isThemeDark') === 'true' ? darkTheme : lightTheme
      }
    >
      <CssBaseline />
      <div className="App">
        <AppBar isThemeDark={isThemeDark} onThemeToggle={handleThemeToggle} />
        <div className="content">
          <Alert
            severity="error"
            variant="outlined"
            style={{
              margin: '35px auto auto auto',
            }}
          >
            Keep in mind that this website is still under construction. The site
            will be regularly updated.
          </Alert>
          <NmrResiduePage />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
