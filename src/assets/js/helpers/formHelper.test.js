import { setFieldFeedback } from "./formHelper";

// Load HTML Page
import fs from 'fs'
import path from 'path'
const html = fs.readFileSync(path.resolve(__dirname, '../../../index.html'), 'utf8')
jest.dontMock('fs')

describe('set error on field with no feedback area', () => {
  let element

  beforeAll(() => {
    document.documentElement.innerHTML = html.toString()

    element = document.getElementById('customTip')

    setFieldFeedback({
      element,
      hasError: true,
      feedbackMessage: 'Just a test message'
    })
  })
  
  test('field have the correct class', () => {
    expect(element.classList.contains('input-group--has-error')).toBe(true)
  })
  
  test('field has no feedback message', () => {
    expect(element.querySelector('.input-group__feedback')).toBe(null)
  })
})

describe('set error on a field with feedback area', () => {
  let element
  const message = 'My error message'
  
  beforeAll(() => {
    document.documentElement.innerHTML = html.toString()

    element = document.getElementById('billValue')

    // Set a message
    setFieldFeedback({
      element,
      hasError: true,
      feedbackMessage: message
    })
  })

  test('field feedback has message', () => {
    expect(element.querySelector('.input-group__feedback').innerText).toBe(message)
  })

  test('field has no feedback after clear message', () => {
    setFieldFeedback({
      element,
      hasError: false,
      feedbackMessage: ''
    })

    expect(element.querySelector('.input-group__feedback').innerText).toBe('')
  })
})