<template>
  <div>
    <div id="app">
      <h1>My Todo App!</h1>
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "../views/Login";
import { mapActions } from "vuex";

export default {
  components: {
    Login
  },
  methods: {
    ...mapActions("todoService", ["logout"])
  }
};
</script>

<style lang="scss">
@import "../assets/style.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.4;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $vue-blue;
}

h1 {
  text-align: center;
}
</style>