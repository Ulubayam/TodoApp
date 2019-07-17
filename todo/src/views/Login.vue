<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginStart" method="post">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !email }"
        />
        <div v-show="submitted && !email" class="invalid-feedback">email is required</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Login</button>
        <router-link to="/register" class="btn btn-link">Register</router-link>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      password: "",
      email: "",
      submitted: false
    };
  },
  computed: {
    ...mapState("todoService", ["loggingIn", "loginError"])
  },
  methods: {
    ...mapActions("todoService", ["login"]),
    loginStart() {
      this.submitted = true;
      let user = {
        email: this.email,
        password: this.password
      };
      this.login(user);
    }
  }
};
</script>
<style>
</style>