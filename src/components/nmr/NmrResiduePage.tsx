import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useImmerReducer } from 'use-immer'
import { ResidueCalculator } from './ResidueCalculator'
import { CommonResidues } from './CommonResidues'

export interface IResidue {
  id: string
  residue: string
  molWeight: number
  numOfProtons: number
  integral: number
  purity: { molPercent: number; wtPercent: number }
}

export interface IState {
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

const NmrResiduePage: React.FC = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const handleMolWeightChange = (event: React.ChangeEvent) => {
    dispatch({
      type: ACTIONS.CHANGE_MOLWEIGHT,
      payload: { event: event },
    })
  }

  const handleChangeResidue = (event: React.ChangeEvent, item: any) => {
    dispatch({
      type: ACTIONS.CHANGE_RESIDUE,
      payload: { event: event, item: item },
    })
  }

  const handleDeleteResidue = (item: any) => {
    dispatch({ type: ACTIONS.DELETE_RESIDUE, payload: { item: item } })
  }

  const handleAddResidue = () => {
    dispatch({
      type: ACTIONS.ADD_RESIDUE,
      payload: { residueName: 'unknown' },
    })
  }

  return (
    <div>
      <ResidueCalculator
        state={state}
        onChangeMolWeight={handleMolWeightChange}
        onChangeResidue={handleChangeResidue}
        onDeleteResidue={handleDeleteResidue}
        onAddResidue={handleAddResidue}
      />
      <CommonResidues />
    </div>
  )
}

export { NmrResiduePage }
