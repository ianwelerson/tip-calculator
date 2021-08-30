/**
 * This test file uses the vue/test-utils strategy
 *
 */

// Lib
import { shallowMount } from '@vue/test-utils'

// Mixin
import { ValidationMixin } from '@/mixins/ValidationMixin'

// Component
const MockComponent = {
  template: '<div class="mi-component"></div>'
}

// Generator
function mountGenerator () {
  return shallowMount(
    MockComponent,
    {
      mixins: [ValidationMixin]
    }
  )
}

describe('ValidationMixin', () => {
  describe('minimum', () => {
    const ruleObj = {
      rule: 'min:1'
    }

    test('should return error', () => {
      const wrapper = mountGenerator()

      const validateResult = (wrapper.vm as any).validateRule({
        ...ruleObj,
        value: 0
      })

      expect(validateResult).toEqual({
        hasError: true,
        message: 'The min value is 1'
      })
    })

    test('should NOT return error', () => {
      const wrapper = mountGenerator()

      const validateResult = (wrapper.vm as any).validateRule({
        ...ruleObj,
        value: 10
      })

      expect(validateResult).toEqual({
        hasError: false,
        message: null
      })
    })
  })

  describe('maximum', () => {
    const ruleObj = {
      rule: 'max:10'
    }

    test('should return error', () => {
      const wrapper = mountGenerator()

      const validateResult = (wrapper.vm as any).validateRule({
        ...ruleObj,
        value: 20
      })

      expect(validateResult).toEqual({
        hasError: true,
        message: 'The max value is 10'
      })
    })

    test('should NOT return error', () => {
      const wrapper = mountGenerator()

      const validateResult = (wrapper.vm as any).validateRule({
        ...ruleObj,
        value: 9
      })

      expect(validateResult).toEqual({
        hasError: false,
        message: null
      })
    })
  })
})
