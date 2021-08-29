// mixins.js
import Vue from 'vue'
import Component from 'vue-class-component'

// Interface
import { ValidationReturn } from '@interface'

// Type
import { ValidationKey } from '@type'

// You can declare mixins as the same style as components.
@Component
export class ValidationMixin extends Vue {
  public validateRule ({ rule, value }: { rule: ValidationKey, value: number }): ValidationReturn {
    const validation: ValidationReturn = {
      hasError: false,
      message: null
    }

    // Rule: Min value
    const minRule = /(^min:)(\d*)/gm.exec(rule)
    if (minRule !== null) {
      if (value < Number(minRule[2])) {
        validation.hasError = true
        validation.message = `The min value is ${minRule[2]}`
      }
    }

    // Rule: Max value
    const maxRule = /(^max:)(\d*)/gm.exec(rule)
    if (maxRule !== null) {
      if (value > Number(maxRule[2])) {
        validation.hasError = true
        validation.message = `The max value is ${maxRule[2]}`
      }
    }

    return validation
  }
}
