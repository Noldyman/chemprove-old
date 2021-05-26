import React from 'react'
import { Select, MenuItem, TextField, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { AppTable } from '../common/AppTable'
import { IColumnObj } from '../common/AppTable'

interface ResidueTableProps {}

const ResidueTable: React.FC<ResidueTableProps> = () => {
  // not complete. onClick and onChange events need to be handled
  const columns: IColumnObj[] = [
    {
      label: 'Residue',
      path: 'residue',
      content: (item, value) => {
        console.log(value)
        return (
          <Select value={value}>
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
      content: (item, value) => <TextField size="small" value={value} />,
    },
    {
      label: 'Number of protons',
      path: 'numOfProtons',
      content: (item, value) => <TextField size="small" value={value} />,
    },
    {
      label: 'Integral',
      path: 'integral',
      content: (item, value) => <TextField size="small" value={value} />,
    },
    { label: 'mol%', path: 'purity.molPercent' },
    { label: 'wt%', path: 'purity.wtPercent' },
    {
      content: (item) => (
        <IconButton>
          <Delete />
        </IconButton>
      ),
    },
  ]

  //This is fake data..
  const data = [
    {
      id: 'uniekeID',
      residue: 'unknown',
      molWeight: 80.9,
      numOfProtons: 2,
      integral: 0.29,
      purity: { molPercent: 10, wtPercent: 90 },
    },
    {
      id: 'uniekeID2',
      residue: 'unknown',
      molWeight: 67.1,
      numOfProtons: 3,
      integral: 0.12,
      purity: { molPercent: 80, wtPercent: 90 },
    },
  ]

  return <AppTable columns={columns} data={data} />
}

export { ResidueTable }
