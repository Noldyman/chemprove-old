import parseHTML from 'html-react-parser'
declare var RDKitModule: any

const getMol = (smiles: string) => RDKitModule.get_mol(smiles)

const drawStructure = (smiles: string) => {
  const drawingDetails = {
    clearBackground: false,
  }

  return parseHTML(
    getMol(smiles).get_svg_with_highlights(JSON.stringify(drawingDetails))
  )
}

const getMW = (smiles: string) => {
  const mw = JSON.parse(getMol(smiles).get_descriptors()).amw as number
  return mw.toFixed(2)
}

const getMolFormulaString = (smiles: string) => {
  const inchi: string = getMol(smiles).get_inchi()
  let formulaString = ''
  let fwSlashCount = 0

  for (let i = 0; i < inchi.length; i++) {
    if (inchi[i] === '/') fwSlashCount++
    if (fwSlashCount === 1 && inchi[i] !== '/') {
      formulaString += inchi[i]
    }
  }

  return formulaString
}

const RDKit = {
  drawStructure: drawStructure,
  getMW: getMW,
  getMolFormulaString: getMolFormulaString,
}

export default RDKit
