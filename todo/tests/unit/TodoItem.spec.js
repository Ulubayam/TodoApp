import { expect } from "chai";
import Vue from "vue";
import TodoItem from "../../src/views/TodoItem.vue";

describe("TodoItem.vue", () => {
  it(`should update when checked is changed.`, () => {
    const Constructor = Vue.extend(TodoItem);

    const comp = new Constructor().$mount();

    comp.newTodoText = "New Text";

    Vue.nextTick(() => {
      expect(comp.$el.textContent).to.equal("New Text");
    });
  });
  it(`should update when value is changed.`, () => {
    const Constructor = Vue.extend(TodoItem);

    const comp = new Constructor().$mount();

    comp.value = "New Value";

    Vue.nextTick(() => {
      expect(comp.$el.textContent).to.equal("New Value");
    });
  });
});
