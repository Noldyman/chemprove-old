import React, { useState } from 'react'
import {
  makeStyles,
  Typography,
  TextField,
  Divider,
  Button,
  Paper,
  Tooltip,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AddCircleOutline, FileCopy } from '@material-ui/icons'
import { ContentBox } from '../common/ContentBox'
import { ResidueTable } from './ResidueTable'
import { IResidue, IState } from './NmrResiduePage'
import {
  H_NMR_COMMON_RESIDUES,
  ICommonResidue,
} from '../../data/H_NMR_RESIDUES'

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
    marginBottom: '20px',
    width: '50%',
  },
  puritySentence: {
    margin: '20px auto auto auto',
    width: '95%',
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
  const [sentenceIsCopied, setSentenceIsCopied] = useState({
    snackbarOpen: false,
    success: false,
  })

  const renderResidueName = (residueId: string) => {
    if (!residueId) return 'unnamed residue'
    return H_NMR_COMMON_RESIDUES.find(
      (r) => r.id === residueId
    )!.compound.toLocaleLowerCase()
  }

  const renderPuritySentence = () => {
    const filteredResidues = state.residues.filter(
      (r) => parseFloat(r.integral) > 0
    )

    if (
      filteredResidues.length < 1 ||
      isNaN(parseFloat(state.product.molWeight))
    )
      return
    if (filteredResidues.length === 1) {
      const res = filteredResidues[0]
      const molPerc = parseFloat(res.purity.molPercent).toFixed(2)
      const wtPerc = parseFloat(res.purity.wtPercent).toFixed(2)
      if (isNaN(parseFloat(molPerc)) || isNaN(parseFloat(wtPerc))) return

      return `Product contains ${renderResidueName(
        res.residue
      )} (${molPerc} mol% / ${wtPerc} wt%).`
    } else {
      let sentence = 'Product contains '
      filteredResidues.forEach((res, index) => {
        const molPerc = parseFloat(res.purity.molPercent).toFixed(2)
        const wtPerc = parseFloat(res.purity.wtPercent).toFixed(2)

        if (isNaN(parseFloat(molPerc)) || isNaN(parseFloat(wtPerc))) {
          sentence = ''
          return
        }

        const residueSpecs = `${renderResidueName(
          res.residue
        )} (${molPerc} mol% / ${wtPerc} wt%)`

        if (filteredResidues.length - 1 === index) {
          sentence += `and ${residueSpecs}.`
        } else if (filteredResidues.length - 2 === index) {
          sentence += `${residueSpecs} `
        } else {
          sentence += `${residueSpecs}, `
        }
      })
      return sentence
    }
  }

  const handleCopyPuritySentence = async (sentence: string | undefined) => {
    if (!sentence) return

    try {
      await navigator.clipboard.writeText(sentence)
      setSentenceIsCopied({ snackbarOpen: true, success: true })
    } catch {
      setSentenceIsCopied({ snackbarOpen: true, success: false })
    }
  }

  const handleCloseCopySnackbar = () => {
    setSentenceIsCopied((prevValue) => ({ ...prevValue, snackbarOpen: false }))
  }

  return (
    <ContentBox title="NMR residue calculator">
      <Typography align="center">
        This tool can be used to calculate the purity of your product based on
        NMR analysis. <br />
        Specify the molecular weight of your product. Then, add the residues you
        observe in your NMR spectrum and fill out their integrals. The purity of
        your product and the percentages of each residue will be automatically
        calculated. The common residue table below can be used to identify your
        residues.
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
      {renderPuritySentence() && (
        <div>
          <Divider />
          <div
            className={classes.puritySentence}
            onClick={() => handleCopyPuritySentence(renderPuritySentence())}
          >
            <Tooltip title="Copy to clipboard" arrow>
              <Alert
                variant="outlined"
                severity="info"
                icon={<FileCopy fontSize="small" />}
                style={{ cursor: 'pointer' }}
              >
                {renderPuritySentence()}
              </Alert>
            </Tooltip>
          </div>
          <Snackbar
            open={sentenceIsCopied.snackbarOpen}
            autoHideDuration={1500}
            onClose={handleCloseCopySnackbar}
          >
            <Alert
              severity={sentenceIsCopied.success ? 'success' : 'error'}
              variant="filled"
              onClose={handleCloseCopySnackbar}
            >
              {sentenceIsCopied.success
                ? 'Copied to clipboard'
                : 'Failed to copy to clipboard'}
            </Alert>
          </Snackbar>
        </div>
      )}
    </ContentBox>
  )
}

export { ResidueCalculator }
