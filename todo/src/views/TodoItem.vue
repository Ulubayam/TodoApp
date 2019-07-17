<template>
  <div>
    <h3>Todo Items</h3>
    <form id="app" @submit="createTodoItem">
      <div class="card mb-2">
        <div class="card-body">
          <input
            v-model="newTodoText"
            type="text"
            class="form-control"
            placeholder="Please add todoItem.."
            :class="{ 'border border-danger': hasErrorName }"
            @change="changedName"
          />

          <input
            v-model="description"
            type="text"
            class="form-control mt-3"
            placeholder="Please add description.."
            :class="{ 'border border-danger': hasErrorDescription }"
            @change="changedDescription"
          />
          <input
            v-model="status"
            type="text"
            class="form-control mt-3 mb-3"
            placeholder="Please add status.."
            :class="{ 'border border-danger': hasErrorStatus }"
            @change="changedStatus"
          />

          <Datepicker
            placeholder="Please add date.."
            input-class="form-control mt-3"
            :monday-first="true"
            v-on:selected="formatDate"
          ></Datepicker>

          <button type="submit" class="btn btn-primary btn-lg btn-block mt-3">
            <font-awesome-icon class="mr-3" icon="plus" />Add Todo Item in List
          </button>
        </div>
        <h6 v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul style="list-style-type:none;">
            <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
          </ul>
        </h6>
      </div>
    </form>

    <ol class="list-group mt-3" v-for="(item, i) in todoLists" :key="i">
      <li
        v-for="(list, indx) in item.todoItems"
        :key="indx"
        class="list-group-item"
      >
        <div class="row">
          <div class="col-md-6">
            <h5>{{ list.name }}</h5>
          </div>
          <div class="col-md-6">
            <button
              class="btn btn-danger float-right"
              @click="deleteTodoItems(list.id)"
            >
              <font-awesome-icon icon="times" />
            </button>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

import { mapActions, mapState } from "vuex";
import store from "../store/store";

function getTodoLists(to, next) {
  store.dispatch("todoService/getTodoLists").then(() => {
    next();
  });
}

export default {
  data() {
    return {
      deadline: "",
      errors: [],
      date: "",
      hasErrorName: false,
      hasErrorDescription: false,
      hasErrorDeadline: false,
      hasErrorStatus: false,
      description: "",
      status: "",

      options: {
        format: "DD/MM/YYYY",
        useCurrent: false
      },
      newTodoText: ""
      // todos: [
      //   { id: nextTodoId++, text: "Learn about single-file components" },
      //   { id: nextTodoId++, text: "Learn about single-file components" }
      // ]
    };
  },
  components: {
    Datepicker
  },

  methods: {
    ...mapActions("todoService", ["setValue", "deleteTodoItems"]),
    formatDate(date) {
      const startedDate = moment(date).format("YYYY-MM-DD");
      this.deadline = startedDate;
      this.setValue({
        type: "date",
        value: startedDate
      });
    },

    changedName(e) {
      if (e.data != "") {
        this.hasErrorName = false;
      }
    },
    changedDescription(e) {
      if (e.data != "") {
        this.hasErrorDescription = false;
      }
    },

    changedStatus(e) {
      if (e.data != "") {
        this.hasErrorStatus = false;
      }
    },

    createTodoItem(e) {
      if (
        this.newTodoText &&
        this.deadline &&
        this.description &&
        this.status
      ) {
        store.dispatch("todoService/createTodoItems", {
          name: this.newTodoText,
          description: this.description,
          deadline: this.deadline,
          status: this.status,
          todoListId: this.todoLists[0].id
        });
      }
      this.errors = [];

      if (!this.newTodoText) {
        this.errors.push("Name required.");
        if (this.errors.length > 0) {
          this.hasErrorName = true;
        }
      }
      if (!this.description) {
        this.errors.push("Description required.");
        if (this.errors.length > 0) {
          this.hasErrorDescription = true;
        }
      }
      if (!this.status) {
        this.errors.push("Status required.");
        if (this.errors.length > 0) {
          this.hasErrorStatus = true;
        }
      }

      if (!this.deadline) {
        this.errors.push("Date required.");
        if (this.errors.length > 0) {
          this.hasErrorDeadline = true;
        }
      }

      e.preventDefault();
    },

    removeTodo() {},
    checkTodo() {}
  },
  computed: {
    ...mapState("todoService", ["todoLists"]),

    started_date: {
      get() {
        return store.state.todoService.deadline;
      },
      set(value) {
        this.setValue({
          type: "date",
          value: value
        });
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

<style scoped lang="scss"></style>
