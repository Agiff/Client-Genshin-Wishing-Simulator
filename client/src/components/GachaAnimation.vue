<script>
  import { mapActions, mapState, mapWritableState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import LoadingSpinner from './LoadingSpinner.vue';

  export default {
    name: 'GachaAnimation',
    props: ['type'],
    components: {
      LoadingSpinner
    },
    computed: {
      ...mapState(useGlobalStore, ['gachaResult', 'fourStarCharacters', 'fiveStarCharacters']),
      ...mapWritableState(useGlobalStore, ['isGacha']),
      getObtainedName() {
        const newName = this.gachaResult.result.obtained.split('-').join(' ');
        return newName.charAt(0).toUpperCase() + newName.slice(1);
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchFourStarCharacters', 'fetchFiveStarCharacters']),
      stopGif() {
        this.timeout = 0;
        clearTimeout(this.timeoutId);
      },
      backToGachaPage() {
        this.isGacha = '';
      }
    },
    data() {
      return {
        timeout: 6670,
        timeoutId: null,
        isLoading: true,
        imageUrl: 'https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Weapon_Dull_Blade.png',
        rarity: 3
      }
    },
    created() {
      this.fetchFourStarCharacters();
      this.fetchFiveStarCharacters();
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false;
        let obtained;
        obtained = this.fourStarCharacters.find(el => el.name === this.gachaResult.result.obtained);
        if (obtained) {
          this.imageUrl = obtained.imageUrl;
          this.rarity = 4;
        }
        obtained = this.fiveStarCharacters.find(el => el.name === this.gachaResult.result.obtained);
        if (obtained) {
          this.imageUrl = obtained.imageUrl;
          this.rarity = 5;
        }
        this.timeoutId = setTimeout(() => {
          this.timeout = 0;
        }, this.timeout);
      }, 500);
    },
    beforeUnmount() {
      clearTimeout(this.timeoutId);
    }
  }
</script>

<template>
  <LoadingSpinner v-if="isLoading"/>
  <div style="position: relative;" v-show="timeout > 0 && !isLoading">
    <div @click="stopGif" class="btn btn-warning" style="position: absolute; bottom: 10px; right: 10px;">Skip</div>
    <img class="vh-100 vw-100" v-if="isGacha === 'Blue Star'" :src="'https://cdn.discordapp.com/attachments/1082853942670655610/1082899285324083241/SingleBlueNoLoopWhite.gif?' + Math.random()">
    <img class="vh-100 vw-100" v-if="isGacha === 'Purple Star'" :src="'https://cdn.discordapp.com/attachments/1082853942670655610/1082899314789072926/SinglePurpleNoLoopWhite.gif?' + Math.random()">
    <img class="vh-100 vw-100" v-if="isGacha === 'Gold Star'" :src="'https://cdn.discordapp.com/attachments/1082853942670655610/1082899325471965184/SingleGoldNoLoopWhite.gif?' + Math.random()">
  </div>
  <div class="container vh-100 d-flex flex-column justify-content-center align-items-center" v-if="timeout === 0 && !isLoading">
    <div class=" bg-light bg-opacity-75 text-center p-5">
      <div @click="backToGachaPage" class="btn btn-primary" style="position: absolute; bottom: 10px; right: 10px;">Back</div>
      <img :src="imageUrl" style="width: 200px;" class="m-5">
      <h1>{{ getObtainedName }}</h1>
      <span class="material-symbols-outlined text-warning fw-normal" style="font-size: 40px;"
      v-for="(item, index) in rarity" :key="index">star</span>
    </div>
  </div>
</template>