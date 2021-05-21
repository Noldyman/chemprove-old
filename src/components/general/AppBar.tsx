import React from 'react'
import {
  makeStyles,
  AppBar as TitleBar,
  Toolbar,
  Typography,
  Switch,
} from '@material-ui/core'
import { NightsStay } from '@material-ui/icons'

const useStyles = makeStyles({
  settings: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
})

interface AppBarProps {
  isDarkTheme: boolean
  onThemeToggle: () => void
}

const AppBar: React.FC<AppBarProps> = ({ isDarkTheme, onThemeToggle }) => {
  const classes = useStyles()

  return (
    <TitleBar position="static">
      <Toolbar>
        <Typography variant="h4">Chemprove</Typography>
        <div className={classes.settings}>
          <NightsStay fontSize="large" />
          <Switch size="small" checked={isDarkTheme} onChange={onThemeToggle} />
        </div>
      </Toolbar>
    </TitleBar>
  )
}

export default AppBar
