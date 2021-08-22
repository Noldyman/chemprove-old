import React from 'react'
import {
  makeStyles,
  Typography,
  TextField,
  Divider,
  Button,
  Paper,
} from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import { ContentBox } from '../common/ContentBox'
import { ResidueTable } from './ResidueTable'
import { IResidue, IState } from './NmrResiduePage'
import { ICommonResidue } from '../../data/H_NMR_RESIDUES'

const useStyles = makeStyles((theme) => ({
  productPaper: {
    padding: '10px',
    margin: '20px auto 20px auto',
    width: '500px',
  },
  productDiv: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  molWeight: {
    width: '220px',
  },
  table: {
    margin: '20px auto 20px auto',
    width: '95%',
  },
  button: {
    margin: 'auto',
    width: '50%',
  },
}))

interface ResidueCalculatorProps {
  state: IState
  onChangeMolWeight: (value: string) => void
  onChangeResidue: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: any
  ) => void
  onDeleteResidue: (item: any) => void
  onAddResidue: () => void
  onSelectResidue: (residue: ICommonResidue | null, item: IResidue) => void
}

const ResidueCalculator: React.FC<ResidueCalculatorProps> = ({
  state,
  onChangeMolWeight,
  onChangeResidue,
  onDeleteResidue,
  onAddResidue,
  onSelectResidue,
}) => {
  const classes = useStyles()

  return (
    <ContentBox title="NMR residue calculator">
      <Typography align="center">
        Fill in the molecular weight of your product and add residues to
        calculate the purity of your product and the percentages of each
        residue. <br />
        Make sure that the number of protons of each residue correspond with the
        signal of which you use the integral. The common residue table below can
        be used to determine the number of protons that correspond with each
        signal.
      </Typography>
      <Paper variant="outlined" className={classes.productPaper}>
        <div className={classes.productDiv}>
          <TextField
            className={classes.molWeight}
            size="small"
            variant="outlined"
            color="secondary"
            inputProps={{ maxLength: 10 }}
            label="Molecular weight (g/mol)"
            value={state.product.molWeight}
            onChange={(event) => onChangeMolWeight(event.target.value)}
            onFocus={(event) => event.target.select()}
          />
          <span>
            {`Purity: ${
              !isNaN(parseFloat(state.product.purity.molPercent))
                ? parseFloat(state.product.purity.molPercent).toFixed(2)
                : '-'
            }
          mol%
          ${
            !isNaN(parseFloat(state.product.purity.wtPercent))
              ? parseFloat(state.product.purity.wtPercent).toFixed(2)
              : '-'
          }
          wt%`}
          </span>
        </div>
      </Paper>
      <Divider />
      <div className={classes.table}>
        <ResidueTable
          data={state.residues}
          onResidueChange={onChangeResidue}
          onDelete={onDeleteResidue}
          onSelectResidue={onSelectResidue}
        />
      </div>
      <div className={classes.button}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutline />}
          onClick={onAddResidue}
        >
          Add new residue
        </Button>
      </div>
    </ContentBox>
  )
}

export { ResidueCalculator }
