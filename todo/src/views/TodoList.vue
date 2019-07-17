<template>
  <div>
    <button class="btn btn-danger float-right" @click="logout">Logout</button>
    <h3>Todo Lists</h3>

    <form>
      <div class="card mb-2">
        <div class="card-body input-group">
          <input
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Please add todo.."
            :class="{ 'border border-danger': hasErrorInput }"
            @input="changedInput"
          />

          <span class="input-group-button">
            <button type="submit" class="btn btn-primary" @click="createTodo">
              <font-awesome-icon class="ml-2" icon="plus" />Add
            </button>
          </span>
        </div>
        <h6 v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul style="list-style-type:none;">
            <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
          </ul>
        </h6>
      </div>
    </form>
    <div class="card mb-3" v-for="(todo, i) in todoLists" :key="i">
      <div class="card-body text-center">
        <h3 class="card-text ml-4">
          {{ todo.name }}
          <button
            class="btn btn-danger float-right"
            @click="deleteTodoLists(todo.id)"
          >
            <font-awesome-icon icon="times" />
          </button>
        </h3>
      </div>

      <ul
        class="list-group list-group-flush"
        v-for="(item, index) in todo.todoItems"
        :key="index"
      >
        <li v-if="todo.todoItems" class="list-group-item">
          <b>Event:</b>
          {{ item.name }} ,
          <b>Description:</b>
          {{ item.description }},
          <b>Deadline:</b>
          {{ item.deadline }}
          <div
            v-if="date_diff_indays(today, item.deadline) < 0"
            class="row mt-2"
          >
            <div class="col-md-12">
              <label :for="index">
                <b>Expired</b>
              </label>
            </div>
          </div>
          <div v-else class="row mt-2">
            <div class="col-md-12">
              <input
                class="ml-3"
                type="checkbox"
                :id="item.id"
                @input="changedStatus(item.status, $event)"
                :value="item.status"
               
              />
              <label :for="item.id">
                <b class="ml-2">{{ item.status }}</b>
              </label>
              <!-- <input
            
                class="ml-3"
                type="checkbox"
                :id="item.id"
                @change="changedStatus(item, $event)"
                :value="item.status"
                checked
              /> -->
            </div>
          </div>
        </li>
      </ul>

      <div class="card-body">
        <router-link :to="{ name: 'todo-item', params: { id: todo.id } }">
          <button type="submit" class="btn btn-primary">
            <font-awesome-icon class="mr-2" icon="plus" />Add Item
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import store from "../store/store";
function getTodoLists(to, next) {
  store.dispatch("todoService/getTodoLists").then(() => {
    next();
  });
}

export default {
  data() {
    return {
      name: "",
      hasErrorInput: false,
      errors: [],
      status: "",
      today: null
    };
  },

  computed: {
    ...mapState("todoService", ["todoLists"])
  },

  methods: {
    ...mapActions("todoService", [
      "deleteTodoLists",
      "createTodolists",
      "editTodoItem",
      "logout"
    ]),
    date_diff_indays(date1, date2) {
      let dt1 = new Date(date1);
      let dt2 = new Date(date2);
      return Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
    },
    createTodo() {
      if (!this.hasErrorInput) {
        store
          .dispatch("todoService/createTodolists", {
            name: this.name
          })
          .then(() => {
            this.$router.push({
              name: "todo-lists-show",
              params: { id: this.todoLists[0].id }
            });
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err);
          });
        return true;
      } else {
        this.errors.push("Name required.");
        if (this.errors.length > 0) {
          this.hasErrorInput = true;
        }
      }
      this.errors = [];
    },
    changedStatus(val, event) {
      store.dispatch("todoService/editTodoItem", event.target.id)
      this.todoLists.forEach(element => {
        element.todoItems.forEach(e => {
          if (e.id == event.target.id) {
            if (event.path[0].checked) {
              e.status = "Completed";
            } else {
              e.status = "Not Completed";
            }
          }
        });
      });

      this.today = new Date();
      let dd = String(this.today.getDate()).padStart(2, "0");
      let mm = String(this.today.getMonth() + 1).padStart(2, "0");
      let yyyy = this.today.getFullYear();

      this.today = yyyy + "-" + mm + "-" + dd;
    },

    changedInput(e) {
      if (e.data != "") {
        this.hasErrorInput = false;
      }
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getTodoLists(routeTo, next);
  },

  beforeRouteUpdate(routeTo, routeFrom, next) {
    getTodoLists(routeTo, next);
  }
};
</script>

<style></style>
