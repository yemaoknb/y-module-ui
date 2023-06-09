import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [],
  state: {
    BUTTON_AUTH: [], // 按钮权限
  },

  mutations: {
    SET_BUTTON_AUTH(state, payload) {
      state.BUTTON_AUTH = payload
    },
  },
  actions: {
    async setOperationRole({ commit }) {
      commit('SET_BUTTON_AUTH', [])
    },
  }
})
