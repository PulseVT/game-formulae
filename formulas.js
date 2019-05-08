const inputs = [
  {
    id: 'mf',
    name: 'Magical force',
    default: 12230
  },
  {
    id: 'cdm',
    name: 'Crit damage modifier',
    default: 3249
  },
  {
    id: 'ccm',
    name: 'Crit chance modifier',
    default: 7843
  },
  {
    id: 'cdb',
    name: 'Crit damage base',
    default: 1.9,
    readonly: true
  },
  {
    id: 'cdr',
    name: 'Crit damage rate',
    default: 67,
    readonly: true
  },
  {
    id: 'ccb',
    name: 'Crit chance base',
    default: 0.1,
    readonly: false
  },
  {
    id: 'ccr',
    name: 'Crit chance rate',
    default: 95.410691003911342894393741851369,
    readonly: true
  }
]
const formulas = [
  {
    formula({cdm, cdr, cdb}) {
      return cdm / cdr / 100 + cdb
    },
    name: 'Crit damage',
    id: 'cd',
    format(value) {
      return `${Math.round(value * 100)}%`
    }
  },
  {
    formula({ccm, ccr, ccb}) {
      return ccm / ccr / 100 + ccb
    },
    name: 'Crit chance',
    id: 'cc',
    format(value) {
      return `${(Math.round(value * 1000)/10).toFixed(1)}%`
    }
  },
  {
    formula({mf, cd, cc}) {
      return mf*cd*cc + (1 - cc)*mf
    },
    name: 'Absolute might',
    format(value) {
      return Math.round(value)
    }
  },
  {
    formula({cd, cc}) {
      return (cd - 1)*cc + 1
    },
    name: 'Magical force efficiency',
    format(value) {
      return value.toFixed(2)
    }
  },
  {
    formula({mf, ccm, ccr, ccb, cdr}) {
      return mf*(ccm / ccr / 100 + ccb)*(1 / cdr / 100)
    },
    name: 'Crit. damage efficiency',
    format(value) {
      return value.toFixed(2)
    }
  },
  {
    formula({mf, cdm, cdr, cdb, ccr}) {
      return mf*(cdm / cdr / 100 + cdb)*(1 / ccr / 100) - mf*(1 / ccr / 100)
    },
    name: 'Crit. chance efficiency',
    format(value) {
      return value.toFixed(2)
    }
  }
]
function addInputs() {
  const inputsElement = document.getElementById('inputs')
  inputsElement.innerHTML = ''
  inputs.forEach(input => {
    inputsElement.innerHTML += `
      ${input.name}: <input 
        type='number' 
        id='${input.id}' 
        value='${input.default}' 
        onchange='calc()'
        ${input.readonly ? 'readonly' : ''}
      />
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
        ${
          f.format ?
          `<span class='formula-format'>${f.format(y)}</span>`
          : ''
        }
      </div>
    `
  })
}
addInputs()
calc()