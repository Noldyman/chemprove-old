import React from 'react'
import { makeStyles, TextField, MenuItem } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles({
  root: {
    margin: '20px auto 15px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})

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
}

const CommonResidueFilters: React.FC<CommonResidueFiltersProps> = ({
  filters,
  onChangeFilters,
}) => {
  const classes = useStyles()

  const nmrSolvents = [
    'Chloroform d',
    'Acetone d6',
    'DMSO d6',
    'Benzene d6',
    'Acetonitrile d3',
    'Methanol d4',
    'Water d2',
  ]

  const multiplicities = ['s', 'd', 't', 'q', 'm']

  const renderMenuItems = (Arr: string[]) => {
    const menuItems = Arr.map((c) => (
      <MenuItem value={c.toLocaleLowerCase()} key={uuidv4()}>
        {c}
      </MenuItem>
    ))
    return [
      <MenuItem value="none" key={uuidv4()}>
        <em>None</em>
      </MenuItem>,
      ...menuItems,
    ]
  }

  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        size="small"
        color="secondary"
        label="Residue name"
        name="residueName"
        value={filters.residueName}
        onChange={(event) => onChangeFilters(event)}
      />
      <TextField
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
        variant="outlined"
        size="small"
        color="secondary"
        type="number"
        label="Chemical shift"
        name="chemShift"
        value={filters.chemShift}
        onChange={(event) => onChangeFilters(event)}
      />
      <TextField
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
    </div>
  )
}

export { CommonResidueFilters }
