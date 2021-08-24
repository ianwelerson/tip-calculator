/* eslint-disable import/no-duplicates */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.svg' {
  import { VueConstructor } from 'vue'
  const content: VueConstructor<Vue>
  export default content
}
