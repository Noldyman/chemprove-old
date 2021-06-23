import React, { ChangeEvent, useState } from 'react'
import {
  makeStyles,
  Typography,
  TextField,
  Divider,
  Button,
} from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
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

interface IProduct {
  molWeight: number
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
      id: uuidv4(),
      residue: 'unknown',
      molWeight: 0,
      numOfProtons: 1,
      integral: 0,
      purity: { molPercent: 0, wtPercent: 0 },
    },
  ])

  const handleMolWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextProduct = produce(product, (draftProduct) => {
      draftProduct.molWeight = parseFloat(event.target.value)
      const nextResidues = produce(residues, (draftResidues) => {
        calculatePurities(draftProduct, draftResidues)
      })
      setResidues(nextResidues)
    })
    setProduct(nextProduct)
  }

  const handleAddResidue = () => {
    const nextProduct = produce(product, (draftProduct) => {
      const nextResidues = produce(residues, (draftResidues) => {
        draftResidues.push({
          id: uuidv4(),
          residue: 'unknown',
          molWeight: 0,
          numOfProtons: 1,
          integral: 0,
          purity: { molPercent: 0, wtPercent: 0 },
        })
        calculatePurities(draftProduct, draftResidues)
      })
      setResidues(nextResidues)
    })
    setProduct(nextProduct)
  }

  const handleChangeResidue = (
    event: ChangeEvent<HTMLInputElement>,
    item: IResidue
  ) => {
    const nextProduct = produce(product, (draftProduct) => {
      const nextResidues = produce(residues, (draftResidues) => {
        const index = residues.findIndex((r) => r.id === item.id)
        draftResidues[index] = {
          ...item,
          purity: { ...item.purity },
          [event.target.name]: event.target.value,
        }
        calculatePurities(draftProduct, draftResidues)
      })
      setResidues(nextResidues)
    })
    setProduct(nextProduct)
  }

  const handleDeleteResidue = (item: IResidue) => {
    const nextProduct = produce(product, (draftProduct) => {
      const nextResidues = produce(residues, (draftResidues) => {
        const index = draftResidues.findIndex((r) => r.id === item.id)
        draftResidues.splice(index, 1)
        calculatePurities(draftProduct, draftResidues)
      })
      setResidues(nextResidues)
    })
    setProduct(nextProduct)
  }

  const calculatePurities = (
    draftProduct: IProduct,
    draftResidues: IResidue[]
  ) => {
    let totalIntegral = 1
    let totalWeightPerMol = draftProduct.molWeight
    draftResidues.forEach((r) => {
      totalIntegral += r.integral / r.numOfProtons
      totalWeightPerMol += (r.integral / r.numOfProtons) * r.molWeight
    })

    draftProduct.purity.molPercent = (1 / totalIntegral) * 100
    draftProduct.purity.wtPercent =
      (draftProduct.molWeight / totalWeightPerMol) * 100

    draftResidues.forEach((r) => {
      r.purity.molPercent = (r.integral / r.numOfProtons / totalIntegral) * 100
      r.purity.wtPercent =
        (((r.integral / r.numOfProtons) * r.molWeight) / totalWeightPerMol) *
        100
    })
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
          label="Molecular weight (g/mol)"
          variant="outlined"
          size="small"
          color="secondary"
          value={product.molWeight}
          onChange={handleMolWeightChange}
          onFocus={(event) => event.target.select()}
        />
        <span>
          Purity: {product.purity.molPercent.toFixed(2)} mol%;{' '}
          {product.purity.wtPercent.toFixed(2)} wt%
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
        {console.log(residues)}
      </div>
    </ContentBox>
  )
}

export { ResidueCalculator }
