import React from 'react'
import { makeStyles, TableHead, TableRow, TableCell } from '@material-ui/core'
import { IColumnObj } from './AppTable'

const useStyles = makeStyles((theme) => {
  const dividerColor = theme.palette.divider
  return {
    cell: {
      boxShadow: `0px 1px ${dividerColor}`,
      // color: theme.palette.divider,
      // inset: 'shadow',
    },
  }
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
          <TableCell className={classes.cell} key={key}>
            <b>{column.label || null}</b>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export { AppTableHead }
