import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { v4 as uuidv4 } from 'uuid'
import { useImmerReducer } from 'use-immer'
import { ResidueCalculator } from './ResidueCalculator'
import { CommonResidues } from './CommonResidues'
import { ICommonResidue } from '../../data/H_NMR_RESIDUES'
import { SelectSignalDialog } from './SelectSignalDialog'

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
  molWeight?: string,
  numOfProtons?: string
) => {
  return {
    id: uuidv4(),
    residue: residueName.toLocaleLowerCase(),
    molWeight: molWeight || '0',
    numOfProtons: numOfProtons || '1',
    integral: '0',
    purity: { molPercent: '', wtPercent: '' },
  }
}

const initialState: IState = {
  product: {
    molWeight: '',
    purity: { molPercent: '', wtPercent: '' },
  },
  residues: [newResidue('')],
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
      draftState.product.molWeight = action.payload.input
      calculatePurities(draftState)
      break
    case ACTIONS.ADD_RESIDUE:
      draftState.residues.push(newResidue(action.payload.residueName))
      calculatePurities(draftState)
      break
    case ACTIONS.ADD_COMMON_RESIDUE:
      const [id, molWeight, numOfProtons] = action.payload
      draftState.residues.push(newResidue(id, molWeight, numOfProtons))
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
        [action.payload.targetName]: action.payload.enteredValue,
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
  if (
    isNaN(parseFloat(draftState.product.molWeight)) ||
    parseFloat(draftState.product.molWeight) === 0
  ) {
    draftState.product.purity = { molPercent: '', wtPercent: '' }
    draftState.residues.forEach((res) => {
      res.purity = { molPercent: '', wtPercent: '' }
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
  const [selectedSolvent, setSelectedSolvent] = useState(
    localStorage.getItem('selectedSolvent') || 'chloroform_d'
  )
  const [selectSignalResidue, setSelectSignalResidue] = useState<{
    residue: ICommonResidue | null
    isViaSelector: boolean
    residueIndex?: number
  }>({ residue: null, isViaSelector: false })
  const [addedResidue, setAddedResidue] = useState({
    open: false,
    residueName: '',
  })

  const handleChangeMolWeight = (value: string) => {
    value = value.replace(',', '.')
    if (value.match(/[^0-9.]/g)) return
    if (value.match(/[.]/g) && value.match(/[.]/g)!.length > 1) return

    dispatch({
      type: ACTIONS.CHANGE_MOLWEIGHT,
      payload: { input: value },
    })
  }

  const handleChangeSolvent = (value: string) => {
    setSelectedSolvent(value)
    localStorage.setItem('selectedSolvent', value)
  }

  const handleChangeResidue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: any
  ) => {
    const targetName = event.target.name
    let enteredValue = event.target.value

    if (targetName === 'molWeight' || targetName === 'integral') {
      enteredValue = enteredValue.replace(',', '.')
      if (enteredValue.match(/[^0-9.]/g)) return
      if (enteredValue.match(/[.]/g) && enteredValue.match(/[.]/g)!.length > 1)
        return
    } else {
      if (enteredValue.match(/[^0-9]/g)) return
    }

    dispatch({
      type: ACTIONS.CHANGE_RESIDUE,
      payload: {
        targetName: targetName,
        enteredValue: enteredValue,
        item: item,
      },
    })
  }

  const handleDeleteResidue = (item: any) => {
    dispatch({ type: ACTIONS.DELETE_RESIDUE, payload: { item: item } })
  }

  const handleAddResidue = () => {
    dispatch({
      type: ACTIONS.ADD_RESIDUE,
      payload: { residueName: '' },
    })
  }

  const handleAddCommonResidue = (residue: ICommonResidue) => {
    const { id, molWeight } = residue

    if (residue.signals.length > 1) {
      setSelectSignalResidue({ residue: residue, isViaSelector: false })
    } else {
      const numOfProtons = residue.signals[0].proton.amount

      dispatch({
        type: ACTIONS.ADD_COMMON_RESIDUE,
        payload: [id, molWeight, numOfProtons],
      })
      setAddedResidue({ open: true, residueName: residue.compound })
    }
  }

  const handleSelectResidue = (
    residue: ICommonResidue | null,
    item: IResidue
  ) => {
    const residueIndex = state.residues.findIndex((r) => r.id === item.id)

    let newItem = {}
    if (!residue) {
      newItem = {
        resId: '',
        resMolWeight: 0,
        resNumOfProtons: 1,
      }
    } else {
      if (residue.signals.length > 1) {
        setSelectSignalResidue({
          residue: residue,
          isViaSelector: true,
          residueIndex: residueIndex,
        })
        return
      }

      newItem = {
        resId: residue.id,
        resMolWeight: residue.molWeight,
        resNumOfProtons: residue.signals[0].proton.amount,
      }
    }

    dispatch({
      type: ACTIONS.AUTOFILL_RESIDUE,
      payload: { index: residueIndex, newItem: newItem },
    })
  }

  const handleSelectSignal = (residue: ICommonResidue, signalIndex: number) => {
    if (selectSignalResidue.isViaSelector) {
      const newItem = {
        resId: residue.id,
        resMolWeight: residue.molWeight,
        resNumOfProtons: residue.signals[signalIndex].proton.amount,
      }

      dispatch({
        type: ACTIONS.AUTOFILL_RESIDUE,
        payload: { index: selectSignalResidue.residueIndex, newItem: newItem },
      })
    } else {
      handleAddResidue()

      const newItem = {
        resId: residue.id,
        resMolWeight: residue.molWeight,
        resNumOfProtons: residue.signals[signalIndex].proton.amount,
      }
      dispatch({
        type: ACTIONS.AUTOFILL_RESIDUE,
        payload: { index: state.residues.length, newItem: newItem },
      })
      setAddedResidue({ open: true, residueName: residue.compound })
    }

    setSelectSignalResidue({ residue: null, isViaSelector: false })
  }

  const handleCloseAddSnackbar = () => {
    setAddedResidue((prevValue) => ({ ...prevValue, open: false }))
    setTimeout(() => setAddedResidue({ open: false, residueName: '' }), 100)
  }

  return (
    <div>
      <ResidueCalculator
        state={state}
        onChangeMolWeight={handleChangeMolWeight}
        onChangeResidue={handleChangeResidue}
        onDeleteResidue={handleDeleteResidue}
        onAddResidue={handleAddResidue}
        onSelectResidue={handleSelectResidue}
      />
      <CommonResidues
        onAddResidue={handleAddCommonResidue}
        selectedSolvent={selectedSolvent}
        onChangeSolvent={(value: string) => handleChangeSolvent(value)}
      />
      <SelectSignalDialog
        residue={selectSignalResidue.residue}
        selectedSolvent={selectedSolvent}
        onSolventChange={(value: string) => handleChangeSolvent(value)}
        onClose={() =>
          setSelectSignalResidue({ residue: null, isViaSelector: false })
        }
        onSelectSignal={handleSelectSignal}
      />
      <Snackbar
        open={addedResidue.open}
        autoHideDuration={1500}
        onClose={handleCloseAddSnackbar}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleCloseAddSnackbar}
        >
          {addedResidue.residueName} was added to the NMR residue calculator.
        </Alert>
      </Snackbar>
    </div>
  )
}

export { NmrResiduePage }
