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
