<template>
  <div class="tip-form">
    <div
      class="options-block"
      data-testid="options-block"
    >
      <input-element
        label="Bill"
        name="bill"
        icon="dollar"
        v-model.number="billValue"
        :validation="[
          {
            rule: 'min:1',
            showMessage: true
          }
        ]"
      />
    </div>

    <div
      class="options-block"
      data-testid="options-block"
    >
      <input-element
        label="Select Tip $"
        name="tip"
        type="radio-with-manual"
        :options="[5, 10, 15, 25, 50]"
        v-model.number="tipPercent"
      />
    </div>

    <div
      class="options-block"
      data-testid="options-block"
    >
      <input-element
        label="Number of persons"
        name="person"
        icon="person"
        v-model.number="numberOfPersons"
        :validation="[
          {
            rule: 'min:1',
            showMessage: true
          }
        ]"
        data-testid="number-people-input"
      />
    </div>
  </div>
</template>

<script lang="ts">
// Others
import { Component, Vue, Watch } from 'vue-property-decorator'

// Store
import { TipModule } from '@storeModule/TipModule'

// TS
import { TipStore } from '@interface'

@Component
export default class TipForm extends Vue {
  // Data
  private billValue: number | null = null
  private numberOfPersons: number | null = null
  private tipPercent: number | null = null

  // Computed
  private get storeData (): TipStore {
    return TipModule.getAllData
  }

  // Watch
  @Watch('billValue')
  private onBillValueChanged (value: number): void {
    TipModule.updateData({ key: 'bill', value })
  }

  @Watch('tipPercent')
  private onTipPercentChanged (value: number): void {
    TipModule.updateData({ key: 'tip', value })
  }

  @Watch('numberOfPersons')
  private onNumberOfPersonsChanged (value: number): void {
    TipModule.updateData({ key: 'persons', value })
  }

  @Watch('storeData')
  private onStoreBillValueUpdate (fullStore: TipStore): void {
    this.billValue = this.getAdjustedValue(fullStore.bill)
    this.numberOfPersons = this.getAdjustedValue(fullStore.persons)
    this.tipPercent = this.getAdjustedValue(fullStore.tip)
  }

  // Mounted
  private mounted (): void {
    this.billValue = this.getAdjustedValue(TipModule.getData('bill'))
    this.numberOfPersons = this.getAdjustedValue(TipModule.getData('persons'))
  }

  // Methods
  private getAdjustedValue (value: number): number | null {
    return value || null
  }
}
</script>

<style lang="scss" scoped>
.tip-form {
  width: 50%;
  margin-right: 1.4rem;

  @media only screen and (max-width: 600px)  {
    width: 100%;
    margin: 0;
  }

  .options-block {
    margin-bottom: 1.4rem;
    display: flex;
    flex-direction: column;
  }

  .tip-options {
    display: flex;
    flex-wrap: wrap;
    margin: -0.2rem;
  }
}
</style>
