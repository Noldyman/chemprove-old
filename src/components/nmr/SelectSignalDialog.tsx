import React from 'react'
import {
  makeStyles,
  Dialog,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
} from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'
import { ICommonResidue, ISignalObj } from '../../data/H_NMR_RESIDUES'
import { NmrSolvents } from './CommonResidues'
import { nmrSolvents } from './CommonResidueFilters'

const useStyles = makeStyles({
  content: {
    padding: '10px',
  },
  title: {
    marginBottom: '10px',
  },
  selector: {
    width: '40%',
    margin: '10px auto 0px auto',
  },
  divider: {
    margin: '10px auto 10px auto',
  },
  tableHead: {
    width: '25%',
    fontWeight: 'bold',
  },
})

interface SelectSignalDialogProps {
  residue: ICommonResidue | null
  selectedSolvent: string
  onSolventChange: (value: string) => void
  onClose: () => void
  onSelectSignal: (residue: ICommonResidue, signalIndex: number) => void
}

const SelectSignalDialog: React.FC<SelectSignalDialogProps> = ({
  residue,
  selectedSolvent,
  onSolventChange,
  onClose,
  onSelectSignal,
}) => {
  const classes = useStyles()

  const renderChemShifts = (signal: ISignalObj) => {
    const chemShift = signal.chemShifts[selectedSolvent as NmrSolvents]
    if (chemShift) {
      if (typeof chemShift === 'object') {
        return `${chemShift.highShift.toFixed(
          2
        )} - ${chemShift.lowShift.toFixed(2)}`
      }
      return chemShift.toFixed(2)
    }
    return null
  }

  if (residue) {
    return (
      <Dialog fullWidth open={Boolean(residue)} onClose={onClose}>
        <div className={classes.content}>
          <Typography className={classes.title} variant="h5" align="center">
            {residue.compound}
          </Typography>
          <Typography align="center">
            Select the signal that you would like to use in the NMR residue
            calculator.
          </Typography>
          <div className={classes.selector}>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              label="Solvent"
              value={selectedSolvent}
              onChange={(event) =>
                onSolventChange(event.target.value as NmrSolvents)
              }
            >
              {nmrSolvents.map((s) => (
                <MenuItem key={uuidv4()} value={s.value}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Divider className={classes.divider} />
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell key={uuidv4()} />
                <TableCell className={classes.tableHead} key={uuidv4()}>
                  Formula
                </TableCell>
                <TableCell className={classes.tableHead} key={uuidv4()}>
                  Multiplicity
                </TableCell>
                <TableCell className={classes.tableHead} key={uuidv4()}>
                  Protons
                </TableCell>
                <TableCell className={classes.tableHead} key={uuidv4()}>
                  Chem. shift
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {residue.signals.map((s, i) => (
                <TableRow
                  key={uuidv4()}
                  hover
                  onClick={() => onSelectSignal(residue, i)}
                >
                  <TableCell key={uuidv4()}>
                    <KeyboardArrowRight />
                  </TableCell>
                  <TableCell key={uuidv4()}>{s.proton.formula}</TableCell>
                  <TableCell key={uuidv4()}>{s.proton.multiplicity}</TableCell>
                  <TableCell key={uuidv4()}>{s.proton.amount}H</TableCell>
                  <TableCell key={uuidv4()}>{renderChemShifts(s)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider className={classes.divider} />
          <DialogActions style={{ padding: '0px' }}>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    )
  }
  return null
}

export { SelectSignalDialog }
