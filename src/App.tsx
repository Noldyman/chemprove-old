import { useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { AppBar } from './components/general/AppBar'
import { lightTheme, darkTheme } from './themesAndStyles/themes'
import { NmrResiduePage } from './components/nmr/NmrResiduePage'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)

  const handleThemeToggle = () => {
    setIsDarkTheme((prevValue) => !prevValue)
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar isDarkTheme={isDarkTheme} onThemeToggle={handleThemeToggle} />
        <div className="content">
          <NmrResiduePage />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
