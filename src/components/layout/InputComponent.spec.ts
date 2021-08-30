/**
 * This test file uses the vue/test-utils strategy
 *
 * There are a .test and .spec files, this files tests the same component,
 * but one using @testing-library/vue and another using the default @vue/test-utils
 */

// Lib
import { shallowMount } from '@vue/test-utils'

// Component
import InputComponent from '@/components/layout/InputComponent.vue'

// Type and Interface
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
function mountGenerator (propsData: GeneratorInterface) {
  return shallowMount(InputComponent, {
    propsData
  })
}

// Prop
const defaultProps: GeneratorInterface = {
  value: null,
  label: null,
  icon: null,
  type: 'input',
  options: null,
  validation: null
}

describe('InputComponent - vue/test-utils', () => {
  describe('input type', () => {
    it('should render normal input', () => {
      const wrapper = mountGenerator(defaultProps)

      const input = wrapper.find('[data-testid="normal-input"]')

      expect(input.exists()).toBeTruthy()
    })

    it('should render 2 radio options with one manual input', () => {
      const wrapper = mountGenerator({
        ...defaultProps,
        type: 'radio-with-manual',
        options: [1, 2]
      })

      const radio = wrapper.findAll('[data-testid="radio-input"]')
      const manual = wrapper.find('[data-testid="manual-radio-input"')

      expect(radio).toHaveLength(2)
      expect(manual.exists()).toBeTruthy()
    })
  })

  describe('label', () => {
    it('should not render label element', () => {
      const wrapper = mountGenerator(defaultProps)

      const labelElement = wrapper.find('[data-testid="input-label"]')

      expect(labelElement.exists()).toBeFalsy()
    })

    it('should render label element', () => {
      const label = 'My Label'

      const wrapper = mountGenerator({
        ...defaultProps,
        label
      })

      const labelElement = wrapper.find('[data-testid="input-label"]')

      expect(labelElement.exists()).toBeTruthy()
      expect(labelElement.text()).toBe(label)
    })
  })

  describe('icon', () => {
    it('should not render icon element', () => {
      const wrapper = mountGenerator(defaultProps)

      const iconElement = wrapper.find('[data-testid="normal-input-icon"]')

      expect(iconElement.exists()).toBeFalsy()
    })

    it('should render icon element', async () => {
      const wrapper = mountGenerator({
        ...defaultProps,
        icon: 'dollar'
      })

      // Component render
      await wrapper.vm.$nextTick()
      // Icon render
      await wrapper.vm.$nextTick()

      const iconElement = wrapper.find('[data-testid="normal-input-icon"]')
      expect(iconElement.exists()).toBeTruthy()
    })
  })

  describe('interaction', () => {
    it('should emit input when field is changed', async () => {
      const value = '10'

      const wrapper = mountGenerator(defaultProps)

      const input = wrapper.find('[data-testid="normal-input"]')
      await input.setValue(value)
      const inputEmitted = wrapper.emitted().input

      expect(inputEmitted).not.toBeUndefined()
      if (inputEmitted) {
        expect(inputEmitted[0][0]).toBe(value)
      }
    })

    it('should clear field when value prop is changed to null', async () => {
      const value = '10'

      const wrapper = mountGenerator(defaultProps)

      const input = wrapper.find('[data-testid="normal-input"]')

      await input.setValue(value)
      expect((input.element as HTMLInputElement).value).toBe(value)

      await wrapper.setProps({
        value: ''
      })

      expect((input.element as HTMLInputElement).value).toBe('')
    })

    it('should clear the same group field on interaction', async () => {
      const wrapper = mountGenerator({
        ...defaultProps,
        type: 'radio-with-manual',
        options: [1, 2]
      })

      const radioValueOne = wrapper.find('[data-testid="radio-input"][value="1"]')
      const radioValueOneElement = (radioValueOne.element as HTMLInputElement)
      // Set field as checked. I faced a issue when use setChecked()
      radioValueOneElement.checked = true
      radioValueOne.trigger('click')
      radioValueOne.trigger('change')

      // Check if is checked
      expect(radioValueOneElement.checked).toBeTruthy()

      const input = wrapper.find('[data-testid="manual-radio-input"]')

      // Check if the input is empty
      expect((input.element as HTMLInputElement).value).toBe('')

      input.setValue(10)

      // Check if radio is unchecked
      expect((radioValueOne.element as HTMLInputElement).checked).toBeFalsy()
    })
  })

  describe('validation', () => {
    it('should validate the field and show error state and feedback message', async () => {
      const wrapper = mountGenerator({
        ...defaultProps,
        validation: [{
          rule: 'min:1',
          showMessage: true
        }]
      })

      const inputGroup = wrapper.find('[data-testid="input-group"]')

      await wrapper.setProps({
        value: 0
      })

      const feedbackElement = wrapper.find('[data-testid="input-feedback"')

      expect(inputGroup.classes()).toContain('input-group--has-error')
      expect(feedbackElement.exists()).toBeTruthy()
    })

    it('should validate the field and set only error state', async () => {
      const wrapper = mountGenerator({
        ...defaultProps,
        validation: [{
          rule: 'min:1',
          showMessage: false
        }]
      })

      const inputGroup = wrapper.find('[data-testid="input-group"]')

      await wrapper.setProps({
        value: 0
      })

      const feedbackElement = wrapper.find('[data-testid="input-feedback"')

      expect(inputGroup.classes()).toContain('input-group--has-error')
      expect(feedbackElement.exists()).toBeFalsy()
    })
  })
})
