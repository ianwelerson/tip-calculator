import Vue from 'vue'
import Vuex from 'vuex'
import TipState from '@storeModule/TipModule'

Vue.use(Vuex)

interface RootState {
  tipModule: TipState;
}

export default new Vuex.Store<RootState>({})
