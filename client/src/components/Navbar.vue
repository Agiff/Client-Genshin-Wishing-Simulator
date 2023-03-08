<script>
import { mapActions, mapWritableState } from 'pinia';
import { useGlobalStore } from '../stores/global';

  export default {
    name: 'Navbar',
    computed: {
      ...mapWritableState(useGlobalStore, ['isLoggedIn'])
    },
    methods: {
      ...mapActions(useGlobalStore, ['handleLogout', 'topup'])
    },
    created() {
      if (localStorage.access_token) {
        this.isLoggedIn = true;
      }
    }
  }
</script>

<template>
  <nav class="fixed-top">
    <div class="container-fluid d-flex justify-content-end p-3">
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
        <img src="https://muakasan.github.io/genshin-portraits/assets/UI_AvatarIcon_Noel.png" alt="Noel" class="rounded-circle" style="width: 50px; height: 50px;">
      </button> 
      <div class="offcanvas offcanvas-end text-bg-dark p-3" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" style="width: 250px;">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h4>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item d-flex align-items-center my-2">
              <span class="material-symbols-outlined me-2">home</span>
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item d-flex align-items-center my-2">
              <span class="material-symbols-outlined me-2">person</span>
              <router-link class="nav-link" to="/characters">Characters</router-link>
            </li>
            <li class="nav-item d-flex align-items-center my-2" v-if="!isLoggedIn">
              <span class="material-symbols-outlined me-2">login</span>
              <router-link class="nav-link" to="/login">Sign In</router-link>
            </li>
            <li class="nav-item d-flex align-items-center my-2" v-if="!isLoggedIn">
              <span class="material-symbols-outlined me-2">how_to_reg</span>
              <router-link class="nav-link" to="/register">Sign Up</router-link>
            </li>
            <li class="nav-item d-flex align-items-center my-2" v-if="isLoggedIn">
              <span class="material-symbols-outlined me-2">inventory_2</span>
              <router-link class="nav-link" to="/inventory">Inventory</router-link>
            </li>
            <li class="nav-item d-flex align-items-center my-2" v-if="isLoggedIn">
              <span class="material-symbols-outlined me-2">storefront</span>
              <router-link class="nav-link" to="/shop">Shop</router-link>
            </li>
            <li class="nav-item d-flex align-items-center my-2" v-if="isLoggedIn">
              <span class="material-symbols-outlined me-2">credit_card</span>
              <router-link class="nav-link" to="/topup">Top Up</router-link>
            </li>
            <li class="nav-item d-flex align-items-center my-2" v-if="isLoggedIn">
              <span class="material-symbols-outlined me-2">logout</span>
              <a @click.prevent="handleLogout" class="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>