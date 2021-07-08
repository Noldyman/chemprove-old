import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IconButton } from '@material-ui/core'
import { PlaylistAdd } from '@material-ui/icons'
import { AppTable, IColumnObj } from '../common/AppTable'
import {
  H_NMR_COMMON_RESIDUES,
  ICommonResidue,
  ISignalObj,
} from '../../data/H_NMR_RESIDUES'
import _ from 'lodash'

const renderStackableValues = (value: ISignalObj[], path: string) => {
  return (
    <div>
      {value.map((signal) => (
        <span key={uuidv4()}>
          {_.get(signal, path)}
          <br />
        </span>
      ))}
    </div>
  )
}

interface CommonResiduesTableProps {
  onAddResidue: (item: ICommonResidue) => void
}

const CommonResiduesTable: React.FC<CommonResiduesTableProps> = ({
  onAddResidue,
}) => {
  const columns: IColumnObj[] = [
    {
      label: 'Residue',
      path: 'compound',
    },
    {
      label: 'Proton',
      path: 'signals',
      content: (item, value) => renderStackableValues(value, 'proton.formula'),
    },
    {
      label: 'Mult.',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'proton.multiplicity'),
    },
    {
      label: `Chloroform d`,
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'chemShifts.chloroform_d'),
    },
    {
      label: 'Acetone d6',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'chemShifts.acetone_d6'),
    },
    {
      label: 'DMSO d6',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'chemShifts.dmso_d6'),
    },
    {
      label: 'Benzene d6',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'chemShifts.benzene_d6'),
    },
    {
      label: 'Acetonitrile d3',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'chemShifts.acetonitrile_d3'),
    },
    {
      label: 'Methanol d4',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'chemShifts.methanol_d4'),
    },
    {
      label: 'Water d2',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(value, 'chemShifts.water_d2'),
    },
    {
      content: (item) => {
        if (item.compound !== 'Solvent peaks') {
          return (
            <IconButton
              onClick={() => {
                onAddResidue(item)
              }}
              color="secondary"
            >
              <PlaylistAdd />
            </IconButton>
          )
        }
        return null
      },
    },
  ]

  return <AppTable columns={columns} data={H_NMR_COMMON_RESIDUES} />
}

export { CommonResiduesTable }
