import { bootstrap as createTipCalculatorEvents, update as updateTipValues } from "./tipCalculator"
import appStore from '../store'

// Load HTML Page
import fs from 'fs'
import path from 'path'
const html = fs.readFileSync(path.resolve(__dirname, '../../../index.html'), 'utf8')
jest.dontMock('fs')

beforeAll(() => {
  // Create the store
  window.store = new appStore()

  // Set the html content
  document.documentElement.innerHTML = html.toString()
})

test('screen values are zero when store has no values', () => {
  updateTipValues()

  expect(document.getElementById('tipAmount').innerText).toBe('0')
  expect(document.getElementById('totalValue').innerText).toBe('0')
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

  expect(document.getElementById('tipAmount').innerText).toBe('25')
  expect(document.getElementById('totalValue').innerText).toBe('75')
})

test('reset button trigger the reset store', () => {
  createTipCalculatorEvents()

  window.window.store.resetState = jest.fn()

  document.getElementById('resetValues').click()

  expect(window.window.store.resetState).toBeCalledTimes(1)
})