import { defineStore } from 'pinia';
import axios from 'axios';

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
    async fetchFiveStarCharacters() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/characters/fiveStars'
        })
        this.fiveStarCharacters = data;
      } catch (error) {
        console.log(error.response.data.message);
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
        console.log(error.response.data.message);
      }
    },
    async fetchBanners() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/banners'
        })
        this.banners = data;
        console.log(this.banners);
      } catch (error) {
        console.log(error.response.data.message);
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
        console.log(error.response.data.message);
      }
    }
  },
})
