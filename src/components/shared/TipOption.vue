<template>
  <div class="tip-option">
    <div
      class="input-group"
      :class="{ 'input-group--radio': isButton, 'manual-tip': !isButton }"
    >
      <label v-if="isButton" class="input-group__element">
        <input
          :ref="`tip-option-${value}`"
          class="input-group__input"
          type="radio"
          name="tipPercent"
          :value="value"
          v-model.number="tipValue"
          @change="clearPreviusData"
        >
        <span class="input-group__inside-label">
          {{ value }}%
        </span>
      </label>
      <div v-else class="input-group__element">
        <input
          class="input-group__input input-group__input--centered-placeholder"
          type="number"
          placeholder="Custom"
          v-model.number="tipValue"
          @input="clearPreviusData"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Others
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

// Store
import { TipModule } from '@storeModule/TipModule'

@Component
export default class TipOption extends Vue {
  // Props
  @Prop({ default: 'button', validator: (value) => ['button', 'input'].includes(value) }) readonly type!: string
  @Prop({ default: '10' }) readonly value!: string

  // Data
  private tipValue: number | null = null

  // Computed
  private get isButton (): boolean {
    return this.type === 'button'
  }

  // Watch
  @Watch('tipValue')
  private onTipValueChange (value: number) {
    TipModule.updateData({
      key: 'tip',
      value
    })
  }

  // Methods
  // If there is some selected tip, unselect
  private clearPreviusData (): void {
    if (this.isButton) {
      this.clearManualField()

      return
    }

    this.clearPredefinedFIeld()
  }

  private clearManualField (): void {
    const manualTip: HTMLInputElement | null = document.querySelector('.tip-option [type=number]')

    if (manualTip) {
      manualTip.value = ''
    }
  }

  private clearPredefinedFIeld (): void {
    const predefiendTip: HTMLInputElement | null = document.querySelector('.tip-option [name=tipPercent]:checked')

    if (predefiendTip) {
      predefiendTip.checked = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tip-option {
  width: 33.33%;

  .manual-tip {
    padding: 0.2rem;
  }
}
</style>
