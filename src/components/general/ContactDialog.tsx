import React from 'react'
import {
  makeStyles,
  Dialog,
  DialogActions,
  Typography,
  Divider,
  Button,
} from '@material-ui/core'
import { Email } from '@material-ui/icons'

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

interface ContactDialogProps {
  contactIsOpen: boolean
  onClose: () => void
}

const ContactDialog: React.FC<ContactDialogProps> = ({
  contactIsOpen,
  onClose,
}) => {
  const classes = useStyles()

  const handleEmail = () => {
    window.location.href = 'mailto:info@chemprove.com'
  }

  return (
    <Dialog open={contactIsOpen} onClose={onClose} fullWidth>
      <div className={classes.content}>
        <Typography className={classes.title} variant="h5" align="center">
          Contact
        </Typography>
        <Divider className={classes.divider} />
        <Typography align="center">
          This website was created by Noud Verstijnen.
          <br />
          Feel free to contact me at{' '}
          <a href="mailto:info@chemprove.com">info@chemprove.com</a> for any
          questions, suggestions or bug reports. Keep in mind that this is a
          'hobby' project, so it might take a while before I get back to you.{' '}
          <br />
          The data that was used for the common residue table will be available
          on github soon.
        </Typography>
        <Divider className={classes.divider} />
        <DialogActions style={{ padding: '0px' }}>
          <Button
            startIcon={<Email />}
            variant="outlined"
            color="secondary"
            onClick={handleEmail}
          >
            Send email
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Go back
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

export { ContactDialog }
