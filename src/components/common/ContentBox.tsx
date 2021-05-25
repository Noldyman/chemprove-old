import React, { ReactNode } from 'react'
import { makeStyles, Paper, Divider, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    padding: '20px',
  },
  title: {
    fontWeight: 'bold',
  },
  divider: {
    margin: '10px 0px 10px 0px',
  },
})

interface ContentBoxProps {
  title: string
  children: ReactNode
}

const ContentBox: React.FC<ContentBoxProps> = ({ title, children }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={5}>
      <Typography className={classes.title} variant="h5" align="center">
        {title}
      </Typography>
      <Divider className={classes.divider} />
      {children}
    </Paper>
  )
}

export { ContentBox }
