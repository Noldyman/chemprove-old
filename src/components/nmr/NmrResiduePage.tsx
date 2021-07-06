import React from 'react'
import { ResidueCalculator } from './ResidueCalculator'
import { CommonResidues } from './CommonResidues'

interface NmrResiduePageProps {}

const NmrResiduePage: React.FC<NmrResiduePageProps> = () => {
  return (
    <div>
      <ResidueCalculator />
      <CommonResidues />
    </div>
  )
}

export { NmrResiduePage }
