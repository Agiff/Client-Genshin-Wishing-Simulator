<script>
  import { mapActions } from 'pinia';
  import { useGlobalStore } from '../stores/global';

  export default {
    name: 'RegisterPage',
    data() {
      return {
        inputRegister: {
          username: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['handleRegister'])
    }
  }
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100" id="register-container">
    <div class="card p-5 shadow bg-light col-lg-6">
      <h1 class="text-center mb-4 fw-bold">Register</h1>
      <form id="register-form" @submit.prevent="handleRegister(this.inputRegister)">
        <div class="mb-3">
          <label for="register-username" class="form-label fw-semibold">Username</label>
          <input type="text" class="form-control" id="register-username"
          v-model="inputRegister.username" />
        </div>
        <div class="mb-3">
          <label for="register-email" class="form-label fw-semibold">Email address</label>
          <input type="email" class="form-control" id="register-email"
          v-model="inputRegister.email" />
        </div>
        <div class="mb-3">
          <label for="register-password" class="form-label fw-semibold">Password</label>
          <input type="password" class="form-control" id="register-password"
          v-model="inputRegister.password" />
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="m-3">
            <button class="btn btn-info px-4" type="submit">Register</button>
          </div>
        </div>
      </form>
      <hr />
      <p class="text-center p-3">
        Already have an account?
        <router-link to="/login">Sign in here</router-link>
      </p>
    </div>
  </div>
</template>