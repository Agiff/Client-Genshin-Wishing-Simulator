import { defineStore } from 'pinia';
import axios from 'axios';
import { failureAlert, successAlert } from '../helpers/sweetalert';

export const useGlobalStore = defineStore('global', {
  state: () => ({ 
    baseUrl: 'http://localhost:3000',
    fiveStarCharacters: [],
    fourStarCharacters: [],
    banners: [],
    currentBanner: {},
    isLoggedIn: false,
    isLoading: false,
    inventory: {},
    character: {}
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async handleLogin(userInput) {
      try {
        const { data } = await axios({
          method: "POST",
          url: this.baseUrl + "/users/login",
          data: userInput
        });

        this.isLoggedIn = true;
        localStorage.access_token = data.access_token;
        this.router.push('/');
        successAlert('Logged In');
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    handleLogout() {
      this.isLoggedIn = false;
      localStorage.clear();
      this.router.push('/login');
      successAlert('Logged Out');
    },
    async handleRegister(userInput) {
      try {
        await axios({
          method: "POST",
          url: this.baseUrl + "/users/register",
          data: userInput
        });
        
        this.router.push('/login');
        successAlert('Your account has been created');
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchFiveStarCharacters() {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/characters/fiveStars'
        })
        this.fiveStarCharacters = data;
        this.isLoading = false;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchFourStarCharacters() {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/characters/fourStars'
        })
        this.fourStarCharacters = data;
        this.isLoading = false;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchBanners() {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/banners'
        })
        this.banners = data;
        this.isLoading = false;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchBannerById(id) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/banners/' + id
        })
        this.currentBanner = data;
        this.isLoading = false;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchInventories() {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/inventories',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.inventory = data;
        this.isLoading = false;
      } catch (error) {
        failureAlert(error.response.data.message);
        this.router.push('/login');
      }
    },
    async startGachaLimitedCharacter(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/limited/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
      } catch (error) {
        failureAlert(error.response.data.message);
        this.router.push('/login');
      }
    },
    async startGachaLimitedCharacter10x(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/limited/' + id + '/10x',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
      } catch (error) {
        failureAlert(error.response.data.message);
        this.router.push('/login');
      }
    },
    async fetchCharacterDetail(name) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: 'GET',
          url: 'https://api.genshin.dev/characters/' + name
        })
        this.character = data;
        this.isLoading = false;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    }
  },
})
