import React from 'react'
import { Table } from '@material-ui/core'
import { AppTableHead } from './AppTableHead'
import { AppTableBody } from './AppTableBody'

export interface IDataObj {
  id: string
}

export interface IColumnObj {
  label?: string
  path?: string
  content?: (
    item: IDataObj,
    value?: string | number | boolean
  ) => JSX.Element | React.FC
}

interface AppTableProps {
  columns: IColumnObj[]
  data: IDataObj[]
}

const AppTable: React.FC<AppTableProps> = ({ columns, data }) => {
  return (
    <Table stickyHeader>
      <AppTableHead columns={columns} />
      <AppTableBody columns={columns} data={data} />
    </Table>
  )
}

export { AppTable }
