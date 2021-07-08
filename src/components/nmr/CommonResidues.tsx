import React from 'react'
import { makeStyles, Typography, Divider } from '@material-ui/core'
import { ContentBox } from '../common/ContentBox'
import { CommonResiduesTable } from './CommonResiduesTable'
import { ICommonResidue } from '../../data/H_NMR_RESIDUES'

const useStyles = makeStyles({
  root: {
    margin: '20px 0px 20px 0px',
  },
  table: {
    margin: '20px auto 20px auto',
  },
})

interface CommonResiduesProps {
  onAddResidue: (residue: ICommonResidue) => void
}

const CommonResidues: React.FC<CommonResiduesProps> = ({ onAddResidue }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ContentBox title="Residues in common NMR solvents">
        <Typography align="center">
          The table below shows the chemical shifts of different residues in
          common NMR solvents. Use the inputfields to filter the data. The
          residues can be added to the NMR residue calculator by clicking the
          add icon.
        </Typography>
        <Divider />
        <div className={classes.table}>
          <CommonResiduesTable onAddResidue={onAddResidue} />
        </div>
      </ContentBox>
    </div>
  )
}

export { CommonResidues }
