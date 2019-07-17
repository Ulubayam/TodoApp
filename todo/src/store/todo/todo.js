import axios from "axios";
import router from "../../router";

export const namespaced = true;

export const state = {
    todoLists: null,
    todoItems: null,
    status: "",
    token: localStorage.getItem("token") || null,
    user: {},
    loggingIn: false,
    loginError: null
};

export const mutations = {
    loginStop: (state, errorMessage) => {
        state.loggingIn = false;
        state.loginError = errorMessage;
    },
    updateAccessToken: (state, token) => {
        return (state.token = token);
    },
    logout: state => {
        state.token = null;
    },
    SET_TODOLISTS(state, todoLists) {
        state.todoLists = todoLists.data;
    },
    SET_TODOITEMS(state, todoItems) {
        state.todoItems = todoItems;
    },
    loginStart: state => {
        state.loggingIn = true;
    },
    ADD_TODOLISTS(state, todolist) {
        state.todolists.push(todolist);
    },
    ADD_TODOITEMS(state, todoItems) {
        state.todoItems.push(todoItems);
    },
    DELETE_TODOLISTS(state, id) {
        let index = state.todoLists.findIndex(item => item.id == id);
        state.todoLists.splice(index, 1);
    },
    DELETE_TODOITEMS(state, id) {
        let index = state.todoLists.findIndex(item => item.todoItems.id == id);
        state.todoLists.splice(index, 1);
    },
    SET_VALUE(state, parameters) {
        state[parameters.type] = parameters.value;
    },
    UPDATE_TODOITEMS(state, todoItems) {
        state.todoItems = todoItems;
    },
    auth_success(state, token, user) {
        state.status = "success";
        state.token = token;
        state.user = user;
    }
};
export const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
};
export const actions = {
    setValue({ commit }, parameters) {
        commit("SET_VALUE", parameters);
    },
    login({ commit }, user) {
        return new Promise(() => {
            commit("loginStart");
            axios({
                url: "http://localhost:8080/login",
                method: "POST",
                params: {
                    email: user.email,
                    password: user.password
                }
            })
                .then(resp => {
                    const token = resp.data.accessToken;
                    const tokenType = resp.data.tokenType;

                    localStorage.setItem("token", tokenType + " " + token);
                    sessionStorage.setItem("token", tokenType + " " + token);

                    axios.defaults.headers.common["Authorization"] =
                        tokenType + " " + token;

                    commit("loginStop", null);
                    commit("updateAccessToken", resp.data.accessToken);
                    commit("auth_success", token, {
                        email: user.email,
                        password: user.password
                    });
                    router.push("/todo-lists");
                })
                .catch(err => {
                    commit("loginStop", err.response.data.err);
                    commit("updateAccessToken", null);
                });
        });
    },
    fetchAccessToken({ commit }) {
        commit("updateAccessToken", localStorage.getItem("token"));
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit("auth_request");
            axios({
                url: "http://localhost:8080/register",
                data: user,
                method: "POST"
            })
                .then(resp => {
                    const token = resp.data.token;
                    const user = resp.data.user;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", user);
                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("user", user);
                    axios.defaults.headers.common["Authorization"] = token;
                    commit("auth_success", token, resp.status, user);
                    resolve(resp);
                })
                .catch(err => {
                    commit("auth_error", err);
                    localStorage.removeItem("token");
                    reject(err);
                });
        });
    },
    logout({ commit }) {
        localStorage.removeItem("token");
        commit("logout");
        router.push("/login");
    },

    getTodoLists({ commit }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] = localStorage.getItem(
                "token"
            );
            axios({
                url: "http://localhost:8080/todo-lists",
                method: "GET"
            })
                .then(resp => {
                    commit("SET_TODOLISTS", resp);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    createTodolists({ commit, state }, todoList) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] = localStorage.getItem(
                "token"
            );

            axios({
                url: "http://localhost:8080/todo-lists",
                data: todoList,
                method: "POST"
            })
                .then(resp => {
                    if (state.todoLists) {
                        commit("ADD_TODOLISTS", todoList);
                    }
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    deleteTodoLists({ commit }, todoListId) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] = localStorage.getItem(
                "token"
            );
            axios({
                url: "http://localhost:8080/todo-lists/" + todoListId,
                method: "DELETE"
            })
                .then(resp => {
                    commit("DELETE_TODOLISTS", todoListId);
                    router.push("/todo-lists");
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    createTodoItems({ commit }, item) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "token"
        );
        return new Promise((resolve, reject) => {
            axios({
                url: "http://localhost:8080/todo-items",
                method: "POST",
                data: item,
                params: {
                    todoListId: item.todoListId
                }
            })
                .then(resp => {
                    const token = resp.data.token;

                    localStorage.setItem("token", token);
                    sessionStorage.setItem("token", token);

                    axios.defaults.headers.common["Authorization"] = token;
                    commit("ADD_TODOITEMS", item);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    editTodoItem({ commit, state }, todoItemId) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "token"
        );
        return new Promise((resolve, reject) => {
            axios({
                url: "http://localhost:8080/todo-items/" + todoItemId,
                method: "PATCH"
            })
                .then(resp => {
                    commit("SET_TODOLISTS", {
                        status: state.todoLists[0].todoItems[0].status
                    });
                    router.push("/todo-lists");
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    deleteTodoItems({ commit }, todoItemId) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] = localStorage.getItem(
                "token"
            );
            axios({
                url: "http://localhost:8080/todo-items/" + todoItemId,
                method: "DELETE"
            })
                .then(resp => {
                    commit("DELETE_TODOITEMS", todoItemId);
                    router.push("/todo-lists");
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};
