import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'solid 1px',
    borderRadius: '3px',
    borderColor: theme.palette.divider,
    display: 'flex',
    textAlign: 'center',
  },
}))

interface AppFieldsetProps {
  title?: string
  children: React.ReactNode
}

const AppFieldset: React.FC<AppFieldsetProps> = ({ title, children }) => {
  const classes = useStyles()
  return (
    <fieldset className={classes.root}>
      {title && (
        <legend style={{ margin: 'auto' }}>
          <b>{title}</b>
        </legend>
      )}
      {children}
    </fieldset>
  )
}

export { AppFieldset }
