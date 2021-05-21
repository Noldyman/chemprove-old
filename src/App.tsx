import { useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import AppBar from './components/general/AppBar'
import { lightTheme, darkTheme } from './themesAndStyles/themes'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)

  const handleThemeToggle = () => {
    setIsDarkTheme((prevValue) => !prevValue)
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar isDarkTheme={isDarkTheme} onThemeToggle={handleThemeToggle} />
      </div>
    </ThemeProvider>
  )
}

export default App
