import React from 'react'
import {
  makeStyles,
  Dialog,
  DialogActions,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { sources } from '../../data/H_NMR_RESIDUES'

const useStyles = makeStyles({
  content: {
    padding: '10px',
  },
  title: {
    marginBottom: '10px',
  },
  divider: {
    margin: '10px auto 10px auto',
  },
})

interface SourcesDialogProps {
  open: boolean
  onClose: () => void
}

const SourcesDialog: React.FC<SourcesDialogProps> = ({ open, onClose }) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <div className={classes.content}>
        <Typography className={classes.title} variant="h5" align="center">
          Sources
        </Typography>
        <Typography align="center">
          The data in this table was obtained from the following sources.
        </Typography>
        <Divider className={classes.divider} />
        <List>
          {sources.map((s) => (
            <ListItem button onClick={() => window.open(s.url, '_blank')}>
              <ListItemIcon>
                <KeyboardArrowRight />
              </ListItemIcon>
              <ListItemText
                primary={s.label}
                secondary={
                  s.dateAccessed ? `Last accessed on ${s.dateAccessed}` : null
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider} />
        <DialogActions style={{ padding: '0px' }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Go back
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

export { SourcesDialog }
