import { StoreStructure } from '../../../../ts/interfaces'

function bootstrap () {
  createResetEvent()
}

function update () {
  const calcResult = calcTip(window.store.allValues())

  document.getElementById('tipAmount').innerText = String(calcResult.tipAmount)
  document.getElementById('totalValue').innerText = String(calcResult.totalValue)

  allowResetValues(!!(calcResult.tipAmount && calcResult.totalValue))
}

function calcTip (store: StoreStructure) {
  const total = {
    tipAmount: 0,
    totalValue: 0
  }

  if (store.numberOfPersons === 0 || store.billValue === 0) {
    return total
  }

  // Total tip
  const totalTip = (store.billValue * (store.tipPercentage / 100))

  // Tip
  const tipAmount = totalTip / store.numberOfPersons
  total.tipAmount = Math.round(tipAmount * 100) / 100

  // Total
  const totalValue = (totalTip + store.billValue) / store.numberOfPersons
  total.totalValue = Math.round(totalValue * 100) / 100

  return total
}

function allowResetValues (status: Boolean) {
  const buttonElement = document.getElementById('resetValues')

  if (status) {
    buttonElement.classList.remove('button--disabled')
    
    return
  }

  buttonElement.classList.add('button--disabled')
}

function createResetEvent () {
  document.getElementById('resetValues').addEventListener('click', () => {
    window.store.resetState()
  })
}

export { update, bootstrap }