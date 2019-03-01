import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutation-types'
import getters from './getters'
import state from './state'
import actions from './action'

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
  });

  export default store;
  