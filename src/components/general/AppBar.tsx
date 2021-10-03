import React from 'react'
import {
  makeStyles,
  AppBar as TitleBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import { NightsStay, Brightness7, ContactMail } from '@material-ui/icons'

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
  onContactClick: () => void
}

const AppBar: React.FC<AppBarProps> = ({
  isThemeDark,
  onThemeToggle,
  onContactClick,
}) => {
  const classes = useStyles()

  const renderThemeButton = () => {
    const toTheme = `Switch to ${isThemeDark ? 'light theme' : 'dark theme'}`
    return (
      <div>
        <Tooltip title={toTheme} placement="left" arrow>
          <IconButton style={{ color: '#fff' }} onClick={onThemeToggle}>
            {isThemeDark ? <Brightness7 /> : <NightsStay />}
          </IconButton>
        </Tooltip>
      </div>
    )
  }

  return (
    <TitleBar position="static">
      <Toolbar>
        <Typography variant="h4" style={{ color: '#fff' }}>
          Chemprove
        </Typography>
        <div className={classes.settings}>
          <div>
            <Tooltip title="Contact" placement="left" arrow>
              <IconButton style={{ color: '#fff' }} onClick={onContactClick}>
                <ContactMail />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {renderThemeButton()}
      </Toolbar>
    </TitleBar>
  )
}

export { AppBar }
