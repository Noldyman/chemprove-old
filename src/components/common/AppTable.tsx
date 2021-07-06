import React from 'react'
import { Table } from '@material-ui/core'
import { AppTableHead } from './AppTableHead'
import { AppTableBody } from './AppTableBody'

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
  return (
    <Table stickyHeader>
      <AppTableHead columns={columns} />
      <AppTableBody columns={columns} data={data} />
    </Table>
  )
}

export { AppTable }
