<script>
  import { mapActions, mapState, mapWritableState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import GachaAnimation from '../components/GachaAnimation.vue';

  export default {
    name: 'GachaPage',
    components: {
      LoadingSpinner,
      GachaAnimation
    },
    computed: {
      ...mapState(useGlobalStore, ['currentBanner', 'isLoading', 'pities', 'gachaResult', 'gachaResult10x']),
      ...mapWritableState(useGlobalStore, ['isGacha']),
      getGuaraGoldStatus() {
        if (this.pities.guaranteedGoldCharacter) return 'On';
        else return 'Off';
      },
      getGuaraPurpleStatus() {
        if (this.pities.guaranteedPurpleCharacter) return 'On';
        else return 'Off';
      },
      getGoldStarRate() {
        if (this.pities.guaranteedGoldCharacter > 75) return '20000';
        else return '600';
      },
      getObtainedName() {
        const newName = this.gachaResult.result.obtained.split('-').join(' ');
        return newName.charAt(0).toUpperCase() + newName.slice(1);
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchBannerById', 'startGachaLimitedCharacter', 'startGachaLimitedCharacter10x', 'fetchPities']),
      startGacha(id) {
        this.delay = true;
        this.startGachaLimitedCharacter(id);
        setTimeout(() => {
          this.delay = false;
          if (this.gachaResult.result.title === 'Blue Star') {
            this.isGacha = this.gachaResult.result.title;
          }
          if (this.gachaResult.result.title === 'Purple Star') {
            this.isGacha = this.gachaResult.result.title;
          }
          if (this.gachaResult.result.title === 'Gold Star') {
            this.isGacha = this.gachaResult.result.title;
          }
        }, 100);
      },
      startGacha10x(id) {
        this.startGachaLimitedCharacter10x(id);
        this.isGacha = true;
      }
    },
    created() {
      this.fetchBannerById(this.$route.params.id);
      this.fetchPities();
    },
    data() {
      return {
        delay: false
      }
    }
  }
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <GachaAnimation v-if="isGacha !== ''"/>
  <div v-if="!isLoading && isGacha === ''" class="container">
    <div class="d-flex justify-content-center align-items-center">
      <div class="bg-light" style="width: 20%; height: 100%;">
        <p>Guaranteed Gold: {{ getGuaraGoldStatus }}</p>
        <p>Guaranteed Purple: {{ getGuaraPurpleStatus }}</p>
        <p>Gold Star Pity: {{ pities.charLimitedGoldPity }}</p>
        <p>Purple Star Pity: {{ pities.charLimitedPurplePity }}</p>
        <hr>
        <p>Gold Star Rate: {{ getGoldStarRate }}</p>
        <p>Purple Star Rate: 5100</p>
        <p>RNG: {{ gachaResult.RNG && !delay ? gachaResult.RNG : 0 }}</p>
        <hr>
        <p>Obtained: {{ gachaResult.result && !delay ? getObtainedName : '-' }}</p>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <img :src="currentBanner.bannerImageUrl" style="width: 65vw; height: 70vh;">
        <div class="align-self-end pt-2" style="margin-right: 10%;">
          <div @click="startGacha(this.$route.params.id)" class="btn btn-primary m-3 shadow p-2" style="width: 15vh;">Wish x1</div>
          <div @click="startGacha10x(this.$route.params.id)" class="btn btn-primary m-3 shadow p-2" style="width: 15vh;">Wish x10</div>
        </div>
      </div>
    </div>
  </div>
</template>