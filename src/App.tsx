import { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { AppBar } from './components/general/AppBar'
import { lightTheme, darkTheme } from './themesAndStyles/themes'
import { NmrResiduePage } from './components/nmr/NmrResiduePage'
import { ContactDialog } from './components/general/ContactDialog'

function App() {
  const [isThemeDark, setIsThemeDark] = useState(
    localStorage.getItem('isThemeDark') === 'true' || false
  )
  const [contactIsOpen, setContactIsOpen] = useState(false)

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

  const handleContactToggle = () => {
    setContactIsOpen((prevValue) => !prevValue)
  }

  return (
    <ThemeProvider
      theme={
        localStorage.getItem('isThemeDark') === 'true' ? darkTheme : lightTheme
      }
    >
      <CssBaseline />
      <div className="App">
        <AppBar
          isThemeDark={isThemeDark}
          onThemeToggle={handleThemeToggle}
          onContactClick={handleContactToggle}
        />
        <div className="content">
          <NmrResiduePage />
        </div>
        <ContactDialog
          contactIsOpen={contactIsOpen}
          onClose={handleContactToggle}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
