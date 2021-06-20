import React from 'react'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import { IColumnObj } from './AppTable'
import _ from 'lodash'

interface AppTableBodyProps {
  columns: IColumnObj[]
  data: any[]
}

const AppTableBody: React.FC<AppTableBodyProps> = ({ columns, data }) => {
  const renderCell = (item: any, column: IColumnObj) => {
    if (column.content) {
      if (column.path) {
        return column.content(item, _.get(item, column.path))
      }
      return column.content(item)
    } else if (column.path) {
      return _.get(item, column.path)
    }
    throw new Error('Column must contain a content or path prop.')
  }

  return (
    <TableBody>
      {data.map((item, dataKey) => (
        <TableRow key={dataKey}>
          {columns.map((column, columnKey) => (
            <TableCell key={columnKey}>{renderCell(item, column)}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export { AppTableBody }
