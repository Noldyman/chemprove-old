import React, { ReactNode } from 'react'
import { makeStyles, Paper, Divider, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '35px auto',
    padding: '20px',
    minWidth: '900px',
    overFlowX: 'auto',
  },
  title: {
    fontWeight: 'bold',
  },
  divider: {
    margin: '10px 0px 20px 0px',
  },
}))

interface ContentBoxProps {
  title: string
  children: ReactNode
}

const ContentBox: React.FC<ContentBoxProps> = ({ title, children }) => {
  const classes = useStyles()

  return (
    <Paper id="contentBox" className={classes.root} elevation={5}>
      <Typography className={classes.title} variant="h5" align="center">
        {title}
      </Typography>
      <Divider className={classes.divider} />
      {children}
    </Paper>
  )
}

export { ContentBox }
