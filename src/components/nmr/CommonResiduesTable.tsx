import React, { useState } from 'react'
import { makeStyles, IconButton, Tooltip } from '@material-ui/core'
import { InfoOutlined, PlaylistAdd } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { AppTable, IColumnObj } from '../common/AppTable'
import { ICommonResidue, ISignalObj } from '../../data/H_NMR_RESIDUES'
import { IFilters, NmrSolvents } from './CommonResidues'
import { ResidueInfoPopover } from './ResidueInfoPopover'

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
  selectedSolvent: string
  onAddResidue: (item: ICommonResidue) => void
  filteredData: ICommonResidue[]
  filters: IFilters
}

const CommonResiduesTable: React.FC<CommonResiduesTableProps> = ({
  selectedSolvent,
  onAddResidue,
  filteredData,
  filters,
}) => {
  const classes = useStyles()

  const [residueInfo, setResidueInfo] = useState<ICommonResidue | null>(null)
  const [infoAnchorElement, setInfoAnchorElement] =
    useState<HTMLDivElement | null>(null)

  const handleOpenResInfo = async (
    event: React.MouseEvent<HTMLDivElement>,
    residue: ICommonResidue
  ) => {
    await setInfoAnchorElement(event.currentTarget)
    setResidueInfo(residue)
  }

  const checkFilterHit = (signal: ISignalObj, path: string) => {
    if (filters.chemShift) {
      const currentValue = _.get(signal, path)
      const filterShift = parseFloat(filters.chemShift)
      const filterDev = parseFloat(filters.deviation) || 0

      if (filters.multiplicity) {
        if (typeof currentValue === 'object') {
          if (
            path.includes(selectedSolvent as NmrSolvents) &&
            signal.proton.multiplicity === filters.multiplicity &&
            currentValue &&
            currentValue.highShift >= filterShift - filterDev &&
            currentValue.lowShift <= filterShift + filterDev
          )
            return true
        } else {
          if (
            path.includes(selectedSolvent as NmrSolvents) &&
            signal.proton.multiplicity === filters.multiplicity &&
            currentValue &&
            currentValue >= filterShift - filterDev &&
            currentValue <= filterShift + filterDev
          )
            return true
        }
      } else {
        if (typeof currentValue === 'object') {
          if (
            path.includes(selectedSolvent as NmrSolvents) &&
            currentValue &&
            currentValue.highShift >= filterShift - filterDev &&
            currentValue.lowShift <= filterShift + filterDev
          )
            return true
        } else {
          if (
            path.includes(selectedSolvent as NmrSolvents) &&
            currentValue &&
            currentValue >= filterShift - filterDev &&
            currentValue <= filterShift + filterDev
          )
            return true
        }
      }
    }
  }

  const renderChemShifts = (item: ICommonResidue, path: string) => {
    if (item.signals.find((signal) => _.get(signal, path) === undefined)) {
      return <span>No data available</span>
    }
    return (
      <div style={{ lineHeight: 2 }}>
        {item.signals.map((signal) => {
          const value = _.get(signal, path)
          if (value && typeof value === 'object') {
            return (
              <span
                key={uuidv4()}
                className={
                  item.compound !== 'Solvent peak' &&
                  checkFilterHit(signal, path)
                    ? classes.filterHit
                    : classes.standardValue
                }
              >
                {`${value.highShift.toFixed(2)} - ${value.lowShift.toFixed(2)}`}
                <br />
              </span>
            )
          }
          return (
            <span
              key={uuidv4()}
              className={
                item.compound !== 'Solvent peak' && checkFilterHit(signal, path)
                  ? classes.filterHit
                  : classes.standardValue
              }
            >
              {value ? value.toFixed(2) : '-'}
              {/* I know, very ugly...  check if is MeCN in CDCl3, cause its the only chemshift with a comment. */}
              {selectedSolvent === 'chloroform_d' &&
              item.compound === 'Acetonitrile'
                ? '*'
                : null}
              <br />
            </span>
          )
        })}
      </div>
    )
  }

  const renderStackableItems = (item: ICommonResidue, path: string) => (
    <div style={{ lineHeight: 2 }}>
      {item.signals.map((signal) => (
        <span key={uuidv4()}>
          {_.get(signal, path)}
          {path.includes('amount') && item.compound !== 'Solvent peak'
            ? 'H'
            : null}
          <br />
        </span>
      ))}
    </div>
  )

  const columns: IColumnObj[] = [
    {
      label: 'Residue',
      path: 'compound',
    },
    {
      content: (item) => {
        if (item.smiles) {
          return (
            <div
              style={{ width: 'fit-content' }}
              onClick={(event) => handleOpenResInfo(event, item)}
            >
              <Tooltip
                key={uuidv4()}
                arrow
                placement="top"
                title="Show residue information"
              >
                <IconButton color="secondary">
                  <InfoOutlined />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
        return null
      },
    },
    {
      label: 'Proton',
      path: 'signals',
      content: (item, value) => renderStackableItems(item, 'proton.formula'),
    },
    {
      label: 'Multiplicity',
      path: 'signals',

      content: (item, value) =>
        renderStackableItems(item, 'proton.multiplicity'),
    },
    {
      label: 'Number of protons',
      path: 'signals',

      content: (item, value) => renderStackableItems(item, 'proton.amount'),
    },
    {
      label: 'Chemical shift (PPM)',
      path: 'signals',
      content: (item, value) =>
        renderChemShifts(item, `chemShifts.${selectedSolvent as NmrSolvents}`),
    },
    {
      content: (item) => {
        if (item.compound !== 'Solvent peak') {
          return (
            <Tooltip
              key={uuidv4()}
              arrow
              placement="left"
              title="Add to NMR residue calculator"
            >
              <IconButton
                onClick={() => {
                  onAddResidue(item)
                }}
                color="secondary"
              >
                <PlaylistAdd />
              </IconButton>
            </Tooltip>
          )
        }
        return null
      },
    },
  ]

  return (
    <div>
      <AppTable columns={columns} data={filteredData} />
      <ResidueInfoPopover
        residue={residueInfo}
        onClose={() => setResidueInfo(null)}
        anchorEl={infoAnchorElement}
      />
    </div>
  )
}

export { CommonResiduesTable }
