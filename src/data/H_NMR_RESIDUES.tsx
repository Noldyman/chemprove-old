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

export const sources: string[] = ['J. Org. Chem., Vol. 62, No. 21, 1997']

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
    molWeight: 18.015,
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
    molWeight: 60.052,
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
    compound: 'Toluene',
    trivialNames: 'MeBn toluol methylbenzene',
    molWeight: 92.141,
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
          formula: (
            <span>
              CH <em>(o/p)</em>
            </span>
          ),
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
          formula: (
            <span>
              CH <em>(m)</em>
            </span>
          ),
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
    molWeight: 101.193,
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
