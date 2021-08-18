import { v4 as uuidv4 } from 'uuid'

export interface ISignalObj {
  proton: {
    formula: any
    multiplicity: string | null
    amount: number | null
  }
  chemShifts: {
    chloroform_d: number | { lowShift: number; highShift: number } | null
    acetone_d6: number | { lowShift: number; highShift: number } | null
    dmso_d6: number | { lowShift: number; highShift: number } | null
    benzene_d6: number | { lowShift: number; highShift: number } | null
    acetonitrile_d3: number | { lowShift: number; highShift: number } | null
    methanol_d4: number | { lowShift: number; highShift: number } | null
    water_d2: number | { lowShift: number; highShift: number } | null
  }
}

export interface ICommonResidue {
  id: string
  compound: string
  trivialNames: string
  molWeight: number | null
  signals: ISignalObj[]
}

export interface ISource {
  label: string
  url: string
  dateAccessed?: string
}

export const sources: ISource[] = [
  {
    label: 'J. Org. Chem., Vol. 62, No. 21, 1997',
    url: 'https://pubs.acs.org/doi/10.1021/jo971176v',
  },
  {
    label: 'Organometallics, Vol. 29, No. 9, 2010',
    url: 'https://pubs.acs.org/doi/10.1021/om100106e',
  },
]

