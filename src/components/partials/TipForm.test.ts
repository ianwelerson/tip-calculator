/**
 * This test file uses the @testing-library/vue strategy
 *
 * There are a .test and .spec files, this files tests the same component,
 * but one using @testing-library/vue and another using the default @vue/test-utils
 */

// Test
import { render, RenderResult } from '@testing-library/vue'

// Components
import TipForm from '@/components/partials/TipForm.vue'
import InputElement from '@/components/layout/InputComponent.vue'

// Render generator
function renderGenerator (): RenderResult {
  const element: RenderResult = render(TipForm, {
    stubs: {
      'input-element': InputElement
    }
  })

  return element
}

describe('TipForm - @testing-library/vue', () => {
  it('should have three options block', async () => {
    const { findAllByTestId } = renderGenerator()

    const blocks: HTMLElement[] = await findAllByTestId('options-block')

    expect(blocks).toHaveLength(3)
  })

  it('should have five radio inputs and one manual radio option', async () => {
    const { findAllByTestId } = renderGenerator()

    const radioElements: HTMLElement[] = await findAllByTestId('radio-input')
    const manualRadioElements: HTMLElement[] = await findAllByTestId('manual-radio-input')

    expect(radioElements).toHaveLength(5)
    expect(manualRadioElements).toHaveLength(1)
  })

  it('should have two number inputs', async () => {
    const { findAllByTestId } = renderGenerator()

    const inputs: HTMLElement[] = await findAllByTestId('normal-input')

    expect(inputs).toHaveLength(2)
  })
})
