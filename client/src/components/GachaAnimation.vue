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
      ...mapState(useGlobalStore, ['gachaResult', 'obtained']),
      ...mapWritableState(useGlobalStore, ['isGacha']),
      getObtainedName() {
        const newName = this.gachaResult.result.obtained.split('-').join(' ');
        return newName.charAt(0).toUpperCase() + newName.slice(1);
      },
      getGif() {
        if (this.type === 'single') {
          if (this.isGacha === 'Blue Star') return 'https://cdn.discordapp.com/attachments/1082853942670655610/1082899285324083241/SingleBlueNoLoopWhite.gif?' + Math.random();
          if (this.isGacha === 'Purple Star') return 'https://cdn.discordapp.com/attachments/1082853942670655610/1082899314789072926/SinglePurpleNoLoopWhite.gif?' + Math.random();
          if (this.isGacha === 'Gold Star') return 'https://cdn.discordapp.com/attachments/1082853942670655610/1082899325471965184/SingleGoldNoLoopWhite.gif?' + Math.random();
        }
      }
    },
    methods: {
      stopGif() {
        this.timeout = 0;
        clearTimeout(this.timeoutId);
        this.$refs.gifImage.src = "";
      },
      backToGachaPage() {
        this.isGacha = '';
      }
    },
    data() {
      return {
        timeout: 6670,
        timeoutId: null,
        isLoading: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false;
        this.timeoutId = setTimeout(() => {
          this.timeout = 0;
          this.$refs.gifImage.src = "";
        }, this.timeout);
      }, 500);
    },
    beforeUnmount() {
      clearTimeout(this.timeoutId);
      this.$refs.gifImage.src = "";
    }
  }
</script>

<template>
  <LoadingSpinner v-if="isLoading"/>
  <div @click="stopGif" style="position: relative;" v-show="timeout > 0 && !isLoading">
    <!-- <div @click="stopGif" class="btn btn-warning" style="position: absolute; bottom: 10px; right: 10px;">Skip</div> -->
    <img ref="gifImage" class="vh-100 vw-100" :src="getGif">
  </div>
  <div @click="backToGachaPage" class="container vh-100 d-flex flex-column justify-content-center align-items-center" v-if="timeout === 0 && !isLoading">
    <div class=" bg-light bg-opacity-75 text-center p-5">
      <img :src="obtained.imageUrl" style="width: 200px;" class="m-5">
      <h1>{{ getObtainedName }}</h1>
      <span class="material-symbols-outlined text-warning fw-normal" style="font-size: 40px;"
      v-for="(item, index) in obtained.rarity" :key="index">star</span>
    </div>
  </div>
</template>