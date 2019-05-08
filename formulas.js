const inputs = [
  {
    id: 'mf',
    name: 'Magical force',
    default: 1
  },
  {
    id: 'cdm',
    name: 'Crit damage modifier',
    default: 1
  },
  {
    id: 'ccm',
    name: 'Crit chance modifier',
    default: 1
  },
  {
    id: 'cdb',
    name: 'Crit damage base',
    default: 1.9
  },
  {
    id: 'cdr',
    name: 'Crit damage rate',
    default: 67
  },
  {
    id: 'ccb',
    name: 'Crit chance base',
    default: 0.1
  },
  {
    id: 'ccr',
    name: 'Crit chance rate',
    default: 95.410691003911342894393741851369
  }
]
const formulas = [
  {
    formula({cdm, cdr, cdb}) {
      return cdm / cdr / 100 + cdb
    },
    name: 'Crit damage',
    id: 'cd'
  },
  {
    formula({ccm, ccr, ccb}) {
      return ccm / ccr / 100 + ccb
    },
    name: 'Crit chance',
    id: 'cc'
  },
  {
    formula({mf, cd, cc}) {
      return mf*cd*cc + (1 - cc)*mf
    },
    name: 'Absolute might'
  },
  {
    formula({cd, cc}) {
      return (cd - 1)*cc + 1
    },
    name: 'Magical force efficiency'
  },
  {
    formula({mf, cc}) {
      return mf*cc
    },
    name: 'Crit. damage efficiency'
  },
  {
    formula({mf, cd}) {
      return (mf*cd - mf)
    },
    name: 'Crit. chance efficiency'
  }
]
function addInputs() {
  const inputsElement = document.getElementById('inputs')
  inputsElement.innerHTML = ''
  inputs.forEach(input => {
    inputsElement.innerHTML += `
      ${input.name}: <input type='number' id='${input.id}' value='${input.default}' onchange='calc()'/>
    `
  })
}
function calc() {
  const inputsValues = {}
  inputs.forEach(input => {
    const value = parseFloat(document.getElementById(input.id).value)
    inputsValues[input.id] = value
  })
  const outputsElement = document.getElementById('outputs')
  outputsElement.innerHTML = ''
  formulas.forEach(f => {
    const y = f.formula(inputsValues)
    if(f.id) {
      inputsValues[f.id] = y
    }
    outputsElement.innerHTML += `
      <div class='output-item'>
        <span class='formula-name'>${f.name}</span>
        <span class='formula-value'>${y}</span>
      </div>
    `
  })
}
addInputs()
calc()