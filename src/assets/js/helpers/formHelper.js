function setFieldFeedback({ element, hasError, feedbackMessage }) {
  setFieldStyle({
    element,
    hasError
  })

  setFeedbackMessage({
    element,
    message: feedbackMessage
  })
}

function setFeedbackMessage ({ element, message }) {
  const feedbackElement = element.getElementsByClassName('input-group__feedback');

  if (feedbackElement.length) {
    feedbackElement[0].innerText = message
  }
}

function setFieldStyle ({ element, hasError }) {
  if (hasError) {
    element.classList.add('input-group--has-error')

    return
  }

  element.classList.remove('input-group--has-error')
}

export {
  setFieldFeedback
}