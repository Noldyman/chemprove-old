import React from 'react'
import {
  makeStyles,
  Typography,
  TextField,
  Divider,
  Button,
} from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'
import { ContentBox } from '../common/ContentBox'
import { ResidueTable } from './ResidueTable'
import { useImmerReducer } from 'use-immer'

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

export interface IResidue {
  id: string
  residue: string
  molWeight: number
  numOfProtons: number
  integral: number
  purity: { molPercent: number; wtPercent: number }
}

interface IState {
  product: {
    molWeight: number
    purity: { molPercent: number; wtPercent: number }
  }
  residues: IResidue[]
}

interface IAction {
  type: string
  payload?: any
}

const newResidue = (residueName: string) => {
  return {
    id: uuidv4(),
    residue: residueName,
    molWeight: 0,
    numOfProtons: 1,
    integral: 0,
    purity: { molPercent: 0, wtPercent: 0 },
  }
}

const initialState: IState = {
  product: {
    molWeight: 0,
    purity: { molPercent: 0, wtPercent: 0 },
  },
  residues: [newResidue('unknown')],
}

const ACTIONS = {
  CHANGE_MOLWEIGHT: 'change-molweight',
  ADD_RESIDUE: 'add-residue',
  CHANGE_RESIDUE: 'change-residue',
  DELETE_RESIDUE: 'delete-residue',
}

const reducer = (draftState: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.CHANGE_MOLWEIGHT:
      draftState.product.molWeight = parseFloat(
        action.payload.event.target.value
      )
      calculatePurities(draftState)
      break
    case ACTIONS.ADD_RESIDUE:
      draftState.residues.push(newResidue(action.payload.residueName))
      calculatePurities(draftState)
      break
    case ACTIONS.CHANGE_RESIDUE:
      const changeIndex = draftState.residues.findIndex(
        (r) => r.id === action.payload.item.id
      )
      draftState.residues[changeIndex] = {
        ...draftState.residues[changeIndex],
        [action.payload.event.target.name]: action.payload.event.target.value,
      }
      calculatePurities(draftState)
      break
    case ACTIONS.DELETE_RESIDUE:
      const deleteIndex = draftState.residues.findIndex(
        (r) => r.id === action.payload.item.id
      )
      draftState.residues.splice(deleteIndex, 1)
      calculatePurities(draftState)
      break
    default:
      return draftState
  }
}

const calculatePurities = (draftState: IState) => {
  let totalIntegral = 1
  let totalWeightPerMol = draftState.product.molWeight
  draftState.residues.forEach((r) => {
    totalIntegral += r.integral / r.numOfProtons
    totalWeightPerMol += (r.integral / r.numOfProtons) * r.molWeight
  })

  draftState.product.purity.molPercent = (1 / totalIntegral) * 100
  draftState.product.purity.wtPercent =
    (draftState.product.molWeight / totalWeightPerMol) * 100

  draftState.residues.forEach((r) => {
    r.purity.molPercent = (r.integral / r.numOfProtons / totalIntegral) * 100
    r.purity.wtPercent =
      (((r.integral / r.numOfProtons) * r.molWeight) / totalWeightPerMol) * 100
  })
}

const ResidueCalculator: React.FC = () => {
  const classes = useStyles()
  const [state, dispatch] = useImmerReducer(reducer, initialState)

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
          onChange={(event) =>
            dispatch({
              type: ACTIONS.CHANGE_MOLWEIGHT,
              payload: { event: event },
            })
          }
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
          onResidueChange={(event, item) =>
            dispatch({
              type: ACTIONS.CHANGE_RESIDUE,
              payload: { event: event, item: item },
            })
          }
          onDelete={(item) =>
            dispatch({ type: ACTIONS.DELETE_RESIDUE, payload: { item: item } })
          }
        />
      </div>
      <div className={classes.button}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutline />}
          onClick={() =>
            dispatch({
              type: ACTIONS.ADD_RESIDUE,
              payload: { residueName: 'unknown' },
            })
          }
        >
          Add new residue
        </Button>
      </div>
    </ContentBox>
  )
}

export { ResidueCalculator }
