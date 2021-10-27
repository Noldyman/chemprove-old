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

const RDKit = {
  drawStructure: drawStructure,
  getMW: getMW,
}

export default RDKit
