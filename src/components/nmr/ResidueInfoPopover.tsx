import React from 'react'
import { makeStyles, Popover, Typography, Divider } from '@material-ui/core'
import { ICommonResidue } from '../../data/H_NMR_RESIDUES'
import RDKit from '../../services/RDKit'
import parseHTML from 'html-react-parser'

const useStyles = makeStyles((theme) => {
  const dividerColor = theme.palette.divider
  const themeMode = theme.palette.type
  return {
    content: {
      padding: '10px',
    },
    title: {
      marginBottom: '10px',
    },
    divider: {
      margin: '10px auto 10px auto',
    },
    structureDrawing: {
      backgroundColor: themeMode === 'dark' ? '#e0e0e0' : '#fff',
      borderRadius: '5px',
      margin: 'auto',
      padding: '5px 5px 0px 5px',
      width: 'fit-content',
      height: 'fit-content',
      border: `solid 1px ${dividerColor}`,
    },
    info: {
      display: 'flex',
      justifyContent: 'center',
    },
  }
})

interface ResidueInfoPopoverProps {
  residue: ICommonResidue | null
  onClose: () => void
  anchorEl: HTMLDivElement | null
}

const ResidueInfoPopover: React.FC<ResidueInfoPopoverProps> = ({
  residue,
  onClose,
  anchorEl,
}) => {
  const classes = useStyles()

  const createMolecularFormula = (smiles: string) => {
    const formulaString = RDKit.getMolFormulaString(smiles)
    let htmlString = ''

    for (let i = 0; i < formulaString.length; i++) {
      if (!isNaN(parseFloat(formulaString[i]))) {
        htmlString += `<sub>${formulaString[i]}</sub>`
      } else {
        htmlString += formulaString[i]
      }
    }

    return <span>{parseHTML(htmlString)}</span>
  }

  return (
    <Popover
      open={Boolean(residue)}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      elevation={15}
    >
      {residue && residue.smiles && (
        <div className={classes.content}>
          <Typography className={classes.title} variant="h5" align="center">
            {residue.compound}
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.structureDrawing}>
            {RDKit.drawStructure(residue.smiles)}
          </div>
          <div className={classes.info}>
            <div style={{ margin: '20px' }}>
              <b>Mol. formula</b>
              <br />
              {createMolecularFormula(residue.smiles)}
            </div>
            <div style={{ margin: '20px' }}>
              <b>Mol. weight</b>
              <br />
              {residue.molWeight?.toFixed(2)} g/mol
            </div>
            <div style={{ margin: '20px' }}>
              <b>Smiles</b>
              <br />
              {residue.smiles}
            </div>
          </div>
        </div>
      )}
    </Popover>
  )
}

export { ResidueInfoPopover }
