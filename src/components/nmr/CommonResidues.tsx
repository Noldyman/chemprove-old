import React, { useState } from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import { Bookmarks } from '@material-ui/icons'
import { ContentBox } from '../common/ContentBox'
import { CommonResiduesTable } from './CommonResiduesTable'
import {
  H_NMR_COMMON_RESIDUES,
  ICommonResidue,
} from '../../data/H_NMR_RESIDUES'
import { CommonResidueFilters } from './CommonResidueFilters'
import _ from 'lodash'
import { SourcesDialog } from './SourcesDialog'
import { AppDivider } from '../common/AppDivider'

const useStyles = makeStyles({
  root: {
    margin: '20px 0px 20px 0px',
  },
  table: {
    margin: '20px auto 20px auto',
  },
  divider: {
    margin: '10px auto 10px auto',
  },
  sources: {
    margin: 'auto',
    marginTop: '15px',
    width: '50%',
  },
})

export type NmrSolvents =
  | ''
  | 'chloroform_d'
  | 'acetone_d6'
  | 'dmso_d6'
  | 'benzene_d6'
  | 'acetonitrile_d3'
  | 'methanol_d4'
  | 'water_d2'

type Multiplicities = '' | 's' | 'd' | 't' | 'q' | 'm'

export interface IFilters {
  residueName: string
  solvent: NmrSolvents
  chemShift: string
  deviation: string
  multiplicity: Multiplicities
}

interface CommonResiduesProps {
  onAddResidue: (residue: ICommonResidue) => void
}

const CommonResidues: React.FC<CommonResiduesProps> = ({ onAddResidue }) => {
  const classes = useStyles()

  const [filters, setFilters] = useState<IFilters>({
    residueName: '',
    solvent: '',
    chemShift: '',
    deviation: '',
    multiplicity: '',
  })
  const [sourceDialogIsOpen, setSourceDialogIsOpen] = useState(false)

  const handleChangeFilters = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const targetName = event.target.name
    let enteredValue = event.target.value

    if (targetName === 'chemShift' || targetName === 'deviation') {
      enteredValue = enteredValue.replace(',', '.')
      if (enteredValue.match(/[^0-9.]/g)) return
      if (enteredValue.match(/[.]/g) && enteredValue.match(/[.]/g)!.length > 1)
        return
    }

    if (targetName === 'chemShift' && !filters.deviation) {
      setFilters((prevValue) => ({
        ...prevValue,
        chemShift: event.target.value,
        deviation: '0.1',
      }))
    }
    setFilters((prevValue) => {
      return { ...prevValue, [targetName]: enteredValue }
    })
  }
  const handleClearFilters = () => {
    setFilters({
      residueName: '',
      solvent: '',
      chemShift: '',
      deviation: '',
      multiplicity: '',
    })
  }

  const filterData = () => {
    let data = _.tail(H_NMR_COMMON_RESIDUES)

    if (filters.residueName) {
      data = data.filter(
        (res) =>
          res.compound
            .toLocaleLowerCase()
            .includes(filters.residueName.toLocaleLowerCase()) ||
          res.trivialNames
            .toLocaleLowerCase()
            .includes(filters.residueName.toLocaleLowerCase())
      )
    } else if (filters.chemShift) {
      const matchingResidueId: string[] = []
      const shift = parseFloat(filters.chemShift)
      const dev = parseFloat(filters.deviation) || 0

      if (isNaN(parseFloat(filters.chemShift)))
        return [H_NMR_COMMON_RESIDUES[0], ...data]

      if (filters.solvent && filters.multiplicity) {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            if (filters.solvent === '') return
            const chemShiftAtSolvent = sig.chemShifts[filters.solvent]
            if (typeof chemShiftAtSolvent === 'object') {
              if (
                sig.proton.multiplicity === filters.multiplicity &&
                chemShiftAtSolvent &&
                chemShiftAtSolvent.highShift >= shift - dev &&
                chemShiftAtSolvent.lowShift <= shift + dev
              ) {
                matchingResidueId.push(res.id)
              }
            } else {
              if (
                sig.proton.multiplicity === filters.multiplicity &&
                chemShiftAtSolvent &&
                chemShiftAtSolvent >= shift - dev &&
                chemShiftAtSolvent <= shift + dev
              ) {
                matchingResidueId.push(res.id)
              }
            }
          })
        })
      } else if (filters.solvent) {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            if (filters.solvent === '') return
            const chemShiftAtSolvent = sig.chemShifts[filters.solvent]
            if (typeof chemShiftAtSolvent === 'object') {
              if (
                chemShiftAtSolvent &&
                chemShiftAtSolvent.highShift >= shift - dev &&
                chemShiftAtSolvent.lowShift <= shift + dev
              ) {
                matchingResidueId.push(res.id)
              }
            } else {
              if (
                chemShiftAtSolvent &&
                chemShiftAtSolvent >= shift - dev &&
                chemShiftAtSolvent <= shift + dev
              ) {
                matchingResidueId.push(res.id)
              }
            }
          })
        })
      } else if (filters.multiplicity) {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            _.values(sig.chemShifts).forEach((chemShift) => {
              if (typeof chemShift === 'object') {
                if (
                  sig.proton.multiplicity === filters.multiplicity &&
                  chemShift &&
                  chemShift.highShift >= shift - dev &&
                  chemShift.lowShift <= shift + dev
                ) {
                  matchingResidueId.push(res.id)
                }
              } else {
                if (
                  sig.proton.multiplicity === filters.multiplicity &&
                  chemShift &&
                  chemShift >= shift - dev &&
                  chemShift <= shift + dev
                ) {
                  matchingResidueId.push(res.id)
                }
              }
            })
          })
        })
      } else {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            _.values(sig.chemShifts).forEach((chemShift) => {
              if (typeof chemShift === 'object') {
                if (
                  chemShift &&
                  chemShift.highShift >= shift - dev &&
                  chemShift.lowShift <= shift + dev
                ) {
                  matchingResidueId.push(res.id)
                }
              } else {
                if (
                  chemShift &&
                  chemShift >= shift - dev &&
                  chemShift <= shift + dev
                ) {
                  matchingResidueId.push(res.id)
                }
              }
            })
          })
        })
      }

      data = data.filter((res) => matchingResidueId.includes(res.id))
    }

    return [H_NMR_COMMON_RESIDUES[0], ...data]
  }

  return (
    <div className={classes.root}>
      <ContentBox title="Common residues in standard NMR solvents">
        <Typography align="center">
          This table shows the chemical shifts (PPM) of different residues in
          commonly used NMR solvents. The data can be filtered by name or
          chemical shift. <br />
          Residues can be added to the NMR residue calculator by clicking the
          add button.
        </Typography>
        <div className={classes.sources}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            startIcon={<Bookmarks />}
            onClick={() => setSourceDialogIsOpen(true)}
          >
            View sources
          </Button>
        </div>
        <AppDivider />
        <CommonResidueFilters
          filters={filters}
          onChangeFilters={handleChangeFilters}
          onClearFilters={handleClearFilters}
        />
        <div className={classes.table}>
          <CommonResiduesTable
            onAddResidue={onAddResidue}
            filteredData={filterData()}
            filters={filters}
          />
        </div>
      </ContentBox>
      <SourcesDialog
        open={sourceDialogIsOpen}
        onClose={() => setSourceDialogIsOpen(false)}
      />
    </div>
  )
}

export { CommonResidues }
