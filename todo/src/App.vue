<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>
<script>
import store from "./store/store";
export default {
  computed: {
    isLoggedIn: function() {
      return store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      store.dispatch("todoService/logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("todoService/logout");
        }
        throw err;
      });
    });
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
