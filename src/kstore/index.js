import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    // state 从何而来 ？
    add (state) {
      state.counter++
    }
  },
  actions: {
    add ({ commit }) {
      console.log('this ', this)
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2
    }
  },
  modules: {
  }
})
