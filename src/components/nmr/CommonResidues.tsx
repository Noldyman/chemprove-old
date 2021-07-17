import React, { useState } from 'react'
import { makeStyles, Typography, Divider } from '@material-ui/core'
import { ContentBox } from '../common/ContentBox'
import { CommonResiduesTable } from './CommonResiduesTable'
import {
  H_NMR_COMMON_RESIDUES,
  ICommonResidue,
} from '../../data/H_NMR_RESIDUES'
import { CommonResidueFilters } from './CommonResidueFilters'
import _ from 'lodash'

const useStyles = makeStyles({
  root: {
    margin: '20px 0px 20px 0px',
  },
  table: {
    margin: '20px auto 20px auto',
  },
})

type NmrSolvents =
  | ''
  | 'chloroform_d'
  | 'acetone_d6'
  | 'dmso_d6'
  | 'benzene_d6'
  | 'acetonitrile_d3'
  | 'methanol_d4'
  | 'water_d2'

interface IFilters {
  residueName: string
  solvent: NmrSolvents
  chemShift: string
  deviation: string
  multiplicity: string
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

  const handleChangeFilters = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFilters((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value }
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

      if (filters.solvent && filters.multiplicity) {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            if (filters.solvent === '') return
            const chemShiftAtSolvent = sig.chemShifts[filters.solvent]
            if (
              sig.proton.multiplicity === filters.multiplicity &&
              chemShiftAtSolvent &&
              chemShiftAtSolvent >= shift - dev &&
              chemShiftAtSolvent <= shift + dev
            ) {
              matchingResidueId.push(res.id)
            }
          })
        })
      } else if (filters.solvent) {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            if (filters.solvent === '') return
            const chemShiftAtSolvent = sig.chemShifts[filters.solvent]
            if (
              chemShiftAtSolvent &&
              chemShiftAtSolvent >= shift - dev &&
              chemShiftAtSolvent <= shift + dev
            ) {
              matchingResidueId.push(res.id)
            }
          })
        })
      } else if (filters.multiplicity) {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            _.values(sig.chemShifts).forEach((chemShift) => {
              if (
                sig.proton.multiplicity === filters.multiplicity &&
                chemShift &&
                chemShift >= shift - dev &&
                chemShift <= shift + dev
              ) {
                matchingResidueId.push(res.id)
              }
            })
          })
        })
      } else {
        data.forEach((res) => {
          res.signals.forEach((sig) => {
            _.values(sig.chemShifts).forEach((chemShift) => {
              if (
                chemShift &&
                chemShift >= shift - dev &&
                chemShift <= shift + dev
              ) {
                matchingResidueId.push(res.id)
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
          The table below shows the chemical shifts of different residues in
          common NMR solvents. Use the inputfields to filter the data. The
          residues can be added to the NMR residue calculator by clicking the
          add icon.
        </Typography>
        <CommonResidueFilters
          filters={filters}
          onChangeFilters={handleChangeFilters}
        />
        <Divider />
        <div className={classes.table}>
          <CommonResiduesTable
            onAddResidue={onAddResidue}
            filteredData={filterData()}
          />
        </div>
      </ContentBox>
    </div>
  )
}

export { CommonResidues }
