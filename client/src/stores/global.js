import { defineStore } from 'pinia';
import axios from 'axios';
import { failureAlert, successAlert } from '../helpers/sweetalert';

export const useGlobalStore = defineStore('global', {
  state: () => ({ 
    baseUrl: 'http://localhost:3000',
    fiveStarCharacters: [],
    fourStarCharacters: [],
    banners: [],
    currentBanner: {}
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

        localStorage.access_token = data.access_token;
        this.router.push('/');
        successAlert('Logged In');
      } catch (error) {
        console.log(error.response.data.message);
      }
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
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/characters/fiveStars'
        })
        this.fiveStarCharacters = data;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchFourStarCharacters() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/characters/fourStars'
        })
        this.fourStarCharacters = data;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchBanners() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/banners'
        })
        this.banners = data;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    async fetchBannerById(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/banners/' + id
        })
        this.currentBanner = data;
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    }
  },
})
