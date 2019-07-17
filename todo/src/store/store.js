import Vue from "vue";
import Vuex from "vuex";
import * as todoService from "../store/todo/todo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todoService
  }
});
