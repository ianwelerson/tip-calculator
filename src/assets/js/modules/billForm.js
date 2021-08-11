import { setFieldFeedback } from '../helpers/formHelper'
import { hasError } from '../helpers/validationHelper'

const billValueElement =  document.getElementById('billValue')
const numberOfPersonsElement =  document.getElementById('numberOfPersons')
const customTipElement =  document.getElementById('customTip')
const fixedTipElement =  document.querySelectorAll('div.input-group.input-group--radio.tipPercent')

function bootstrap () {
  setFieldsListener()
}

function setFieldsListener () {
  // Bill value
  setupListener({
    parentElement: billValueElement,
    event: 'input',
    storeKey: 'billValue',
    callback: null,
    validations: [
      'min:1',
    ]
  })

  // Number of persons
  setupListener({
    parentElement: numberOfPersonsElement,
    event: 'input',
    storeKey: 'numberOfPersons',
    callback: null,
    validations: [
      'min:1',
    ]
  })

  // Custom tip
  setupListener({
    parentElement: customTipElement,
    event: 'input',
    storeKey: 'tipPercentage',
    callback: handleTipSelection,
    validations: [],
  })

  // Predefined Percent
  for (var tip of fixedTipElement) {
    setupListener({
      parentElement: tip,
      event: 'change',
      storeKey: 'tipPercentage',
      callback: handleTipSelection,
      validations: [],
    })
  }
}

function setupListener ({ parentElement, storeKey, validations, callback, event }) {
  if (!parentElement || !parentElement.getElementsByTagName('input').length) {
    return
  }

  parentElement.getElementsByTagName('input')[0].addEventListener(event, (event) => {
    const inputValue = Number(event.target.value)

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

function handleTipSelection(element) {
  if (!!element.querySelector('[type=radio]')) {
    document.getElementById('customTip').getElementsByTagName('input')[0].value = ''

    return;
  }

  const checkedRadio = document.querySelector('[type=radio]:checked')

  if (checkedRadio) {
    checkedRadio.checked = false
  }
}

function resetForm () {
  billValueElement.getElementsByTagName('input')[0].value = ''
  numberOfPersonsElement.getElementsByTagName('input')[0].value = ''
  customTipElement.getElementsByTagName('input')[0].value = ''

  const checkedRadio = document.querySelector('[type=radio]:checked')
  if (checkedRadio) {
    checkedRadio.checked = false
  }
}

export {
  bootstrap,
  resetForm
}
