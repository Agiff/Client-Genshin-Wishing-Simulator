<script>
  import { mapActions } from 'pinia';
  import { useGlobalStore } from '../stores/global';

  export default {
    name: 'LoginPage',
    data() {
      return {
        inputLogin: {
          emailUsername: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['handleLogin'])
    }
  }
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100" id="login-container">
    <div class="card p-5 shadow bg-light col-lg-6">
      <h1 class="text-center mb-4 fw-bold">Login</h1>
      <form id="login-form" @submit.prevent="handleLogin(this.inputLogin)">
        <div class="mb-3">
          <label for="login-emailUsername" class="form-label fw-semibold">Username / Email</label>
          <input type="text" class="form-control" id="login-emailUsername" aria-describedby="login-help"
          v-model="inputLogin.emailUsername" />
        </div>
        <div class="mb-3">
          <label for="login-password" class="form-label fw-semibold">Password</label>
          <input type="password" class="form-control" id="login-password" 
          v-model="inputLogin.password" />
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="m-3">
            <button class="btn btn-info px-4" type="submit">Login</button>
          </div>
        </div>
      </form>
      <hr />
      <p class="text-center p-3">
        Don't have an account?
        <router-link to="/register">Sign up here</router-link>
      </p>
    </div>
  </div>
</template>