export const H_NMR_COMMON_RESIDUES: ICommonResidue[] = [
  {
    id: uuidv4(),
    compound: 'Solvent peaks',
    trivialNames: '',
    molWeight: null,
    signals: [
      {
        proton: { formula: null, multiplicity: null, amount: null },
        chemShifts: {
          chloroform_d: 7.26,
          acetone_d6: 2.05,
          dmso_d6: 2.5,
          benzene_d6: 7.16,
          acetonitrile_d3: 1.94,
          methanol_d4: 3.31,
          water_d2: 4.79,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Water',
    trivialNames: 'H2O',
    molWeight: 18.02,
    signals: [
      {
        proton: {
          multiplicity: 's',
          amount: 2,
          formula: (
            <span>
              OH<sub>2</sub>
            </span>
          ),
        },
        chemShifts: {
          chloroform_d: 1.56,
          acetone_d6: 2.84,
          dmso_d6: 3.33,
          benzene_d6: 0.4,
          acetonitrile_d3: 2.13,
          methanol_d4: 4.87,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Acetic acid',
    trivialNames: 'AcOH glacial ethanoic',
    molWeight: 60.05,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.1,
          acetone_d6: 1.96,
          dmso_d6: 1.91,
          benzene_d6: 1.55,
          acetonitrile_d3: 1.96,
          methanol_d4: 1.99,
          water_d2: 2.08,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Acetone',
    trivialNames: 'propanone',
    molWeight: 58.08,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 2.17,
          acetone_d6: 2.09,
          dmso_d6: 2.09,
          benzene_d6: 1.55,
          acetonitrile_d3: 2.08,
          methanol_d4: 2.15,
          water_d2: 2.22,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Acetonitrile',
    trivialNames: 'ACN MeCN',
    molWeight: 41.05,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.1,
          acetone_d6: 2.05,
          dmso_d6: 2.07,
          benzene_d6: 1.55,
          acetonitrile_d3: 1.96,
          methanol_d4: 2.03,
          water_d2: 2.06,
        },
      },
    ],
  },

  {
    id: uuidv4(),
    compound: 'Benzene',
    trivialNames: '',
    molWeight: 78.11,
    signals: [
      {
        proton: { formula: 'CH', multiplicity: 's', amount: 6 },
        chemShifts: {
          chloroform_d: 7.36,
          acetone_d6: 7.36,
          dmso_d6: 7.37,
          benzene_d6: 7.15,
          acetonitrile_d3: 7.37,
          methanol_d4: 7.33,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: '2-Butanone',
    trivialNames: 'Methylethylketone MEK Methylacetone Methylpropanone',
    molWeight: 72.11,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>CO
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.14,
          acetone_d6: 2.07,
          dmso_d6: 2.07,
          benzene_d6: 1.58,
          acetonitrile_d3: 2.06,
          methanol_d4: 2.12,
          water_d2: 2.19,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>CH<sub>3</sub>
            </span>
          ),
          multiplicity: 'q',
          amount: 2,
        },
        chemShifts: {
          chloroform_d: 2.46,
          acetone_d6: 2.45,
          dmso_d6: 2.43,
          benzene_d6: 1.81,
          acetonitrile_d3: 2.43,
          methanol_d4: 2.5,
          water_d2: 3.18,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 1.06,
          acetone_d6: 0.96,
          dmso_d6: 0.91,
          benzene_d6: 0.85,
          acetonitrile_d3: 0.96,
          methanol_d4: 1.01,
          water_d2: 1.26,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'tert-Butyl alcohol',
    trivialNames: 'tBuOH 2-methylpropan-2-ol methyl-2-propanol tert-butanol',
    molWeight: 74.12,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 9,
        },
        chemShifts: {
          chloroform_d: 1.28,
          acetone_d6: 1.18,
          dmso_d6: 1.11,
          benzene_d6: 1.05,
          acetonitrile_d3: 1.16,
          methanol_d4: 1.4,
          water_d2: 1.24,
        },
      },
      {
        proton: { formula: 'OH', multiplicity: 's', amount: 1 },
        chemShifts: {
          chloroform_d: null,
          acetone_d6: null,
          dmso_d6: 4.19,
          benzene_d6: 1.55,
          acetonitrile_d3: 2.18,
          methanol_d4: null,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'tert-Butyl methyl ether',
    trivialNames: 'MTBE Methyl tert-butyl ether',
    molWeight: 88.15,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CCH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 9,
        },
        chemShifts: {
          chloroform_d: 1.19,
          acetone_d6: 1.13,
          dmso_d6: 1.11,
          benzene_d6: 1.07,
          acetonitrile_d3: 1.14,
          methanol_d4: 1.15,
          water_d2: 1.21,
        },
      },
      {
        proton: {
          formula: (
            <span>
              OCH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 3.22,
          acetone_d6: 3.13,
          dmso_d6: 3.08,
          benzene_d6: 3.04,
          acetonitrile_d3: 3.13,
          methanol_d4: 3.2,
          water_d2: 3.22,
        },
      },
    ],
  },

  {
    id: uuidv4(),
    compound: '2,6-Dimethyl-4-tert-butylphenol',
    trivialNames: 'BHT',
    molWeight: 178.27,
    signals: [
      {
        proton: { formula: 'ArH', multiplicity: 's', amount: 2 },
        chemShifts: {
          chloroform_d: 6.98,
          acetone_d6: 6.96,
          dmso_d6: 6.87,
          benzene_d6: 7.05,
          acetonitrile_d3: 6.97,
          methanol_d4: 6.92,
          water_d2: null,
        },
      },
      {
        proton: { formula: 'OH', multiplicity: 's', amount: 1 },
        chemShifts: {
          chloroform_d: 5.01,
          acetone_d6: null,
          dmso_d6: 6.65,
          benzene_d6: 4.79,
          acetonitrile_d3: 5.2,
          methanol_d4: null,
          water_d2: null,
        },
      },
      {
        proton: {
          formula: (
            <span>
              ArCH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 2.27,
          acetone_d6: 2.22,
          dmso_d6: 2.18,
          benzene_d6: 2.24,
          acetonitrile_d3: 2.22,
          methanol_d4: 2.21,
          water_d2: null,
        },
      },
      {
        proton: {
          formula: (
            <span>
              Ar(CH<sub>3</sub>)<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 9,
        },
        chemShifts: {
          chloroform_d: 1.43,
          acetone_d6: 1.41,
          dmso_d6: 1.36,
          benzene_d6: 1.38,
          acetonitrile_d3: 1.39,
          methanol_d4: 1.4,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Chloroform',
    trivialNames: 'trichloromethane TCM Methyl trichloride',
    molWeight: 119.37,
    signals: [
      {
        proton: { formula: 'CH', multiplicity: 's', amount: 1 },
        chemShifts: {
          chloroform_d: 7.26,
          acetone_d6: 8.02,
          dmso_d6: 8.32,
          benzene_d6: 6.15,
          acetonitrile_d3: 7.58,
          methanol_d4: 7.9,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: '16-Crown-6',
    trivialNames: '',
    molWeight: 264.32,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 24,
        },
        chemShifts: {
          chloroform_d: 3.67,
          acetone_d6: 3.59,
          dmso_d6: 3.51,
          benzene_d6: 3.39,
          acetonitrile_d3: 3.51,
          methanol_d4: 3.64,
          water_d2: 3.8,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Cyclohexane',
    trivialNames: 'Hexanaphthene',
    molWeight: 84.16,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 12,
        },
        chemShifts: {
          chloroform_d: 1.43,
          acetone_d6: 1.43,
          dmso_d6: 1.4,
          benzene_d6: 1.4,
          acetonitrile_d3: 1.44,
          methanol_d4: 1.45,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: '1,2-Dichloroethane',
    trivialNames: 'ethylene dichloride EDC',
    molWeight: 98.95,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 3.73,
          acetone_d6: 3.87,
          dmso_d6: 3.9,
          benzene_d6: 2.9,
          acetonitrile_d3: 3.81,
          methanol_d4: 3.78,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Dichloromethane',
    trivialNames: 'DCM methylene chloride',
    molWeight: 84.93,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 2,
        },
        chemShifts: {
          chloroform_d: 5.3,
          acetone_d6: 5.63,
          dmso_d6: 5.76,
          benzene_d6: 4.27,
          acetonitrile_d3: 5.44,
          methanol_d4: 5.49,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Diethyl ether',
    trivialNames: 'ethoxy ethane',
    molWeight: 74.12,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 1.21,
          acetone_d6: 1.11,
          dmso_d6: 1.09,
          benzene_d6: 1.11,
          acetonitrile_d3: 1.12,
          methanol_d4: 1.18,
          water_d2: 1.17,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'q',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 3.48,
          acetone_d6: 3.41,
          dmso_d6: 3.38,
          benzene_d6: 3.26,
          acetonitrile_d3: 3.42,
          methanol_d4: 3.49,
          water_d2: 3.56,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Diglyme',
    trivialNames: 'bis(2-methoxyethyl) ether Diethylene glycol dimethyl ether',
    molWeight: 134.18,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'm',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 3.65,
          acetone_d6: 3.56,
          dmso_d6: 3.51,
          benzene_d6: 3.46,
          acetonitrile_d3: 3.53,
          methanol_d4: 3.61,
          water_d2: 3.67,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'm',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 3.57,
          acetone_d6: 3.47,
          dmso_d6: 3.38,
          benzene_d6: 3.34,
          acetonitrile_d3: 3.45,
          methanol_d4: 3.58,
          water_d2: 3.61,
        },
      },
      {
        proton: {
          formula: (
            <span>
              OCH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 3.39,
          acetone_d6: 3.28,
          dmso_d6: 3.24,
          benzene_d6: 3.11,
          acetonitrile_d3: 3.29,
          methanol_d4: 3.35,
          water_d2: 3.37,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: '1,2-Dimethoxyethane',
    trivialNames: 'Glyme Monoglyme dimethyl glycol dimethyl ether DME',
    molWeight: 90.12,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 3.4,
          acetone_d6: 3.28,
          dmso_d6: 3.24,
          benzene_d6: 3.12,
          acetonitrile_d3: 3.28,
          methanol_d4: 3.35,
          water_d2: 3.37,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 3.55,
          acetone_d6: 3.46,
          dmso_d6: 3.43,
          benzene_d6: 3.33,
          acetonitrile_d3: 3.45,
          methanol_d4: 3.52,
          water_d2: 3.6,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Dimethylacetamide',
    trivialNames: 'DMAc DMA N,N-Dimethylacetamide',
    molWeight: 87.12,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>CO
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.09,
          acetone_d6: 1.97,
          dmso_d6: 1.96,
          benzene_d6: 1.6,
          acetonitrile_d3: 1.97,
          methanol_d4: 2.07,
          water_d2: 2.08,
        },
      },
      {
        proton: {
          formula: (
            <span>
              NCH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 3.02,
          acetone_d6: 3.0,
          dmso_d6: 2.94,
          benzene_d6: 2.57,
          acetonitrile_d3: 2.96,
          methanol_d4: 3.31,
          water_d2: 3.06,
        },
      },
      {
        proton: {
          formula: (
            <span>
              NCH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.94,
          acetone_d6: 2.83,
          dmso_d6: 2.78,
          benzene_d6: 2.05,
          acetonitrile_d3: 2.83,
          methanol_d4: 2.92,
          water_d2: 2.9,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Dimethylformamide',
    trivialNames: 'DMF N,N-Dimethylformamide',
    molWeight: 73.1,
    signals: [
      {
        proton: { formula: 'CH', multiplicity: 's', amount: 1 },
        chemShifts: {
          chloroform_d: 8.02,
          acetone_d6: 7.96,
          dmso_d6: 7.95,
          benzene_d6: 7.63,
          acetonitrile_d3: 7.92,
          methanol_d4: 7.97,
          water_d2: 7.92,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.96,
          acetone_d6: 2.94,
          dmso_d6: 2.89,
          benzene_d6: 2.36,
          acetonitrile_d3: 2.89,
          methanol_d4: 2.99,
          water_d2: 3.01,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.88,
          acetone_d6: 2.78,
          dmso_d6: 2.73,
          benzene_d6: 1.86,
          acetonitrile_d3: 2.77,
          methanol_d4: 2.86,
          water_d2: 2.85,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Dimethyl sulfoxide',
    trivialNames: 'DMSO (Methanesulfinyl)methane',
    molWeight: 78.13,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 2.62,
          acetone_d6: 2.52,
          dmso_d6: 2.54,
          benzene_d6: 1.68,
          acetonitrile_d3: 2.5,
          methanol_d4: 2.65,
          water_d2: 2.71,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: '1,4-Dioxane',
    trivialNames: '1,4-Dioxacyclohexane',
    molWeight: 88.11,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 8,
        },
        chemShifts: {
          chloroform_d: 3.71,
          acetone_d6: 3.59,
          dmso_d6: 3.57,
          benzene_d6: 3.35,
          acetonitrile_d3: 3.6,
          methanol_d4: 3.66,
          water_d2: 3.75,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Ethane',
    trivialNames: '',
    molWeight: 30.07,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 0.87,
          acetone_d6: 0.83,
          dmso_d6: 0.82,
          benzene_d6: 0.8,
          acetonitrile_d3: 0.85,
          methanol_d4: 0.85,
          water_d2: 0.82,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Ethanol',
    trivialNames: 'EtOH alcohol ethyl alcohol',
    molWeight: 46.07,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 1.25,
          acetone_d6: 1.12,
          dmso_d6: 1.06,
          benzene_d6: 0.96,
          acetonitrile_d3: 1.12,
          methanol_d4: 1.19,
          water_d2: 1.17,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'q',
          amount: 2,
        },
        chemShifts: {
          chloroform_d: 3.72,
          acetone_d6: 3.57,
          dmso_d6: 3.44,
          benzene_d6: 3.34,
          acetonitrile_d3: 3.54,
          methanol_d4: 3.6,
          water_d2: 3.65,
        },
      },
      {
        proton: { formula: 'OH', multiplicity: 's', amount: 1 },
        chemShifts: {
          chloroform_d: 1.32,
          acetone_d6: 3.39,
          dmso_d6: 4.63,
          benzene_d6: null,
          acetonitrile_d3: 2.47,
          methanol_d4: null,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Ethyl acetate',
    trivialNames: 'EtOAc ethyl ethanoate ETAC EA',
    molWeight: 88.11,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>CO
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.05,
          acetone_d6: 1.97,
          dmso_d6: 1.99,
          benzene_d6: 1.65,
          acetonitrile_d3: 1.97,
          methanol_d4: 2.01,
          water_d2: 2.07,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>CH<sub>3</sub>
            </span>
          ),
          multiplicity: 'q',
          amount: 2,
        },
        chemShifts: {
          chloroform_d: 4.12,
          acetone_d6: 4.05,
          dmso_d6: 4.03,
          benzene_d6: 3.89,
          acetonitrile_d3: 4.06,
          methanol_d4: 4.09,
          water_d2: 4.14,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 1.26,
          acetone_d6: 1.2,
          dmso_d6: 1.17,
          benzene_d6: 0.92,
          acetonitrile_d3: 1.2,
          methanol_d4: 1.24,
          water_d2: 1.24,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Ethylene',
    trivialNames: 'Ethene',
    molWeight: 28.05,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 5.4,
          acetone_d6: 5.38,
          dmso_d6: 5.41,
          benzene_d6: 5.25,
          acetonitrile_d3: 5.41,
          methanol_d4: 5.39,
          water_d2: 5.44,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Ethylene glycol',
    trivialNames: 'Ethylene alcohol 1,2-Dihydroxyethane',
    molWeight: 62.07,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 3.76,
          acetone_d6: 3.28,
          dmso_d6: 3.34,
          benzene_d6: 3.41,
          acetonitrile_d3: 3.51,
          methanol_d4: 3.59,
          water_d2: 3.65,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Hexamethylbenzene',
    trivialNames: 'Mellitene',
    molWeight: 162.28,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 18,
        },
        chemShifts: {
          chloroform_d: 2.24,
          acetone_d6: 2.17,
          dmso_d6: 2.14,
          benzene_d6: 2.13,
          acetonitrile_d3: 2.19,
          methanol_d4: 2.19,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Hexamethyldisiloxane',
    trivialNames: 'HMDSO Bis(trimethylsilyl) ether',
    molWeight: 162.38,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 18,
        },
        chemShifts: {
          chloroform_d: 0.07,
          acetone_d6: 0.07,
          dmso_d6: 0.06,
          benzene_d6: 0.12,
          acetonitrile_d3: 0.07,
          methanol_d4: 0.07,
          water_d2: 0.28,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Hexamethylphosphoramide',
    trivialNames: 'HMPA',
    molWeight: 179.2,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 'd',
          amount: 18,
        },
        chemShifts: {
          chloroform_d: 2.65,
          acetone_d6: 2.59,
          dmso_d6: 2.53,
          benzene_d6: 2.4,
          acetonitrile_d3: 2.57,
          methanol_d4: 2.64,
          water_d2: 2.61,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'n-Hexane',
    trivialNames: '',
    molWeight: 86.18,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 0.88,
          acetone_d6: 0.88,
          dmso_d6: 0.86,
          benzene_d6: 0.89,
          acetonitrile_d3: 0.89,
          methanol_d4: 0.9,
          water_d2: null,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'm',
          amount: 8,
        },
        chemShifts: {
          chloroform_d: 1.26,
          acetone_d6: 1.28,
          dmso_d6: 1.25,
          benzene_d6: 1.24,
          acetonitrile_d3: 1.28,
          methanol_d4: 1.29,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Hydrogen',
    trivialNames: 'H2',
    molWeight: 2.02,
    signals: [
      {
        proton: {
          formula: (
            <span>
              H<sub>2</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 2,
        },
        chemShifts: {
          chloroform_d: 4.62,
          acetone_d6: 4.54,
          dmso_d6: 4.61,
          benzene_d6: 4.47,
          acetonitrile_d3: 4.57,
          methanol_d4: 4.56,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Imidazole',
    trivialNames: '',
    molWeight: 68.08,
    signals: [
      {
        proton: { formula: 'CH (2)', multiplicity: 's', amount: 1 },
        chemShifts: {
          chloroform_d: 7.67,
          acetone_d6: 7.62,
          dmso_d6: 7.63,
          benzene_d6: 7.33,
          acetonitrile_d3: 7.57,
          methanol_d4: 7.67,
          water_d2: 7.78,
        },
      },
      {
        proton: { formula: 'CH (4,5)', multiplicity: 's', amount: 2 },
        chemShifts: {
          chloroform_d: 7.1,
          acetone_d6: 7.04,
          dmso_d6: 7.01,
          benzene_d6: 6.9,
          acetonitrile_d3: 7.01,
          methanol_d4: 7.05,
          water_d2: 7.14,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Methane',
    trivialNames: '',
    molWeight: 16.04,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>4</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 0.22,
          acetone_d6: 0.17,
          dmso_d6: 0.2,
          benzene_d6: 0.16,
          acetonitrile_d3: 0.2,
          methanol_d4: 0.2,
          water_d2: 0.18,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Methanol',
    trivialNames: 'MeOH methyl alcohol Hydroxymethane',
    molWeight: 32.04,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 3.49,
          acetone_d6: 3.31,
          dmso_d6: 3.16,
          benzene_d6: 3.07,
          acetonitrile_d3: 3.28,
          methanol_d4: 3.34,
          water_d2: 3.34,
        },
      },
      {
        proton: { formula: 'OH', multiplicity: 's', amount: 1 },
        chemShifts: {
          chloroform_d: 1.09,
          acetone_d6: 3.12,
          dmso_d6: 4.01,
          benzene_d6: null,
          acetonitrile_d3: 2.16,
          methanol_d4: null,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Nitromethane',
    trivialNames: 'Nitrocarbol',
    molWeight: 61.04,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 4.33,
          acetone_d6: 4.43,
          dmso_d6: 4.42,
          benzene_d6: 2.94,
          acetonitrile_d3: 4.31,
          methanol_d4: 4.34,
          water_d2: 4.4,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'n-Pentane',
    trivialNames: '',
    molWeight: 72.15,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 0.88,
          acetone_d6: 0.88,
          dmso_d6: 0.86,
          benzene_d6: 0.87,
          acetonitrile_d3: 0.89,
          methanol_d4: 0.9,
          water_d2: null,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'm',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 1.27,
          acetone_d6: 1.27,
          dmso_d6: 1.27,
          benzene_d6: 1.23,
          acetonitrile_d3: 1.29,
          methanol_d4: 1.29,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Propane',
    trivialNames: '',
    molWeight: 44.1,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 0.9,
          acetone_d6: 0.88,
          dmso_d6: 0.87,
          benzene_d6: 0.86,
          acetonitrile_d3: 0.9,
          methanol_d4: 0.91,
          water_d2: 0.88,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'm',
          amount: 2,
        },
        chemShifts: {
          chloroform_d: 1.32,
          acetone_d6: 1.31,
          dmso_d6: 1.29,
          benzene_d6: 1.26,
          acetonitrile_d3: 1.33,
          methanol_d4: 1.34,
          water_d2: 1.3,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: '2-Propanol',
    trivialNames: 'Isopropyl alcohol Isopropanol IPA',
    molWeight: 60.1,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 'd',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 1.22,
          acetone_d6: 1.1,
          dmso_d6: 1.04,
          benzene_d6: 0.95,
          acetonitrile_d3: 1.09,
          methanol_d4: 1.5,
          water_d2: 1.17,
        },
      },
      {
        proton: { formula: 'CH', multiplicity: 'm', amount: 1 },
        chemShifts: {
          chloroform_d: 4.04,
          acetone_d6: 3.9,
          dmso_d6: 3.78,
          benzene_d6: 3.67,
          acetonitrile_d3: 3.87,
          methanol_d4: 3.92,
          water_d2: 4.02,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Pyridine',
    trivialNames: 'Azabenzene Azine',
    molWeight: 79.1,
    signals: [
      {
        proton: { formula: 'CH (2)', multiplicity: 'm', amount: 2 },
        chemShifts: {
          chloroform_d: 8.62,
          acetone_d6: 8.58,
          dmso_d6: 8.58,
          benzene_d6: 8.53,
          acetonitrile_d3: 8.57,
          methanol_d4: 8.53,
          water_d2: 8.52,
        },
      },
      {
        proton: { formula: 'CH (3)', multiplicity: 'm', amount: 2 },
        chemShifts: {
          chloroform_d: 7.29,
          acetone_d6: 7.35,
          dmso_d6: 7.39,
          benzene_d6: 6.66,
          acetonitrile_d3: 7.33,
          methanol_d4: 7.44,
          water_d2: 7.45,
        },
      },
      {
        proton: { formula: 'CH (4)', multiplicity: 'm', amount: 1 },
        chemShifts: {
          chloroform_d: 7.68,
          acetone_d6: 7.76,
          dmso_d6: 7.79,
          benzene_d6: 6.98,
          acetonitrile_d3: 7.73,
          methanol_d4: 7.85,
          water_d2: 7.87,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Pyrrole',
    trivialNames: 'Azole Imidole',
    molWeight: 67.09,
    signals: [
      {
        proton: { formula: 'NH', multiplicity: 't', amount: 1 },
        chemShifts: {
          chloroform_d: 8.4,
          acetone_d6: 10.02,
          dmso_d6: 10.75,
          benzene_d6: 7.8,
          acetonitrile_d3: 9.27,
          methanol_d4: null,
          water_d2: null,
        },
      },
      {
        proton: { formula: 'CH (2,5)', multiplicity: 'm', amount: 2 },
        chemShifts: {
          chloroform_d: 6.83,
          acetone_d6: 6.77,
          dmso_d6: 6.73,
          benzene_d6: 6.48,
          acetonitrile_d3: 6.75,
          methanol_d4: 6.72,
          water_d2: 6.93,
        },
      },
      {
        proton: { formula: 'CH (3,4)', multiplicity: 'm', amount: 2 },
        chemShifts: {
          chloroform_d: 6.26,
          acetone_d6: 6.07,
          dmso_d6: 6.01,
          benzene_d6: 6.37,
          acetonitrile_d3: 6.1,
          methanol_d4: 6.08,
          water_d2: 6.26,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Pyrrolidine',
    trivialNames: 'Tetrahydropyrrole Azolidine Prolamine',
    molWeight: 71.12,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub> (2,5)
            </span>
          ),
          multiplicity: 'm',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 2.87,
          acetone_d6: null,
          dmso_d6: 2.67,
          benzene_d6: 2.54,
          acetonitrile_d3: 2.75,
          methanol_d4: 2.8,
          water_d2: 3.07,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub> (3,4)
            </span>
          ),
          multiplicity: 'm',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 1.68,
          acetone_d6: null,
          dmso_d6: 1.55,
          benzene_d6: 1.33,
          acetonitrile_d3: 1.61,
          methanol_d4: 1.72,
          water_d2: 1.87,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Tetrahydrofuran',
    trivialNames: 'THF Oxolane',
    molWeight: 72.11,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'm',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 1.85,
          acetone_d6: 1.79,
          dmso_d6: 1.76,
          benzene_d6: 1.4,
          acetonitrile_d3: 1.8,
          methanol_d4: 1.87,
          water_d2: 1.88,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>O
            </span>
          ),
          multiplicity: 'm',
          amount: 4,
        },
        chemShifts: {
          chloroform_d: 3.76,
          acetone_d6: 3.63,
          dmso_d6: 3.6,
          benzene_d6: 3.57,
          acetonitrile_d3: 3.64,
          methanol_d4: 3.71,
          water_d2: 3.74,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Toluene',
    trivialNames: 'MeBn toluol methylbenzene',
    molWeight: 92.14,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 's',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 2.36,
          acetone_d6: 2.32,
          dmso_d6: 2.3,
          benzene_d6: 2.11,
          acetonitrile_d3: 2.33,
          methanol_d4: 2.32,
          water_d2: null,
        },
      },
      {
        proton: {
          formula: 'CH (2,4,6)',
          multiplicity: 'm',
          amount: 3,
        },
        chemShifts: {
          chloroform_d: 7.17,
          acetone_d6: { lowShift: 7.1, highShift: 7.2 },
          dmso_d6: 7.18,
          benzene_d6: 7.02,
          acetonitrile_d3: { lowShift: 7.1, highShift: 7.3 },
          methanol_d4: 7.16,
          water_d2: null,
        },
      },
      {
        proton: {
          formula: 'CH (3,5)',
          multiplicity: 'm',
          amount: 2,
        },
        chemShifts: {
          chloroform_d: 7.25,
          acetone_d6: { lowShift: 7.1, highShift: 7.2 },
          dmso_d6: 7.25,
          benzene_d6: 7.13,
          acetonitrile_d3: { lowShift: 7.1, highShift: 7.3 },
          methanol_d4: 7.16,
          water_d2: null,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    compound: 'Triethylamine',
    trivialNames: 'TEA',
    molWeight: 101.19,
    signals: [
      {
        proton: {
          formula: (
            <span>
              CH<sub>3</sub>
            </span>
          ),
          multiplicity: 't',
          amount: 9,
        },
        chemShifts: {
          chloroform_d: 1.03,
          acetone_d6: 0.96,
          dmso_d6: 0.93,
          benzene_d6: 0.96,
          acetonitrile_d3: 0.96,
          methanol_d4: 1.05,
          water_d2: 0.99,
        },
      },
      {
        proton: {
          formula: (
            <span>
              CH<sub>2</sub>
            </span>
          ),
          multiplicity: 'q',
          amount: 6,
        },
        chemShifts: {
          chloroform_d: 2.53,
          acetone_d6: 2.45,
          dmso_d6: 2.43,
          benzene_d6: 2.4,
          acetonitrile_d3: 2.45,
          methanol_d4: 2.58,
          water_d2: 2.57,
        },
      },
    ],
  },
]

// {
//   id: uuidv4(),
//   compound: '',
//   trivialNames: '' ,
//   molWeight: ,
//   signals: [
//     {
//       proton: { formula: <span><sub></sub></span>, multiplicity: , amount:  },
//       chemShifts: {
//         chloroform_d: ,
//         acetone_d6: ,
//         dmso_d6: ,
//         benzene_d6: ,
//         acetonitrile_d3: ,
//         methanol_d4: ,
//         water_d2: ,
//       },
//     },
//   ],
// },
