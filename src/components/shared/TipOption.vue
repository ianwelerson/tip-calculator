<template>
  <div class="tip-option">
    <div
      class="input-group"
      :class="{ 'input-group--radio': isButton, 'manual-tip': !isButton }"
    >
      <label v-if="isButton" class="input-group__element">
        <input class="input-group__input" type="radio" name="tipPercent" :value="value">
        <span class="input-group__inside-label">{{ value }}%</span>
      </label>
      <div v-else class="input-group__element">
        <input class="input-group__input input-group__input--centered-placeholder" type="number" placeholder="Custom">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TipOption extends Vue {
  // Props
  @Prop({ default: 'button', validator: (value) => ['button', 'input'].includes(value) }) readonly type!: string
  @Prop({ default: '10' }) readonly value!: string

  // Computed
  get isButton (): boolean {
    return this.type === 'button'
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
