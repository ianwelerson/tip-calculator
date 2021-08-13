import { bootstrap as bootstrapBillForm, resetForm } from "./billForm"
import StoreApp from '../store'

// Load HTML Page
import fs from 'fs'
import path from 'path'
const html = fs.readFileSync(path.resolve(__dirname, '../../../index.html'), 'utf8')
jest.dontMock('fs')

beforeAll(() => {
  // Setup html
  document.documentElement.innerHTML = html.toString()
  window.store = new StoreApp()

  // Setup listeners
  bootstrapBillForm()
})

describe('change field value can set value on store', () => {
  let blockELement
  let inputElement

  beforeAll(() => {
    blockELement = document.getElementById('billValue')
    inputElement = blockELement.querySelector('input')
  })

  test('set correct value on store', () => {
    const value = 10
    inputElement.value = value
    inputElement.dispatchEvent(new Event('input'))
  
    expect(window.store.getValue('billValue')).toBe(value)
  })
  
  test('throw error if the value is invalid', () => {
    const value = 0
    inputElement.value = value
    inputElement.dispatchEvent(new Event('input'))
  
    expect(blockELement.classList.contains('input-group--has-error')).toBeTruthy()
  })
})

describe('set the tip can be manually or predefined', () => {
  beforeEach(() => {
    window.store.resetState()
  })

  test('select a available option', () => {
    const radioElement = document.querySelector('div.input-group.input-group--radio.tipPercent').querySelector('input')
    const elementValue = Number(radioElement.value)

    radioElement.checked = true
    radioElement.dispatchEvent(new Event('change'))
  
    expect(window.store.getValue('tipPercentage')).toBe(elementValue)
  })

  test('set manual value', () => {
    const value = 10
    const inputElement = document.getElementById('customTip').querySelector('input')

    inputElement.value = value
    inputElement.dispatchEvent(new Event('input'))
  
    expect(window.store.getValue('tipPercentage')).toBe(value)
  })
})

test('reset the form values', () => {
  // Set a radio field to checked
  const radioElement = document.querySelector('div.input-group.input-group--radio.tipPercent').querySelector('input')
  const billValue = document.getElementById('billValue').querySelector('input')
  const numberOfPersons = document.getElementById('numberOfPersons').querySelector('input')
  const customTip = document.getElementById('customTip').querySelector('input')

  radioElement.checked = true
  billValue.value = 30
  numberOfPersons.value = 2
  customTip.value = 10

  resetForm()

  expect(radioElement.checked).toBeFalsy()
  expect(billValue.value).toBe('')
  expect(numberOfPersons.value).toBe('')
  expect(customTip.value).toBe('')
})
