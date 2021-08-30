/**
 * This test file uses the @testing-library/vue strategy
 *
 * There are a .test and .spec files, this files tests the same component,
 * but one using @testing-library/vue and another using the default @vue/test-utils
 */

// Lib
import { render, within, waitFor, RenderResult } from '@testing-library/vue'

// Component
import InputElement from '@/components/layout/InputComponent.vue'

// Interface
import { ValidationRule } from '@interface'
import { AvailableIcon } from '@type'
interface GeneratorInterface {
  value: number | null
  label: string | null
  icon: AvailableIcon | null
  type: string
  options: number[] | null
  validation: ValidationRule[] | null
}

// Generator
function renderGenerator (props: GeneratorInterface): RenderResult {
  const component = render(InputElement, {
    props
  })

  return component
}

// Default prop
const defaultProps: GeneratorInterface = {
  value: null,
  label: null,
  icon: null,
  type: 'input',
  options: null,
  validation: null
}

describe('InputComponent - @testing-library/vue', () => {
  describe('input types', () => {
    it('should render normal input when type is \'input\'', async () => {
      const { findByTestId } = renderGenerator(defaultProps)

      const inputGroup = await findByTestId('input-group')
      const inputELement = await within(inputGroup).findByTestId('normal-input')

      expect(inputELement).not.toBeNull()
    })

    it('should render radio with manual when type is \'radio-with-manual\'', async () => {
      const { findByTestId } = renderGenerator({
        ...defaultProps,
        type: 'radio-with-manual',
        options: [1, 2]
      })

      const inputGroup = await findByTestId('input-group')
      const radioElement = await within(inputGroup).getAllByTestId('radio-input')
      const inputManual = await within(inputGroup).getAllByTestId('manual-radio-input')

      expect(inputGroup).toHaveClass('input-group--radio-with-manual')
      expect(radioElement).toHaveLength(2)
      expect(inputManual).toHaveLength(1)
    })
  })

  it('should render input icon', async () => {
    const { queryByTestId } = renderGenerator({
      ...defaultProps,
      icon: 'dollar'
    })

    // The fieldIcon is dynamic so the waitFor is necessary
    await waitFor(() => {
      const inputIcon = queryByTestId('normal-input-icon')
      expect(inputIcon).toBeInTheDocument()
    })
  })

  describe('label', () => {
    it('should not have label if label is null', async () => {
      const { queryByTestId } = renderGenerator({
        ...defaultProps
      })

      const inputLabel = await queryByTestId('input-label')

      expect(inputLabel).not.toBeInTheDocument()
    })

    it('should have label if label', async () => {
      const { queryByTestId } = renderGenerator({
        ...defaultProps,
        label: 'My Field'
      })

      const inputLabel = await queryByTestId('input-label')

      expect(inputLabel).toBeInTheDocument()
    })
  })

  describe('validation feedback', () => {
    it('should set error class and message if the value is less than the minimum', async () => {
      const { findByTestId, updateProps } = renderGenerator({
        ...defaultProps,
        validation: [{
          rule: 'min:1',
          showMessage: true
        }]
      })

      const inputGroup = await findByTestId('input-group')

      // Simulating the value props update after field type
      await updateProps({
        value: 0
      })

      const feedbackMessage = within(inputGroup).queryByTestId('input-feedback')
      expect(inputGroup).toHaveClass('input-group--has-error')
      expect(feedbackMessage).toBeInTheDocument()
    })

    it('should set error class and message if the value is more than the max', async () => {
      const { findByTestId, updateProps } = renderGenerator({
        ...defaultProps,
        validation: [{
          rule: 'max:10',
          showMessage: true
        }]
      })

      const inputGroup = await findByTestId('input-group')

      // Simulating the value props update after field type
      await updateProps({
        value: 11
      })

      const feedbackMessage = within(inputGroup).queryByTestId('input-feedback')
      expect(inputGroup).toHaveClass('input-group--has-error')
      expect(feedbackMessage).toBeInTheDocument()
    })

    it('should not has message if show message is false', async () => {
      const { findByTestId, updateProps } = renderGenerator({
        ...defaultProps,
        validation: [{
          rule: 'max:10',
          showMessage: false
        }]
      })

      const inputGroup = await findByTestId('input-group')

      // Simulating the value props update after field type
      await updateProps({
        value: 11
      })

      const feedbackMessage = within(inputGroup).queryByTestId('input-feedback')
      expect(feedbackMessage).not.toBeInTheDocument()
    })
  })
})
