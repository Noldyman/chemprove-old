import React from 'react'
import {
  makeStyles,
  TextField,
  MenuItem,
  Button,
  Paper,
} from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px auto 20px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resName: {
    width: '35%',
    padding: '10px',
  },
  chemShifts: {
    width: '60%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  chemShiftItem: {
    width: '24%',
  },
  button: {
    margin: 'auto',
    marginBottom: '20px',
    width: '50%',
  },
}))

interface CommonResidueFiltersProps {
  filters: {
    residueName: string
    solvent: string
    chemShift: string
    deviation: string
    multiplicity: string
  }
  onChangeFilters: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onClearFilters: () => void
}

const CommonResidueFilters: React.FC<CommonResidueFiltersProps> = ({
  filters,
  onChangeFilters,
  onClearFilters,
}) => {
  const classes = useStyles()

  const nmrSolvents = [
    { name: 'Chloroform d', value: 'chloroform_d' },
    { name: 'Acetone d6', value: 'acetone_d6' },
    { name: 'DMSO d6', value: 'dmso_d6' },
    { name: 'Benzene d6', value: 'benzene_d6' },
    { name: 'Acetonitrile d3', value: 'acetonitrile_d3' },
    { name: 'Methanol d4', value: 'methanol_d4' },
    { name: 'Water d2', value: 'water_d2' },
  ]

  const multiplicities = [
    { name: 's', value: 's' },
    { name: 'd', value: 'd' },
    { name: 't', value: 't' },
    { name: 'q', value: 'q' },
    { name: 'm', value: 'm' },
  ]

  const renderMenuItems = (Arr: { name: string; value: string }[]) => {
    const menuItems = Arr.map((c) => (
      <MenuItem value={c.value} key={uuidv4()}>
        {c.name}
      </MenuItem>
    ))
    return [
      <MenuItem value="" key={uuidv4()}>
        <em>None</em>
      </MenuItem>,
      ...menuItems,
    ]
  }

  const filtersAreActive = () => {
    if (
      filters.chemShift ||
      filters.deviation ||
      filters.multiplicity ||
      filters.residueName ||
      filters.solvent
    ) {
      return true
    }
    return
  }

  return (
    <div>
      <div className={classes.root}>
        <Paper color="secondary" variant="outlined" className={classes.resName}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            color="secondary"
            label="Residue name"
            name="residueName"
            value={filters.residueName}
            onChange={(event) => onChangeFilters(event)}
          />
        </Paper>
        <Paper
          color="secondary"
          variant="outlined"
          className={classes.chemShifts}
        >
          <TextField
            className={classes.chemShiftItem}
            variant="outlined"
            size="small"
            color="secondary"
            type="number"
            label="Chem. shift"
            name="chemShift"
            value={filters.chemShift}
            onChange={(event) => onChangeFilters(event)}
          />
          <TextField
            className={classes.chemShiftItem}
            variant="outlined"
            size="small"
            color="secondary"
            type="number"
            label="Deviation"
            name="deviation"
            value={filters.deviation}
            onChange={(event) => onChangeFilters(event)}
          />
          <TextField
            className={classes.chemShiftItem}
            select
            variant="outlined"
            size="small"
            color="secondary"
            label="Solvent"
            name="solvent"
            value={filters.solvent}
            onChange={(event) => onChangeFilters(event)}
          >
            {renderMenuItems(nmrSolvents)}
          </TextField>
          <TextField
            className={classes.chemShiftItem}
            select
            variant="outlined"
            size="small"
            color="secondary"
            label="Multiplicity"
            name="multiplicity"
            value={filters.multiplicity}
            onChange={(event) => onChangeFilters(event)}
          >
            {renderMenuItems(multiplicities)}
          </TextField>
        </Paper>
      </div>
      <div className={classes.button}>
        {filtersAreActive() && (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<HighlightOff />}
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}

export { CommonResidueFilters }
