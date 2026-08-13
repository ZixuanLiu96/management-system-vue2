import Vue from "vue";
import Vuex from "vuex";
import { get } from "../utils/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: "",
  },
  getters: {},
  mutations: {
    setRole(state, payload) {
      state.role = payload;
    },
  },
  actions: {
    async getRole({ commit }) {
      const { role } = await get("/getRole");
      commit("setRole", role);
    },
  },
  modules: {},
});
