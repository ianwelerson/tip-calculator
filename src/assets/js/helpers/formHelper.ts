interface FieldFeedback {
  element: HTMLElement
  hasError: boolean
  feedbackMessage: string
}

function setFieldFeedback({ element, hasError, feedbackMessage }: FieldFeedback) {
  setFieldStyle({
    element,
    hasError
  })

  setFeedbackMessage({
    element,
    message: feedbackMessage
  })
}

function setFeedbackMessage ({ element, message }: { element: HTMLElement, message: string }) {
  const feedbackElement = element.getElementsByClassName('input-group__feedback');

  if (feedbackElement.length) {
    (<HTMLElement>feedbackElement[0]).innerText = message
  }
}

function setFieldStyle ({ element, hasError }: { element: HTMLElement, hasError: boolean }) {
  if (hasError) {
    element.classList.add('input-group--has-error')

    return
  }

  element.classList.remove('input-group--has-error')
}

export {
  setFieldFeedback
}