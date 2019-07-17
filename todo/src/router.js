import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",

      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/secure",
      name: "secure",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Secure.vue")
    },
    {
      path: "/todo-lists",
      name: "todo-lists",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/TodoList.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/todo-item/:id",
      name: "todo-item",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/TodoItem.vue"),
      meta: { requiresAuth: true }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("user"));
    if (authUser && authUser.access_token) {
      next();
    } else {
      next({ name: "login" });
    }
  }
  next();
});

export default router;
