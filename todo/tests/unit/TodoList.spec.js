import { expect } from "chai";
import Vue from "vue";
import TodoList from "../../src/views/TodoList.vue";

describe("TodoList.vue", () => {
  it(`should update when newTodoText is changed.`, () => {
    const Constructor = Vue.extend(TodoList);

    const comp = new Constructor().$mount();

    comp.newTodoText = "New Text";

    Vue.nextTick(() => {
      expect(comp.$el.textContent).to.equal("New Text");
    });
  });
  it(`should update when description is changed.`, () => {
    const Constructor = Vue.extend(TodoList);

    const comp = new Constructor().$mount();

    comp.description = "New Description";

    Vue.nextTick(() => {
      expect(comp.$el.textContent).to.equal("New Description");
    });
  });
});