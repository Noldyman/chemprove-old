import React from 'react'
import { Select, MenuItem, TextField, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { AppTable } from '../common/AppTable'
import { IColumnObj } from '../common/AppTable'
import { IResidue } from './ResidueCalculator'

interface ResidueTableProps {
  data: IResidue[]
  onDelete: (item: IResidue) => void
  onResidueChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: IResidue
  ) => void
}

const ResidueTable: React.FC<ResidueTableProps> = ({
  data,
  onDelete,
  onResidueChange,
}) => {
  const columns: IColumnObj[] = [
    {
      label: 'Residue',
      path: 'residue',
      content: (item, value) => {
        return (
          <Select value={value} color="secondary">
            <MenuItem value="unknown">
              <em>Unknown</em>
            </MenuItem>
          </Select>
        )
      },
    },
    {
      label: 'Mol. weight (g/mol)',
      path: 'molWeight',
      content: (item, value) => (
        <TextField
          color="secondary"
          size="small"
          type="number"
          name="molWeight"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onResidueChange(event, item)
          }
          onFocus={(event) => event.target.select()}
        />
      ),
    },
    {
      label: 'Number of protons',
      path: 'numOfProtons',
      content: (item, value) => (
        <TextField
          color="secondary"
          size="small"
          type="number"
          name="numOfProtons"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onResidueChange(event, item)
          }
          onFocus={(event) => event.target.select()}
        />
      ),
    },
    {
      label: 'Integral',
      path: 'integral',
      content: (item, value) => (
        <TextField
          color="secondary"
          size="small"
          type="number"
          name="integral"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onResidueChange(event, item)
          }
          onFocus={(event) => event.target.select()}
        />
      ),
    },
    {
      label: 'mol%',
      path: 'purity.molPercent',
      content: (item, value) => (
        <span>
          {typeof value === 'number' && !isNaN(value) ? value.toFixed(2) : '-'}
        </span>
      ),
    },
    {
      label: 'wt%',
      path: 'purity.wtPercent',
      content: (item, value) => (
        <span>
          {typeof value === 'number' && !isNaN(value) ? value.toFixed(2) : '-'}
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
