<template>
  <div
    class="input-group"
    :class="{
      'input-group--has-error': hasError,
      'input-group--radio-with-manual': isRadioWithOptions
    }"
    data-testid="input-group"
  >
    <!-- Title -->
    <div class="input-group__top">
      <label
        v-if="label"
        class="input-group__label"
      >
        {{ label }}
      </label>
      <p
        v-if="!!feedback"
        class="input-group__feedback"
      >
        {{ feedback }}
      </p>
    </div>
    <!-- Radio with manual input -->
    <div
      v-if="isRadioWithOptions"
      class="input-group__radio-with-manual"
    >
      <!-- Options -->
      <div
        v-for="option in options" :key="option"
        class="radio-options"
      >
        <label class="input-group__element input-group__element--radio">
          <input
            ref="radio-element"
            class="input-group__input"
            type="radio"
            name="tipPercent"
            :value="option"
            v-bind="$attrs"
            v-on="inputListeners"
            @change="clearNonInteractedField('radio')"
            data-testid="radio-input"
          >
          <span class="input-group__inside-label">
            {{ option }}%
          </span>
        </label>
      </div>
      <!-- Manual -->
      <div class="manual-option">
        <div class="input-group__element">
          <input
            ref="input-element"
            class="input-group__input input-group__input--centered-placeholder"
            type="number"
            placeholder="Custom"
            v-bind="$attrs"
            v-on="inputListeners"
            @input="clearNonInteractedField('input')"
            data-testid="manual-radio-input"
          >
        </div>
      </div>
    </div>
    <!-- Normal input -->
    <div
      v-else
      class="input-group__element"
    >
      <img
        v-if="icon && fieldIcon"
        :src="fieldIcon"
        :alt="label"
        class="input-group__pre"
      >
      <input
        ref="input-element"
        class="input-group__input"
        type="number"
        v-bind="$attrs"
        v-on="inputListeners"
        data-testid="normal-input"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

// Mixin
import { ValidationMixin } from '@/mixins/ValidationMixin'

// Interface & Types
import { VueConstructor } from 'vue/types/vue'
import { ValidationReturn, ValidationRule } from '@interface'

@Component({
  inheritAttrs: false
})
export default class InputComponent extends mixins(ValidationMixin) {
  // Props

  // Basic
  @Prop({ type: Number, default: null }) readonly value!: number | null
  @Prop({ type: String, default: null }) readonly label!: string | null
  @Prop({ type: String, default: null }) readonly icon!: string | null
  @Prop({ type: String, default: 'input', validator: (value) => ['input', 'radio-with-manual'].includes(value) }) readonly type!: string
  @Prop({ type: Array, default: null }) readonly options!: number[] | null

  // Validation
  @Prop({ type: Array, default: null }) readonly validation!: ValidationRule[] | null

  // Data
  private fieldIcon: VueConstructor<Vue> | null = null
  private hasError = false
  private feedback: string | null = null

  // Computed
  private get inputListeners () {
    return Object.assign({},
      this.$listeners,
      {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement
          this.$emit('input', target.value || null)
        }
      }
    )
  }

  private get isRadioWithOptions (): boolean {
    return this.type === 'radio-with-manual'
  }

  // Watch
  @Watch('value')
  private onValueChange (newValue: number): void {
    /**
     * If received value is NULL the clear methods are called
     */
    if (newValue === null) {
      // Clear input
      this.clearInput()

      // Clear selection
      this.clearRadioSelection()

      return
    }

    this.validate(newValue)
  }

  // Mounted
  mounted (): void {
    this.loadIcon()
  }

  // Methods
  private async loadIcon (): Promise<void> {
    if (this.icon) {
      this.fieldIcon = (await import(`@/assets/images/icon-${this.icon}.svg`)).default
    }
  }

  private validate (value: number): void {
    if (!this.validation) {
      return
    }

    this.validation.map(validationRule => {
      const result: ValidationReturn = this.validateRule({
        rule: validationRule.rule,
        value
      })

      this.hasError = result.hasError
      this.feedback = validationRule.showMessage ? result.message : null
    })
  }

  private clearRadioSelection (): void {
    const radio = this.$refs['radio-element'] as HTMLInputElement[]
    if (radio) {
      radio.map(element => {
        element.checked = false
      })
    }
  }

  private clearInput (): void {
    const input = this.$refs['input-element'] as HTMLInputElement
    if (input) {
      input.value = ''
    }
  }

  private clearNonInteractedField (interacted: 'radio' | 'input'): void {
    if (interacted === 'radio') {
      this.clearInput()
    } else {
      this.clearRadioSelection()
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  &__top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4rem;
  }

  &__label {
    color: $cyan-600;
    font-size: $fs-small;
    font-weight: $font-normal;
  }

  &__feedback {
    font-size: $fs-small;
    color: $cyan-600;
  }

  // Inside element
  &__element,
  &__inside-label {
    padding: 0.4rem;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: $radius-xsmall;
    background-color: $cyan-300;
    border: $border-base $transparent;
    transition: $transition-base-leave;

    &--options-group {
      padding: 0;
      background-color: $transparent;
      border-color: $transparent !important;
    }

    &:focus-within,
    &:hover {
      transition: $transition-base-enter;
      border-color: $cyan-500;
    }
  }

  &__pre {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: $cyan-400;
  }

  &__input {
    width: 100%;
    padding-left: 1rem;
    padding-right: 0.4rem;
    border: none;
    outline: none;
    text-align: right;
    font-family: $font-family-base;
    font-weight: $font-bold;
    font-size: $fs-base;
    color: $cyan-800;
    background-color: $transparent;

    &--centered-placeholder {
      &::placeholder {
        text-align: center;
      }
    }
  }

  &__radio-with-manual {
    margin: 0 -0.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  // States
  &--has-error & {
    &__feedback {
      color: $red-500;
    }

    &__element {
      border-color: $red-500;
    }
  }

  // Variations
  &--radio-with-manual {
    .radio-options,
    .manual-option {
      width: 33.33%;

    }

    .radio-options {
      .input-group {
        &__element {
          border: none;
          padding: 0.2rem;
          background-color: $transparent;
          cursor: pointer;
        }

        &__input {
          position: absolute;
          z-index: -1;

          &:checked + .input-group__inside-label {
            background-color: $cyan-500;
            color: $cyan-800;
          }
        }

        &__inside-label {
          width: 100%;
          background-color: $cyan-800;
          color: $white;
          font-weight: $font-bold;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
