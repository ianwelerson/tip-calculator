<template>
  <div class="tip-form">
    <div class="options-block">
      <div class="input-group" id="billValue">
        <div class="input-group__top">
          <label class="input-group__label">
            Bill
          </label>
          <p class="input-group__feedback"></p>
        </div>
        <div class="input-group__element">
          <img src="@/assets/images/icon-dollar.svg" alt="$" class="input-group__pre">
          <input class="input-group__input" type="number" v-model="billValue">
        </div>
      </div>
    </div>

    <div class="options-block">
      <div class="input-group">
        <div class="input-group__top">
          <label class="input-group__label">
            Select Tip %
          </label>
        </div>
        <div class="input-group__element input-group__element--options-group">
          <div class="tip-options">
            <TipOption value="5" />
            <TipOption value="10" />
            <TipOption value="15" />
            <TipOption value="25" />
            <TipOption value="50" />
            <TipOption type="input" />
          </div>
        </div>
      </div>
    </div>

    <div class="options-block">
      <div class="input-group" id="numberOfPersons">
        <div class="input-group__top">
          <label class="input-group__label">
            Number of People
          </label>
          <p class="input-group__feedback"></p>
        </div>
        <div class="input-group__element">
          <img src="@/assets/images/icon-person.svg" alt="Person" class="input-group__pre">
          <input class="input-group__input" type="number" v-model="numberOfPersons">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Others
import { Component, Vue, Watch } from 'vue-property-decorator'

// Store
import { TipModule } from '@storeModule/TipModule'

// Components
const TipOption = () => import('@/components/shared/TipOption.vue')

@Component({
  components: {
    TipOption
  }
})

export default class TipForm extends Vue {
  // Data
  private billValue: number | null = null
  private numberOfPersons: number | null = null

  // Watch
  @Watch('billValue')
  private onBillValueChanged (value: number): void {
    TipModule.updateData({ key: 'bill', value })
  }

  @Watch('numberOfPersons')
  private onNumberOfPersonsChanged (value: number): void {
    TipModule.updateData({ key: 'persons', value })
  }

  // Mounted
  private mounted (): void {
    this.billValue = TipModule.getData('bill') || null
    this.numberOfPersons = TipModule.getData('persons') || null
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
