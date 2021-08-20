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
          <input class="input-group__input" type="number">
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
          <div class="input-group__options-buttons">
            <div class="option">
              <div class="input-group input-group--radio tipPercent">
                <label class="input-group__element">
                  <input class="input-group__input" type="radio" name="tipPercent" value="5">
                  <span class="input-group__inside-label">5%</span>
                </label>
              </div>
            </div>
            <div class="option">
              <div class="input-group input-group--radio tipPercent">
                <label class="input-group__element">
                  <input class="input-group__input" type="radio" name="tipPercent" value="10">
                  <span class="input-group__inside-label">10%</span>
                </label>
              </div>
            </div>
            <div class="option">
              <div class="input-group input-group--radio tipPercent">
                <label class="input-group__element">
                  <input class="input-group__input" type="radio" name="tipPercent" value="15">
                  <span class="input-group__inside-label">15%</span>
                </label>
              </div>
            </div>
            <div class="option">
              <div class="input-group input-group--radio tipPercent">
                <label class="input-group__element">
                  <input class="input-group__input" type="radio" name="tipPercent" value="25">
                  <span class="input-group__inside-label">25%</span>
                </label>
              </div>
            </div>
            <div class="option">
              <div class="input-group input-group--radio tipPercent">
                <label class="input-group__element">
                  <input class="input-group__input" type="radio" name="tipPercent" value="50">
                  <span class="input-group__inside-label">50%</span>
                </label>
              </div>
            </div>
            <div class="option">
              <div class="option__content">
                <div class="input-group" id="customTip">
                  <div class="input-group__element">
                    <input class="input-group__input input-group__input--centered-placeholder" type="number" placeholder="Custom">
                  </div>
                </div>
              </div>
            </div>
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
          <input class="input-group__input" type="number">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TipForm extends Vue {
  //
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
}
</style>
