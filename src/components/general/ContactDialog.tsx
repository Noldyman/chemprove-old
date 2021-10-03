import React from 'react'
import {
  makeStyles,
  Dialog,
  DialogActions,
  Typography,
  Divider,
  Button,
} from '@material-ui/core'
import { Email, GitHub } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '10px',
  },
  title: {
    marginBottom: '10px',
  },
  divider: {
    margin: '10px auto 10px auto',
  },
  link: { color: theme.palette.secondary.main },
}))

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

  const handleGitHub = () => {
    window.open(
      'https://github.com/Noldyman/Chemprove_H-NMR-common-residues-and-solvents',
      '_blank'
    )
  }

  return (
    <Dialog open={contactIsOpen} onClose={onClose} fullWidth>
      <div className={classes.content}>
        <Typography className={classes.title} variant="h5" align="center">
          Contact
        </Typography>
        <Divider className={classes.divider} />
        <Typography align="center">
          For questions, suggestions or bug reports, don't hesitate to send an
          email to{' '}
          <a className={classes.link} href="mailto:info@chemprove.com">
            info@chemprove.com
          </a>
          . Keep in mind that this is a 'hobby' project, so it might take a
          while before you get a response. <br />
          <br />
          The data that was used for the common residue table is available on
          GitHub.
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
          <Button
            startIcon={<GitHub />}
            variant="outlined"
            color="secondary"
            onClick={handleGitHub}
          >
            Github
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
