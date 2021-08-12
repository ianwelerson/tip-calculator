import { bootstrap, update as updateTipValues } from "./tipCalculator"
import appStore from '../store'

const htmlContent = `
<div id="tipAmount"></div>
<div id="totalValue"></div>
<button id="resetValues">Reset values</div>
`
beforeAll(() => {
  // Create the store
  window.store = new appStore()

  // Set the html content
  document.body.innerHTML = htmlContent
})

test('create the reset event', () => {
  bootstrap()
})

test('screen values are zero when store has no values', () => {
  updateTipValues()

  expect(document.getElementById('tipAmount').innerText).toBe(0)
  expect(document.getElementById('totalValue').innerText).toBe(0)
})

test('screen values are correct based on store values', () => {
  // Set store values
  window.store.setValue({
    key: 'billValue',
    value: 100
  })
  window.store.setValue({
    key: 'tipPercentage',
    value: 50
  })
  window.store.setValue({
    key: 'numberOfPersons',
    value: 2
  })
  
  updateTipValues()

  expect(document.getElementById('tipAmount').innerText).toBe(25)
  expect(document.getElementById('totalValue').innerText).toBe(75)
})

test('reset state reset is triggered by the reset button', () => {
  window.window.store.resetState = jest.fn()
  document.getElementById('resetValues').click()

  expect(window.window.store.resetState).toBeCalledTimes(1)
})