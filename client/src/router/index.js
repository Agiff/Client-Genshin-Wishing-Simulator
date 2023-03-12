import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import CharacterPage from '../views/CharacterPage.vue';
import GachaPage from '../views/GachaPage.vue';
import InventoryPage from '../views/InventoryPage.vue';
import CharacterDetailPage from '../views/CharacterDetailPage.vue';
import ShopPage from '../views/ShopPage.vue';
import TopupPage from '../views/TopupPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import { useGlobalStore } from '../stores/global';

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
      name: 'gachaPage',
      component: GachaPage
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryPage
    },
    {
      path: '/characters/:name',
      name: 'characterDetail',
      component: CharacterDetailPage
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage
    },
    {
      path: '/topup',
      name: 'topup',
      component: TopupPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  useGlobalStore().historyPath = '';
  if (to.name === 'shop' && localStorage.access_token) useGlobalStore().historyPath = from.name;
  if (to.name === 'login' && localStorage.access_token) next({ name: 'home' })
  else if (to.name === 'register' && localStorage.access_token) next({ name: 'home' })
  else if (to.name === 'inventory' && !localStorage.access_token) next({ name: 'login' })
  else if (to.name === 'shop' && !localStorage.access_token) next({ name: 'login' })
  else if (to.name === 'topup' && !localStorage.access_token) next({ name: 'login' })
  else next()
})

export default router
