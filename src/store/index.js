import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: "admin"
    }
  },
  getters: {
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user.name = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
