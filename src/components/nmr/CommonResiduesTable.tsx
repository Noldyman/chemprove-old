import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles, IconButton } from '@material-ui/core'
import { PlaylistAdd } from '@material-ui/icons'
import { AppTable, IColumnObj } from '../common/AppTable'
import { ICommonResidue, ISignalObj } from '../../data/H_NMR_RESIDUES'
import _ from 'lodash'
import { IFilters } from './CommonResidues'

const useStyles = makeStyles((theme) => ({
  filterHit: {
    padding: '2px',
    borderRadius: '5px',
    border: '2px solid',
    borderColor: theme.palette.warning.main,
  },
  standardValue: {
    padding: '4px',
  },
  protonField: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

interface CommonResiduesTableProps {
  onAddResidue: (item: ICommonResidue) => void
  filteredData: ICommonResidue[]
  filters: IFilters
}

const CommonResiduesTable: React.FC<CommonResiduesTableProps> = ({
  onAddResidue,
  filteredData,
  filters,
}) => {
  const classes = useStyles()

  const checkFilterHit = (signal: ISignalObj, path: string) => {
    if (filters.chemShift) {
      const currentValue = _.get(signal, path)
      const shift = parseFloat(filters.chemShift)
      const dev = parseFloat(filters.deviation) || 0

      if (filters.solvent && filters.multiplicity) {
        if (
          path.includes(filters.solvent) &&
          signal.proton.multiplicity === filters.multiplicity &&
          currentValue &&
          currentValue >= shift - dev &&
          currentValue <= shift + dev
        )
          return true
      } else if (filters.solvent) {
        if (
          path.includes(filters.solvent) &&
          currentValue &&
          currentValue >= shift - dev &&
          currentValue <= shift + dev
        )
          return true
      } else if (filters.multiplicity) {
        if (
          signal.proton.multiplicity === filters.multiplicity &&
          currentValue &&
          currentValue >= shift - dev &&
          currentValue <= shift + dev
        )
          return true
      } else {
        if (
          currentValue &&
          currentValue >= shift - dev &&
          currentValue <= shift + dev
        )
          return true
      }
    }
  }

  const renderStackableValues = (item: ICommonResidue, path: string) => {
    return (
      <div>
        {item.signals.map((signal) => (
          <span
            key={uuidv4()}
            className={
              item.compound !== 'Solvent peaks' && checkFilterHit(signal, path)
                ? classes.filterHit
                : classes.standardValue
            }
          >
            {typeof _.get(signal, path) === 'number'
              ? _.get(signal, path).toFixed(2)
              : _.get(signal, path)}
            <br />
          </span>
        ))}
      </div>
    )
  }

  const renderMultiplicities = (item: ICommonResidue) => {
    return (
      <div>
        {item.signals.map((signal) => {
          if (item.compound !== 'Solvent peaks') {
            return (
              <span key={uuidv4()}>
                {signal.proton.multiplicity} ({signal.proton.amount}H)
                <br />
              </span>
            )
          }
          return null
        })}
      </div>
    )
  }

  const columns: IColumnObj[] = [
    {
      label: 'Residue',
      path: 'compound',
    },
    {
      label: 'Proton',
      path: 'signals',
      content: (item, value) => renderStackableValues(item, 'proton.formula'),
    },
    {
      label: 'Mult.',
      path: 'signals',

      content: (item, value) => renderMultiplicities(item),
    },
    {
      label: `Chloroform d`,
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(item, 'chemShifts.chloroform_d'),
    },
    {
      label: 'Acetone d6',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(item, 'chemShifts.acetone_d6'),
    },
    {
      label: 'DMSO d6',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(item, 'chemShifts.dmso_d6'),
    },
    {
      label: 'Benzene d6',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(item, 'chemShifts.benzene_d6'),
    },
    {
      label: 'Acetonitrile d3',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(item, 'chemShifts.acetonitrile_d3'),
    },
    {
      label: 'Methanol d4',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(item, 'chemShifts.methanol_d4'),
    },
    {
      label: 'Water d2',
      path: 'signals',
      content: (item, value) =>
        renderStackableValues(item, 'chemShifts.water_d2'),
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

  return <AppTable columns={columns} data={filteredData} />
}

export { CommonResiduesTable }
