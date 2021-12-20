import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    login (state, provider) {
      state.token = provider.token;
    }
  },
  changeToken (state, token) {
    state.token = token;
  },
  logout (state) {
    state.token = '';
  },
  actions: {
    changeToken({ commit }, data) {
      commit('changeToken', data);
    },
    changeLogin({ commit }, data) {
      commit('login', data)
    },
    changeLogout({ commit }) {
      commit('logout')
    }
  }
});

export default store;