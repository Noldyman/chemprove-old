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

interface CommonResidueFiltersProps {}

const CommonResidueFilters: React.FC<CommonResidueFiltersProps> = () => {
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

  const multiplicities = ['m', 's', 'd', 't', 'q', 'dd']

  const renderMenuItems = (Arr: string[]) => {
    return (
      <span>
        <MenuItem value="" key={uuidv4()}></MenuItem>
        {Arr.map((c) => (
          <MenuItem value={c.toLocaleLowerCase()} key={uuidv4()}>
            {c}
          </MenuItem>
        ))}
      </span>
    )
  }

  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        size="small"
        color="secondary"
        label="Residue name"
      />
      <TextField
        select
        variant="outlined"
        size="small"
        color="secondary"
        label="Solvent"
      >
        {renderMenuItems(nmrSolvents)}
      </TextField>
      <TextField
        variant="outlined"
        size="small"
        color="secondary"
        type="number"
        label="Chemical shift"
      />
      <TextField
        variant="outlined"
        size="small"
        color="secondary"
        type="number"
        label="Deviation"
      />
      <TextField
        select
        variant="outlined"
        size="small"
        color="secondary"
        label="Multiplicity"
      >
        {renderMenuItems(multiplicities)}
      </TextField>
    </div>
  )
}

export { CommonResidueFilters }
