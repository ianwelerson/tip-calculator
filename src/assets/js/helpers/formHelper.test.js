import { setFieldFeedback } from "./formHelper";

describe('set error with no message', () => {
  const mockHTMLElement = `
    <div class="input-group" id="mockHTMLElement">
      <div class="input-group__top">
        <label class="input-group__label">
          Input Title
        </label>
      </div>
      <div class="input-group__element">
        <input class="input-group__input" type="number">
      </div>
    </div>
  `
  let fakeFeedback
  
  beforeAll(() => {
    document.body.innerHTML = mockHTMLElement

    fakeFeedback = {
      element: document.getElementById('mockHTMLElement'),
      hasError: true,
      feedbackMessage: 'Just a test message'
    }

    setFieldFeedback(fakeFeedback)
  })
  
  test('field have the correct class', () => {
    expect(document.getElementById('mockHTMLElement').classList.contains('input-group--has-error')).toBe(true)
  })
  
  test('field has no feedback message', () => {
    expect(document.getElementById('feedbackElement')).toBe(null)
  })
})

describe('set error message', () => {
  const mockHTMLElement = `
    <div class="input-group input-group--has-error" id="mockHTMLElement">
      <div class="input-group__top">
        <label class="input-group__label">
          Input Title
        </label>
        <p class="input-group__feedback" id="feedbackElement">My feedback</p>
      </div>
      <div class="input-group__element">
        <input class="input-group__input" type="number">
      </div>
    </div>
  `
  let fakeFeedback
  
  beforeAll(() => {
    document.body.innerHTML = mockHTMLElement

    fakeFeedback = {
      element: document.getElementById('mockHTMLElement'),
      hasError: false,
      feedbackMessage: ''
    }

    setFieldFeedback(fakeFeedback)
  })

  test('field has no feedback message', () => {
    expect(document.getElementById('feedbackElement').innerText).toBe('')
  })
})

describe('remove error', () => {
  const mockHTMLElement = `
    <div class="input-group input-group--has-error" id="mockHTMLElement">
      <div class="input-group__top">
        <label class="input-group__label">
          Input Title
        </label>
        <p class="input-group__feedback" id="feedbackElement">My feedback</p>
      </div>
      <div class="input-group__element">
        <input class="input-group__input" type="number">
      </div>
    </div>
  `
  let fakeFeedback
  
  beforeAll(() => {
    document.body.innerHTML = mockHTMLElement

    fakeFeedback = {
      element: document.getElementById('mockHTMLElement'),
      hasError: false,
      feedbackMessage: ''
    }

    setFieldFeedback(fakeFeedback)
  })
  
  test('field has no error class', () => {
    expect(document.getElementById('mockHTMLElement').classList.contains('input-group--has-error')).toBe(false)
  })

  test('field has no feedback message', () => {
    expect(document.getElementById('feedbackElement').innerText).toBe('')
  })
})