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
      ...mapState(useGlobalStore, ['gachaResult', 'obtained', 'gachaResult10x', 'obtained10x']),
      ...mapWritableState(useGlobalStore, ['isGacha', 'isGacha10x']),
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
        if (this.type === 'bulk') {
          if (this.isGacha10x === 'Purple Star') return 'https://cdn.discordapp.com/attachments/1082853942670655610/1082904215476772944/PurpleBulkNoLoopWhite.gif?' + Math.random();
          if (this.isGacha10x === 'Gold Star') return 'https://cdn.discordapp.com/attachments/1082853942670655610/1082904972829663242/GoldBulkNoLoopWhite.gif?' + Math.random();
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
        this.isGacha10x = '';
      },
      getObtainedName10x(name) {
        const newName = name.split('-').join(' ');
        return newName.charAt(0).toUpperCase() + newName.slice(1);
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
    <div v-if="type === 'single'" class=" bg-light bg-opacity-75 text-center p-5">
      <img :src="obtained.imageUrl" style="width: 200px;" class="m-5">
      <h1>{{ getObtainedName }}</h1>
      <span class="material-symbols-outlined text-warning fw-normal" style="font-size: 40px;"
      v-for="(item, index) in obtained.rarity" :key="index">star</span>
    </div>
    <div v-if="type === 'bulk'" class="d-flex bg-light bg-opacity-75 text-center py-3 px-5 flex-wrap" style="width: 70vw; height: 85vh; display: flex; flex-wrap: wrap;">
      <div class="card shadow" v-for="(item, index) in gachaResult10x.obtained" :key="index" style="width: 18%; margin: 1%;">
        <img :src="obtained10x.imageUrl[index]" style="max-width: 100%; padding-bottom: 10%;">
        <h6 class="px-3" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ getObtainedName10x(item) }}</h6>
        <div>
          <span class="material-symbols-outlined text-warning fw-normal" style="font-size: 25px;"
          v-for="(item, index) in obtained10x.rarity[index]" :key="index">star</span>
        </div>
      </div>
    </div>
  </div>
</template>