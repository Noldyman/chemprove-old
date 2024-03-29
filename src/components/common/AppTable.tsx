import React from 'react'
import { makeStyles, Table } from '@material-ui/core'
import { AppTableHead } from './AppTableHead'
import { AppTableBody } from './AppTableBody'

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '650px',
    overflow: 'auto',
    border: 'solid 1px ',
    borderRadius: '3px',
    borderColor: theme.palette.divider,
  },
}))

export interface IColumnObj {
  label?: string
  path?: string
  content?: (item: any, value?: any) => JSX.Element | React.FC | null
}

interface AppTableProps {
  columns: IColumnObj[]
  data: any[]
}

const AppTable: React.FC<AppTableProps> = ({ columns, data }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Table stickyHeader>
        <AppTableHead columns={columns} />
        <AppTableBody columns={columns} data={data} />
      </Table>
    </div>
  )
}

export { AppTable }
