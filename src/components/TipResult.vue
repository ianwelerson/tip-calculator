<template>
<div class="tip-result">
    <div class="result-content">
      <div class="result-content__texts">
        <div class="result-block">
          <div class="result-block__text-side">
            <span class="title-group__title">Tip Amount</span>
            <span class="title-group__unit">/ person</span>
          </div>
          <div class="result-block__value-side">
            <p class="value">
              <span class="value__currency">$</span>
              <span class="value__number" id="tipAmount">0</span>
            </p>
          </div>
        </div>

        <div class="result-block">
          <div class="result-block__text-side">
            <p class="title-group">
              <span class="title-group__title">Total</span>
              <span class="title-group__unit">/ person</span>
            </p>
          </div>
          <div class="result-block__value-side">
            <p class="value">
              <span class="value__currency">$</span>
              <span class="value__number" id="totalValue">0</span>
            </p>
          </div>
        </div>
      </div>

      <div class="result-content__action">
        <button class="button button--secondary button--disabled" id="resetValues">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TipResult extends Vue {
  //
}
</script>

<style lang="scss" scoped>
.tip-result {
  width: 50%;
  display: flex;

  @media only screen and (max-width: 600px)  {
    width: 100%;
  }

  .result-content {
    width: 100%;
    padding: 1.4rem 1rem 1rem 1rem;
    border-radius: $radius-small;
    background-color: $cyan-800;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__texts {
      .result-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        &__text-side {
          .title-group {
            display: flex;
            flex-direction: column;

            &__title {
              color: $white;
            }

            &__unit {
              color: $cyan-400;
              font-size: $fs-xsmall;
              display: flex;
            }
          }
        }

        &__value-side {
          .value {
            display: flex;
            font-size: $fs-lg;
            color: $cyan-500;
            font-weight: $font-bold;
          }
        }

        @media only screen and (max-width: 600px)  {
          &:nth-child(n + 1) {
            margin-bottom: 2rem;
          }
        }
      }
    }

    &__action {
      justify-self: flex-end;
    }
  }
}
</style>
