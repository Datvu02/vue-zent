import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import home from './modules/home'
import profile from './modules/profile'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    profile,
    home
  },
  plugins: [createPersistedState({ paths: ['auth'] })]
})

export default store