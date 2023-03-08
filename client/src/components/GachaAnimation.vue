<script>
  import { mapWritableState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import LoadingSpinner from './LoadingSpinner.vue';

  export default {
    name: 'GachaAnimation',
    props: ['type'],
    components: {
      LoadingSpinner
    },
    computed: {
      ...mapWritableState(useGlobalStore, ['isGacha']),
      stopGif() {
        this.isGacha = '';
        this.timeout = 0;
        clearTimeout(this.timeoutId);
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
          this.isGacha = '';
          this.timeout = 0;
        }, this.timeout);
      }, 500);
    },
    beforeUnmount() {
      console.log('unmounting');
      clearTimeout(this.timeoutId);
    }
  }
</script>

<template>
  <LoadingSpinner v-if="isLoading"/>
  <div style="position: relative;" v-show="isGacha !== '' && !isLoading">
    <div @click="stopGif" class="btn btn-warning" style="position: absolute; bottom: 10px; right: 10px;">Skip</div>
    <img class="vh-100 vw-100" v-if="isGacha === 'Blue Star'" :src="'https://cdn.discordapp.com/attachments/1082853942670655610/1082899285324083241/SingleBlueNoLoopWhite.gif?' + Math.random()">
    <img class="vh-100 vw-100" v-if="isGacha === 'Purple Star'" :src="'https://cdn.discordapp.com/attachments/1082853942670655610/1082899314789072926/SinglePurpleNoLoopWhite.gif?' + Math.random()">
    <img class="vh-100 vw-100" v-if="isGacha === 'Gold Star'" :src="'https://cdn.discordapp.com/attachments/1082853942670655610/1082899325471965184/SingleGoldNoLoopWhite.gif?' + Math.random()">
  </div>
</template>