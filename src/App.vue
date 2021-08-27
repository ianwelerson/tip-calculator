<template>
  <div class="tip-calculator">
    <div class="tip-calculator__header">
      <PageHeader />
    </div>
    <main class="tip-calculator__main">
      <div class="tip-calculator__content">
        <TipForm />
        <TipResult />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// Partials
const PageHeader = () => import('@/components/PageHeader.vue')
const TipForm = () => import('@/components/partials/TipForm.vue')
const TipResult = () => import('@/components/partials/TipResult.vue')

@Component({
  components: {
    PageHeader,
    TipForm,
    TipResult
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
// Base styles
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/fonts.scss';
@import '@/assets/scss/buttons.scss';

.tip-calculator {
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: $cyan-400;
  font-family: $font-family-base;

  &__header {
    //
  }

  &__main {
    margin-top: 2rem;
    width: $desktop-size;

    @media only screen and (max-width: 600px)  {
      width: 100%;
    }
  }

  &__content {
    padding: 1rem;
    border-radius: $radius-default;
    display: flex;
    align-items: stretch;
    background-color: $white;

    @media only screen and (max-width: 600px)  {
      flex-direction: column;
    }
  }
}
</style>
