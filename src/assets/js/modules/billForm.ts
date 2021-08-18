import { setFieldFeedback } from '../helpers/formHelper'
import { hasError } from '../helpers/validationHelper'

interface ListenerInterface {
  parentElement: HTMLElement
  storeKey: string
  validations: Array<string>
  callback: Function | null
  event: string
}

const billValueSelector =  'billValue'
const numberOfPersonsSelector =  'numberOfPersons'
const customTipSelector =  'customTip'
const fixedTipSelector =  'div.input-group.input-group--radio.tipPercent'

function bootstrap () {
  setFieldsListener()
}

function setFieldsListener () {
  // Bill value
  setupListener({
    parentElement: document.getElementById(billValueSelector),
    event: 'input',
    storeKey: 'billValue',
    callback: null,
    validations: [
      'min:1',
    ]
  })

  // Number of persons
  setupListener({
    parentElement: document.getElementById(numberOfPersonsSelector),
    event: 'input',
    storeKey: 'numberOfPersons',
    callback: null,
    validations: [
      'min:1',
    ]
  })

  // Custom tip
  setupListener({
    parentElement: document.getElementById(customTipSelector),
    event: 'input',
    storeKey: 'tipPercentage',
    callback: handleTipSelection,
    validations: [],
  })

  // Predefined Percent
  for (let tip of document.querySelectorAll(fixedTipSelector)) {
    setupListener({
      parentElement: <HTMLElement>tip,
      event: 'change',
      storeKey: 'tipPercentage',
      callback: handleTipSelection,
      validations: [],
    })
  }
}

function setupListener ({ parentElement, storeKey, validations, callback, event }: ListenerInterface) {
  if (!parentElement || !parentElement.getElementsByTagName('input').length) {
    return
  }

  parentElement.querySelector('input').addEventListener(event, (eventElement) => {
    const target = <HTMLInputElement>eventElement.target
    const inputValue = Number(target.value)

    window.store.setValue({
      key: storeKey,
      value: inputValue
    })

    
    // Error feedback
    if (validations.length) {
      let errorFeedback = hasError({
        validations,
        value: inputValue
      })
  
      setFieldFeedback({
        element: parentElement,
        hasError: errorFeedback.hasError,
        feedbackMessage: errorFeedback.message
      })
    }

    // Callback after all execution
    if (callback) {
      callback(parentElement)
    }
  })
}

function handleTipSelection(element: HTMLElement) {
  if (!!element.querySelector('[type=radio]')) {
    const inputElement: HTMLInputElement = document.getElementById('customTip').getElementsByTagName('input')[0]

    inputElement.value = ''

    return;
  }

  const checkedRadio: HTMLInputElement = document.querySelector('[type=radio]:checked')

  if (checkedRadio) {
    checkedRadio.checked = false
  }
}

function resetForm () {
  document.getElementById(billValueSelector).querySelector('input').value = ''
  document.getElementById(numberOfPersonsSelector).querySelector('input').value = ''
  document.getElementById(customTipSelector).querySelector('input').value = ''

  const checkedRadio: HTMLInputElement = document.querySelector('[type=radio]:checked')
  if (checkedRadio) {
    checkedRadio.checked = false
  }
}

export {
  bootstrap,
  resetForm
}
