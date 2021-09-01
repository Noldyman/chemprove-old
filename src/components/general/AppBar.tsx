import React from 'react'
import {
  makeStyles,
  AppBar as TitleBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import { NightsStay, Brightness7 } from '@material-ui/icons'

const useStyles = makeStyles({
  settings: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
})

interface AppBarProps {
  isThemeDark: boolean
  onThemeToggle: () => void
}

const AppBar: React.FC<AppBarProps> = ({ isThemeDark, onThemeToggle }) => {
  const classes = useStyles()

  const renderThemeButton = () => {
    const toTheme = `Switch to ${isThemeDark ? 'light theme' : 'dark theme'}`
    return (
      <Tooltip title={toTheme} placement="left" arrow>
        <IconButton style={{ color: '#e0e0e0' }} onClick={onThemeToggle}>
          {isThemeDark ? <Brightness7 /> : <NightsStay />}
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <TitleBar position="static">
      <Toolbar>
        <Typography variant="h4">Chemprove</Typography>
        <div className={classes.settings}>{renderThemeButton()}</div>
      </Toolbar>
    </TitleBar>
  )
}

export { AppBar }
