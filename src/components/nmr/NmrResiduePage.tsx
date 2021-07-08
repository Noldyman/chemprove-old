import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useImmerReducer } from 'use-immer'
import { ResidueCalculator } from './ResidueCalculator'
import { CommonResidues } from './CommonResidues'
import {
  H_NMR_COMMON_RESIDUES,
  ICommonResidue,
} from '../../data/H_NMR_RESIDUES'

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

const newResidue = (
  residueName: string,
  id?: string,
  molWeight?: number,
  numOfProtons?: number
) => {
  return {
    id: id || uuidv4(),
    residue: residueName.toLocaleLowerCase(),
    molWeight: molWeight || 0,
    numOfProtons: numOfProtons || 1,
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
  ADD_COMMON_RESIDUE: 'add-common-residue',
  AUTOFILL_RESIDUE: 'autofill-residue',
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
    case ACTIONS.ADD_COMMON_RESIDUE:
      const [id, molWeight, numOfProtons] = action.payload
      draftState.residues.push(newResidue(id, id, molWeight, numOfProtons))
      calculatePurities(draftState)
      break
    case ACTIONS.AUTOFILL_RESIDUE:
      const { index, newItem } = action.payload

      draftState.residues[index] = {
        ...draftState.residues[index],
        residue: newItem.resId,
        molWeight: newItem.resMolWeight,
        numOfProtons: newItem.resNumOfProtons,
      }

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

  const handleAddCommonResidue = (residue: ICommonResidue) => {
    const { id, molWeight } = residue
    const numOfProtons = residue.signals[0].proton.amount

    dispatch({
      type: ACTIONS.ADD_COMMON_RESIDUE,
      payload: [id, molWeight, numOfProtons],
    })
  }

  const handleSelectResidue = (event: any, item: IResidue) => {
    const residueIndex = state.residues.findIndex((r) => r.id === item.id)
    const selectedResidueId = event.target.value

    let newItem = {}

    if (selectedResidueId === 'unknown') {
      newItem = {
        resId: selectedResidueId,
        resMolWeight: 0,
        resNumOfProtons: 1,
      }
    } else {
      const selectedResidue = H_NMR_COMMON_RESIDUES.find(
        (r) => r.id === selectedResidueId
      )
      newItem = {
        resId: selectedResidueId,
        resMolWeight: selectedResidue?.molWeight,
        resNumOfProtons: selectedResidue!.signals[0].proton.amount,
      }
    }

    dispatch({
      type: ACTIONS.AUTOFILL_RESIDUE,
      payload: { index: residueIndex, newItem: newItem },
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
        onSelectResidue={handleSelectResidue}
      />
      <CommonResidues onAddResidue={handleAddCommonResidue} />
    </div>
  )
}

export { NmrResiduePage }
