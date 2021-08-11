function updateTipValues (store) {
  const calcResult = calcTip(store)

  document.getElementById('tipAmount').innerText = calcResult.tipAmount
  document.getElementById('totalValue').innerText = calcResult.totalValue
}

function calcTip (store) {
  const total = {
    tipAmount: 0,
    totalValue: 0
  }

  if (store.numberOfPersons === 0 || store.billValue === 0) {
    return total
  }

  // Tip
  const tipAmount = store.billValue * (store.tipPercentage / 100)
  total.tipAmount = Math.round(tipAmount * 100) / 100

  // Total
  const totalValue = (tipAmount + store.billValue) / store.numberOfPersons
  total.totalValue = Math.round(totalValue * 100) / 100

  return total
}

export { updateTipValues }