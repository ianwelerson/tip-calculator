import { setFieldFeedback } from './formControl'
import { hasError } from './validation'

let localStore;

function bootstrapBillForm (store) {
  localStore = store
  setFieldsListener()
}

function setFieldsListener () {
  // Bill value
  setupListener({
    parentElement: document.getElementById('billValue'),
    event: 'input',
    storeKey: 'billValue',
    callback: null,
    validations: [
      'min:1',
    ]
  })

  // Number of persons
  setupListener({
    parentElement: document.getElementById('numberOfPersons'),
    event: 'input',
    storeKey: 'numberOfPersons',
    callback: null,
    validations: [
      'min:1',
    ]
  })

  // Custom tip
  setupListener({
    parentElement: document.getElementById('customTip'),
    event: 'input',
    storeKey: 'tipPercentage',
    callback: handleTipSelection,
    validations: [],
  })

  // Predefined Percent
  const tipPercent = document.querySelectorAll('div.input-group.input-group--radio.tipPercent');
  for (var tip of tipPercent) {
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

    localStore.setValue({
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

export {
  bootstrapBillForm,
}
