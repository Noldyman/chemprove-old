import React, { ChangeEvent, useState } from 'react'
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

interface ResidueCalculatorProps {}

export interface IResidue {
  id: string
  residue: string
  molWeight: number
  numOfProtons: number
  integral: number
  purity: { molPercent: number; wtPercent: number }
}

const ResidueCalculator: React.FC<ResidueCalculatorProps> = () => {
  const classes = useStyles()
  const [product, setProduct] = useState({
    molWeight: 0,
    purity: { molPercent: 0, wtPercent: 0 },
  })
  const [residues, setResidues] = useState<IResidue[]>([
    {
      id: new Date().toString(),
      residue: 'unknown',
      molWeight: 0,
      numOfProtons: 1,
      integral: 0,
      purity: { molPercent: 0, wtPercent: 0 },
    },
  ])

  const handleMolWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevValue) => {
      return { ...prevValue, molWeight: parseFloat(event.target.value) }
    })
  }

  const handleAddResidue = () => {
    setResidues((prevResidues) => [
      ...prevResidues,
      {
        id: new Date().toString(),
        residue: 'unknown',
        molWeight: 0,
        numOfProtons: 1,
        integral: 0,
        purity: { molPercent: 0, wtPercent: 0 },
      },
    ])
  }

  const handleChangeResidue = (
    event: ChangeEvent<HTMLInputElement>,
    item: IResidue
  ) => {
    let residueArr = [...residues]
    const index = residues.findIndex((r) => r.id === item.id)
    const changedElement = event.target.name
    const newResidueObj = {
      ...item,
      [changedElement]: parseFloat(event.target.value),
    }
    residueArr.splice(index, 1, newResidueObj)
    setResidues(residueArr)
  }

  const handleDeleteResidue = (item: IResidue) => {
    setResidues((prevResidues) => prevResidues.filter((r) => r.id !== item.id))
  }

  return (
    <ContentBox title="NMR residue calculator">
      <Typography align="center">
        Fill in the molecular weight of your product and add residues to
        calculate the purity.
      </Typography>
      <div className={classes.product}>
        <TextField
          type="number"
          label="Molecular weight"
          variant="outlined"
          size="small"
          color="secondary"
          value={product.molWeight}
          onChange={handleMolWeightChange}
          onFocus={(event) => event.target.select()}
        />
        <span>
          Purity: {product.purity.molPercent} mol%; {product.purity.wtPercent}{' '}
          wt%
        </span>
      </div>
      <Divider />
      <div className={classes.table}>
        <ResidueTable
          data={residues}
          onResidueChange={handleChangeResidue}
          onDelete={handleDeleteResidue}
        />
      </div>
      <div className={classes.button}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutline />}
          onClick={handleAddResidue}
        >
          Add new residue
        </Button>
      </div>
    </ContentBox>
  )
}

export { ResidueCalculator }
