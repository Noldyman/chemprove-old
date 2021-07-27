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
  molWeight: string
  numOfProtons: string
  integral: string
  purity: { molPercent: string; wtPercent: string }
}

export interface IState {
  product: {
    molWeight: string
    purity: { molPercent: string; wtPercent: string }
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
  molWeight?: string,
  numOfProtons?: string
) => {
  return {
    id: id || uuidv4(),
    residue: residueName.toLocaleLowerCase(),
    molWeight: molWeight || '0',
    numOfProtons: numOfProtons || '1',
    integral: '0',
    purity: { molPercent: '0', wtPercent: '0' },
  }
}

const initialState: IState = {
  product: {
    molWeight: '',
    purity: { molPercent: '0', wtPercent: '0' },
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
      draftState.product.molWeight = action.payload.event.target.value
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
  if (!draftState.product.molWeight || draftState.product.molWeight === '0') {
    draftState.product.purity.molPercent = 'NaN'
    draftState.product.purity.wtPercent = 'NaN'
    draftState.residues.forEach((r) => {
      r.purity.molPercent = 'NaN'
      r.purity.wtPercent = 'NaN'
    })
    return
  }

  let totalIntegral = 1
  let totalWeightPerMol = parseFloat(draftState.product.molWeight)
  draftState.residues.forEach((r) => {
    const numOfProtonsFloat = parseFloat(r.numOfProtons)
    const integralFloat = parseFloat(r.integral)
    const molWeightFloat = parseFloat(r.molWeight)

    totalIntegral += integralFloat / numOfProtonsFloat
    totalWeightPerMol += (integralFloat / numOfProtonsFloat) * molWeightFloat
  })
  draftState.product.purity.molPercent = ((1 / totalIntegral) * 100).toString()
  draftState.product.purity.wtPercent = (
    (parseFloat(draftState.product.molWeight) / totalWeightPerMol) *
    100
  ).toString()

  draftState.residues.forEach((r) => {
    const numOfProtonsFloat = parseFloat(r.numOfProtons)
    const integralFloat = parseFloat(r.integral)
    const molWeightFloat = parseFloat(r.molWeight)

    r.purity.molPercent = (
      (integralFloat / numOfProtonsFloat / totalIntegral) *
      100
    ).toString()
    r.purity.wtPercent = (
      (((integralFloat / numOfProtonsFloat) * molWeightFloat) /
        totalWeightPerMol) *
      100
    ).toString()
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
