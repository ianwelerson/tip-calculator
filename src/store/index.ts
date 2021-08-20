import Vue from 'vue'
import Vuex from 'vuex'
import TipModule from '@/store/modules/TipModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    TipModule
  }
})
