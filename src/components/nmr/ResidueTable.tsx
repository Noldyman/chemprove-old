import React from 'react'
import _ from 'lodash'
import { makeStyles, TextField, IconButton } from '@material-ui/core'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import { Delete } from '@material-ui/icons'
import { AppTable } from '../common/AppTable'
import { IColumnObj } from '../common/AppTable'
import { IResidue } from './NmrResiduePage'
import {
  H_NMR_COMMON_RESIDUES,
  ICommonResidue,
} from '../../data/H_NMR_RESIDUES'

const useStyles = makeStyles({
  autocomplete: {
    width: 300,
    '@media (max-width: 1100px)': {
      width: 280,
    },
    '@media (max-width: 900px)': {
      width: 250,
    },
    '@media (max-width: 800px)': {
      width: 220,
    },
  },
})

interface ResidueTableProps {
  data: IResidue[]
  onDelete: (item: IResidue) => void
  onResidueChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: any
  ) => void
  onSelectResidue: (residue: ICommonResidue | null, item: IResidue) => void
}

const ResidueTable: React.FC<ResidueTableProps> = ({
  data,
  onDelete,
  onResidueChange,
  onSelectResidue,
}) => {
  const classes = useStyles()
  const selectableResidues = _.tail(H_NMR_COMMON_RESIDUES)

  const getAutocompleteValue = (resId: string) => {
    const residue = selectableResidues.filter((r) => r.id === resId)[0]
    if (residue) {
      return residue
    }
    return null
  }

  const columns: IColumnObj[] = [
    {
      label: 'Residue',
      path: 'residue',
      content: (item, value) => (
        <Autocomplete
          className={classes.autocomplete}
          size="small"
          id={value}
          value={getAutocompleteValue(value)}
          options={selectableResidues}
          getOptionLabel={(option) => option.compound}
          filterOptions={createFilterOptions({
            stringify: (option) => option.compound + option.trivialNames,
          })}
          onChange={(event, params) => onSelectResidue(params, item)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select residue"
              color="secondary"
            />
          )}
        />
      ),
    },
    {
      label: 'Mol. weight (g/mol)',
      path: 'molWeight',
      content: (item, value) => (
        <TextField
          size="small"
          color="secondary"
          inputProps={{ maxLength: 10 }}
          name="molWeight"
          value={value}
          onChange={(event) => onResidueChange(event, item)}
          onFocus={(event) => event.target.select()}
        />
      ),
    },
    {
      label: 'Number of protons',
      path: 'numOfProtons',
      content: (item, value) => (
        <TextField
          size="small"
          color="secondary"
          inputProps={{ maxLength: 3 }}
          name="numOfProtons"
          value={value}
          onChange={(event) => onResidueChange(event, item)}
          onFocus={(event) => event.target.select()}
        />
      ),
    },
    {
      label: 'Integral',
      path: 'integral',
      content: (item, value) => (
        <TextField
          size="small"
          color="secondary"
          inputProps={{ maxLength: 10 }}
          name="integral"
          value={value}
          onChange={(event) => onResidueChange(event, item)}
          onFocus={(event) => event.target.select()}
        />
      ),
    },
    {
      label: 'mol%',
      path: 'purity.molPercent',
      content: (item, value: string) => (
        <span>
          {!isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : '-'}
        </span>
      ),
    },
    {
      label: 'wt%',
      path: 'purity.wtPercent',
      content: (item, value: string) => (
        <span>
          {!isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : '-'}
        </span>
      ),
    },
    {
      content: (item) => (
        <IconButton onClick={() => onDelete(item)} color="secondary">
          <Delete />
        </IconButton>
      ),
    },
  ]

  return <AppTable columns={columns} data={data} />
}

export { ResidueTable }
