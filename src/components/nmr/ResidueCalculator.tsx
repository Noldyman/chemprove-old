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

const ResidueCalculator: React.FC<ResidueCalculatorProps> = () => {
  const classes = useStyles()
  const [molWeight, setMolWeight] = useState(0)

  const handleMolWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMolWeight(+e.currentTarget.value)
  }

  return (
    <ContentBox title="NMR residue calculator">
      <Typography align="center">
        Fill in the molecular weight of your product and add some residues to
        calculate the purity.
      </Typography>
      <div className={classes.product}>
        <TextField
          label="Molecular weight"
          variant="outlined"
          size="small"
          type="number"
          color="secondary"
          value={molWeight}
          onChange={handleMolWeightChange}
        />
        <span>Purity: 89 mol%; 97 wt%</span>
      </div>
      <Divider />
      <div className={classes.table}>
        <ResidueTable />
      </div>
      <div className={classes.button}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutline />}
        >
          Add new residue
        </Button>
      </div>
    </ContentBox>
  )
}

export { ResidueCalculator }
