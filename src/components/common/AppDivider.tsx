import React from 'react'
import { makeStyles, Divider } from '@material-ui/core'

const useStyles = makeStyles({
  horizontal: {
    margin: '20px auto 20px auto',
  },
  vertical: {
    margin: ' 0px 20px 0px 20px',
    height: '40px',
  },
})

interface AppDividerProps {
  vertical?: boolean
}

const AppDivider: React.FC<AppDividerProps> = ({ vertical }) => {
  const classes = useStyles()

  return (
    <Divider
      className={vertical ? classes.vertical : classes.horizontal}
      orientation={vertical ? 'vertical' : 'horizontal'}
      flexItem={vertical ? true : false}
      // fullWidth
    />
  )
}

export { AppDivider }
