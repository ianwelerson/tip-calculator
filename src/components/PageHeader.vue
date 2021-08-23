<template>
  <header class="page-header">
    <img src="@/assets/images/logo.svg" alt="Splittler" class="logo">
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageHeader extends Vue {
  //
}
</script>

<style lang="scss" scoped>
.logo {
  width: auto;
  height: 3.56rem;
  object-fit: contain;
}
</style>
