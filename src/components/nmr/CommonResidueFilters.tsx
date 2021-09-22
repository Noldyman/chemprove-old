import React from 'react'
import { makeStyles, TextField, MenuItem, Button } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'
import { AppFieldset } from '../common/AppFieldset'
import { AppDivider } from '../common/AppDivider'

const useStyles = makeStyles((theme) => ({
  filters: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    minWidth: '100%',
  },
  solvent: {
    width: '20%',
    padding: '10px',
  },
  resName: {
    width: '35%',
    padding: '10px',
  },
  chemShifts: {
    width: '45%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  chemShiftItem: {
    width: '30%',
  },
  button: {
    margin: '10px auto 10px auto',
    width: '50%',
  },
}))

export const nmrSolvents = [
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

interface CommonResidueFiltersProps {
  filters: {
    residueName: string
    chemShift: string
    deviation: string
    multiplicity: string
  }
  selectedSolvent: string
  onChangeSolvent: (value: string) => void
  onChangeFilters: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onClearFilters: () => void
}

const CommonResidueFilters: React.FC<CommonResidueFiltersProps> = ({
  filters,
  selectedSolvent,
  onChangeSolvent,
  onChangeFilters,
  onClearFilters,
}) => {
  const classes = useStyles()

  const renderMenuItems = (
    Arr: { name: string; value: string }[],
    includeNone: boolean
  ) => {
    const menuItems = Arr.map((c) => (
      <MenuItem value={c.value} key={uuidv4()}>
        {c.name}
      </MenuItem>
    ))
    if (includeNone)
      return [
        <MenuItem value="" key={uuidv4()}>
          <em>None</em>
        </MenuItem>,
        ...menuItems,
      ]
    return [...menuItems]
  }

  const filtersAreActive = () => {
    if (
      filters.chemShift ||
      filters.deviation ||
      filters.multiplicity ||
      filters.residueName
    ) {
      return true
    }
    return
  }

  return (
    <AppFieldset title="Filter residue table">
      <div className={classes.filters}>
        <div className={classes.solvent}>
          <TextField
            fullWidth
            select
            size="small"
            variant="outlined"
            color="secondary"
            label="Solvent"
            name="solvent"
            style={{ textAlign: 'left' }}
            value={selectedSolvent}
            onChange={(event) => onChangeSolvent(event.target.value)}
          >
            {renderMenuItems(nmrSolvents, false)}
          </TextField>
        </div>
        <div>
          <AppDivider vertical={true} />
        </div>
        <div className={classes.resName}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            inputProps={{ maxLength: 50 }}
            label="Residue name"
            name="residueName"
            value={filters.residueName}
            onChange={(event) => onChangeFilters(event)}
          />
        </div>
        <div>
          <AppDivider vertical={true} />
        </div>
        <div className={classes.chemShifts}>
          <TextField
            className={classes.chemShiftItem}
            size="small"
            variant="outlined"
            color="secondary"
            inputProps={{ maxLength: 6 }}
            label="Chem. shift"
            name="chemShift"
            value={filters.chemShift}
            onChange={(event) => onChangeFilters(event)}
          />
          <TextField
            className={classes.chemShiftItem}
            size="small"
            variant="outlined"
            color="secondary"
            inputProps={{ maxLength: 6 }}
            label="Deviation"
            name="deviation"
            value={filters.deviation}
            onChange={(event) => onChangeFilters(event)}
          />
          <TextField
            className={classes.chemShiftItem}
            select
            size="small"
            variant="outlined"
            color="secondary"
            label="Multiplicity"
            name="multiplicity"
            style={{ textAlign: 'left' }}
            value={filters.multiplicity}
            onChange={(event) => onChangeFilters(event)}
          >
            {renderMenuItems(multiplicities, true)}
          </TextField>
        </div>
      </div>
      <div>
        {filtersAreActive() && (
          <div className={classes.button}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<HighlightOff />}
              onClick={onClearFilters}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </AppFieldset>
  )
}

export { CommonResidueFilters }
