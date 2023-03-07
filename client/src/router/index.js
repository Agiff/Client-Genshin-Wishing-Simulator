import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import CharacterPage from '../views/CharacterPage.vue';
import GachaPage from '../views/GachaPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharacterPage
    },
    {
      path: '/gacha/:id',
      name: 'gacha/:id',
      component: GachaPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && localStorage.access_token) next({ name: 'home' })
  else if (to.name === 'register' && localStorage.access_token) next({ name: 'home' })
  else next()
})

export default router
