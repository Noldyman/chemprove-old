import React, { useState } from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import { Bookmarks } from '@material-ui/icons'
import _ from 'lodash'
import {
  H_NMR_COMMON_RESIDUES,
  ICommonResidue,
} from '../../data/H_NMR_RESIDUES'
import { ContentBox } from '../common/ContentBox'
import { AppDivider } from '../common/AppDivider'
import { CommonResiduesTable } from './CommonResiduesTable'
import { CommonResidueFilters } from './CommonResidueFilters'
import { SourcesDialog } from './SourcesDialog'

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
  chemShift: string
  deviation: string
  multiplicity: Multiplicities
}

interface CommonResiduesProps {
  onAddResidue: (residue: ICommonResidue) => void
  selectedSolvent: string
  onChangeSolvent: (value: string) => void
}

const CommonResidues: React.FC<CommonResiduesProps> = ({
  onAddResidue,
  selectedSolvent,
  onChangeSolvent,
}) => {
  const classes = useStyles()

  const [filters, setFilters] = useState<IFilters>({
    residueName: '',
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

      if (filters.multiplicity) {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            const chemShiftAtSolvent =
              sig.chemShifts[selectedSolvent as NmrSolvents]
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
      } else {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            const chemShiftAtSolvent =
              sig.chemShifts[selectedSolvent as NmrSolvents]
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
      }
      data = data.filter((res) => matchingResidueId.includes(res.id))
    }
    return [H_NMR_COMMON_RESIDUES[0], ...data]
  }

  return (
    <div className={classes.root}>
      <ContentBox title="Common residues in standard NMR solvents">
        <Typography align="center">
          This table shows the chemical shifts of common solvents and residues
          in <sup>1</sup>H NMR spectroscopy. Select the deuterated solvent that
          was used for your analysis. Most commonly used NMR solvents are
          included. In order to identify your residues, the data can be filtered
          by name or chemical shift. When a residue is identified, it can be
          added to the NMR residue calculator by clicking the add button.
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
          selectedSolvent={selectedSolvent}
          onChangeSolvent={onChangeSolvent}
          onChangeFilters={handleChangeFilters}
          onClearFilters={handleClearFilters}
        />
        <div className={classes.table}>
          <CommonResiduesTable
            selectedSolvent={selectedSolvent}
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
