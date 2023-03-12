import { defineStore } from 'pinia';
import axios from 'axios';
import { failureAlert, successAlert } from '../helpers/sweetalert';
import Swal from 'sweetalert2';

export const useGlobalStore = defineStore('global', {
  state: () => ({ 
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://genshin-wishing-simulator-production.up.railway.app',
    fiveStarCharacters: [],
    fourStarCharacters: [],
    banners: [],
    currentBanner: {},
    isLoggedIn: false,
    isLoading: false,
    isGacha: '',
    isGacha10x: '',
    inventory: {},
    character: {},
    pities: {},
    gachaResult: {},
    gachaResult10x: {},
    obtained: {
      rarity: 3,
      imageUrl: 'https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Weapon_Dull_Blade.png'
    },
    obtained10x: {
      rarity: [],
      imageUrl: []
    },
    historyPath: ''
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
        if (this.currentBanner.id === 1) return this.throwUser("This banner is currently unavailable", '/');
        if (this.inventory.intertwined_fate < 1) {
          this.throwUser("You don't have enough fate", '/shop');
        } else {
          this.gachaResult = {};
          this.gachaResult10x = {};
          const { data } = await axios({
            method: 'GET',
            url: this.baseUrl + '/gachas/limited/' + id,
            headers: {
              access_token: localStorage.access_token
            }
          })
          this.gachaResult = data;
          this.fetchPities();
          this.fetchInventories();
          if (this.gachaResult.result.title === 'Blue Star') {
            this.isGacha = this.gachaResult.result.title;
            this.obtained.rarity = 3;
          }
          if (this.gachaResult.result.title === 'Purple Star') {
            this.isGacha = this.gachaResult.result.title;
            this.obtained.rarity = 4;
          }
          if (this.gachaResult.result.title === 'Gold Star') {
            this.isGacha = this.gachaResult.result.title;
            this.obtained.rarity = 5;
          }
          this.obtained.imageUrl = 'https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Weapon_Dull_Blade.png';

          let findChar;
          findChar = this.fourStarCharacters.find(el => el.name === this.gachaResult.result.obtained);
          if (findChar) {
            this.obtained.imageUrl = findChar.imageUrl;
          }
          findChar = this.fiveStarCharacters.find(el => el.name === this.gachaResult.result.obtained);
          if (findChar) {
            this.obtained.imageUrl = findChar.imageUrl;
          }
        }
      } catch (error) {
        failureAlert(error.response.data.message);
        this.router.push('/login');
      }
    },
    async startGachaLimitedCharacter10x(id) {
      try {
        if (this.currentBanner.id === 1) return this.throwUser("This banner is currently unavailable", '/');
        if (this.inventory.intertwined_fate < 10) {
          this.throwUser("You don't have enough fate", '/shop');
        } else {
          this.gachaResult = {};
          this.gachaResult10x = {};
          const { data } = await axios({
            method: 'GET',
            url: this.baseUrl + '/gachas/limited/' + id + '/10x',
            headers: {
              access_token: localStorage.access_token
            }
          })
          this.gachaResult10x = data;
          this.fetchPities();
          this.fetchInventories();
          const findPurple = this.gachaResult10x.title.find(el => el === 'Purple Star');
          const findGold = this.gachaResult10x.title.find(el => el === 'Gold Star');
          if (findPurple) this.isGacha10x = 'Purple Star';
          if (findGold) this.isGacha10x = 'Gold Star';
          this.obtained10x.rarity = [];
          this.obtained10x.imageUrl = [];
          for (let i = 0; i < 10; i++) {
            if (this.gachaResult10x.title[i] === 'Blue Star') this.obtained10x.rarity.push(3);
            if (this.gachaResult10x.title[i] === 'Purple Star') this.obtained10x.rarity.push(4);
            if (this.gachaResult10x.title[i] === 'Gold Star') this.obtained10x.rarity.push(5);

            this.obtained10x.imageUrl.push('https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Weapon_Dull_Blade.png');
  
            let findChar;
            findChar = this.fourStarCharacters.find(el => el.name === this.gachaResult10x.obtained[i]);
            if (findChar) this.obtained10x.imageUrl[i] = findChar.imageUrl;
            findChar = this.fiveStarCharacters.find(el => el.name === this.gachaResult10x.obtained[i]);
            if (findChar) this.obtained10x.imageUrl[i] = findChar.imageUrl;
          }
        }
      } catch (error) {
        console.log(error);
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
    },
    async fetchPities() {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/gachas/pities',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.pities = data;
        this.isLoading = false;
      } catch (error) {
        failureAlert(error.response.data.message);
        this.router.push('/login');
      }
    },
    async topup(price, quantity) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/users/midtransToken',
          data: { price },
          headers: {
            access_token: localStorage.access_token
          }
        })

        const cb = this.handleTopup;

        window.snap.pay(data.token, {
          onSuccess: function(result){
            cb({ primogem: quantity });
          }
        })
      } catch (error) {
        console.log(error);
        failureAlert(error.response.data.message);
      }
    },
    async handleBuy(userInput) {
      try {
        await axios({
          method: "PUT",
          url: this.baseUrl + "/inventories/buy",
          headers: {
            access_token: localStorage.access_token
          },
          data: userInput
        });
        
        this.fetchInventories();
        successAlert('Purchase success');
        if (this.historyPath === 'gachaPage') {
          this.router.back();
        }
      } catch (error) {
        if (error.response.data.message === "You don't have enough currency") {
          Swal.fire({
            title: "You don't have enough primogem",
            text: "Do you want to top up first?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.push('/topup');
            }
          })
        } else {
          failureAlert(error.response.data.message);
        }
      }
    },
    async handleTopup(userInput) {
      try {
        await axios({
          method: "PATCH",
          url: this.baseUrl + "/inventories/topup",
          headers: {
            access_token: localStorage.access_token
          },
          data: userInput
        });
        
        this.fetchInventories();
        successAlert('Topup success');
      } catch (error) {
        failureAlert(error.response.data.message);
      }
    },
    throwUser(message, destination) {
      this.router.push(destination);
      failureAlert(message);
    }
  },
})
