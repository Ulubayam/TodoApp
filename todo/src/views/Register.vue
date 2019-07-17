<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Full Name</label>
        <input
          type="text"
          v-model="fullName"
          name="fullName"
          class="form-control"
          :class="{ 'is-invalid': submitted && !fullName }"
        />
        <div v-show="submitted && !fullName" class="invalid-feedback">FullName is required</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !email }"
        />
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
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
        <button class="btn btn-primary">Register</button>

        <router-link to="/login" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store/store";
export default {
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      submitted: false
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;

      let data = {
        fullName: this.fullName,
        email: this.email,
        password: this.password
      };
      store
        .dispatch("todoService/register", data)
        .then(() => this.$router.push("/login"))
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
};
</script>


<style>
</style>