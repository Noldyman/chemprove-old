import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { IColumnObj } from './AppTable'

interface AppTableHeadProps {
  columns: IColumnObj[]
}

const AppTableHead: React.FC<AppTableHeadProps> = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, key) => (
          <TableCell key={key}>{column.label || null}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export { AppTableHead }
