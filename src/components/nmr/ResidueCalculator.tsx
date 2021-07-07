import React from 'react'
import {
  makeStyles,
  Typography,
  TextField,
  Divider,
  Button,
} from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import { ContentBox } from '../common/ContentBox'
import { ResidueTable } from './ResidueTable'
import { IState } from './NmrResiduePage'

const useStyles = makeStyles({
  product: {
    width: '50%',
    margin: '20px auto 15px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  table: {
    margin: '20px auto 20px auto',
    width: '95%',
  },
  button: {
    margin: 'auto',
    width: '50%',
  },
})

interface ResidueCalculatorProps {
  state: IState
  onChangeMolWeight: (event: React.ChangeEvent) => void
  onChangeResidue: (event: React.ChangeEvent, item: any) => void
  onDeleteResidue: (item: any) => void
  onAddResidue: () => void
}

const ResidueCalculator: React.FC<ResidueCalculatorProps> = ({
  state,
  onChangeMolWeight,
  onChangeResidue,
  onDeleteResidue,
  onAddResidue,
}) => {
  const classes = useStyles()

  return (
    <ContentBox title="NMR residue calculator">
      <Typography align="center">
        Fill in the molecular weight of your product and add residues to
        calculate the purity.
      </Typography>
      <div className={classes.product}>
        <TextField
          type="number"
          label="Molecular weight (g/mol)"
          variant="outlined"
          size="small"
          color="secondary"
          value={state.product.molWeight}
          onChange={onChangeMolWeight}
          onFocus={(event) => event.target.select()}
        />
        <span>
          {`Purity: ${
            !isNaN(state.product.purity.molPercent)
              ? state.product.purity.molPercent.toFixed(2)
              : '-'
          }
          mol%
          ${
            !isNaN(state.product.purity.wtPercent)
              ? state.product.purity.wtPercent.toFixed(2)
              : '-'
          }
          wt%`}
        </span>
      </div>
      <Divider />
      <div className={classes.table}>
        <ResidueTable
          data={state.residues}
          onResidueChange={onChangeResidue}
          onDelete={onDeleteResidue}
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
