import React from 'react'
import { makeStyles, TableHead, TableRow, TableCell } from '@material-ui/core'
import { IColumnObj } from './AppTable'

const useStyles = makeStyles({
  headerText: {
    fontWeight: 'bold',
  },
})

interface AppTableHeadProps {
  columns: IColumnObj[]
}

const AppTableHead: React.FC<AppTableHeadProps> = ({ columns }) => {
  const classes = useStyles()

  return (
    <TableHead>
      <TableRow>
        {columns.map((column, key) => (
          <TableCell className={classes.headerText} key={key}>
            {column.label || null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export { AppTableHead }
