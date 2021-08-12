import { bootstrap, resetForm } from "./billForm"
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
  bootstrap()
})

describe('bill value', () => {
  test('set correct value', () => {
    const value = 10
    document.getElementById('billValue').getElementsByTagName('input')[0].value = value
    document.getElementById('billValue').getElementsByTagName('input')[0].dispatchEvent(new Event('input'))
  
    expect(window.store.getValue('billValue')).toBe(value)
  })
  
  test('set error if value is less than the minimum', () => {
    const value = 0
    document.getElementById('billValue').getElementsByTagName('input')[0].value = value
    document.getElementById('billValue').getElementsByTagName('input')[0].dispatchEvent(new Event('input'))
  
    expect(document.getElementById('billValue').classList.contains('input-group--has-error')).toBeTruthy()
  })
})

describe('number of persons', () => {
  test('set correct value', () => {
    const value = 10
    document.getElementById('numberOfPersons').getElementsByTagName('input')[0].value = value
    document.getElementById('numberOfPersons').getElementsByTagName('input')[0].dispatchEvent(new Event('input'))
  
    expect(window.store.getValue('numberOfPersons')).toBe(value)
  })
  
  test('set error if value is less than the minimum', () => {
    const value = 0
    document.getElementById('numberOfPersons').getElementsByTagName('input')[0].value = value
    document.getElementById('numberOfPersons').getElementsByTagName('input')[0].dispatchEvent(new Event('input'))
  
    expect(document.getElementById('numberOfPersons').classList.contains('input-group--has-error')).toBeTruthy()
  })
})

describe('tip percentage', () => {
  beforeEach(() => {
    window.store.resetState()
  })

  test('select a available option', () => {
    document.querySelectorAll('div.input-group.input-group--radio.tipPercent')[0].getElementsByTagName('input')[0].checked = true
    document.querySelectorAll('div.input-group.input-group--radio.tipPercent')[0].getElementsByTagName('input')[0].dispatchEvent(new Event('change'))
  
    expect(window.store.getValue('tipPercentage')).not.toBe(0)
  })

  test('set manual value', () => {
    const value = 10
    document.getElementById('customTip').getElementsByTagName('input')[0].value = value
    document.getElementById('customTip').getElementsByTagName('input')[0].dispatchEvent(new Event('input'))
  
    expect(window.store.getValue('tipPercentage')).toBe(value)
  })
})

test('reset the form', () => {
  resetForm()
})