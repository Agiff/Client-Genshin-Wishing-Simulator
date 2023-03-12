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
      ...mapState(useGlobalStore, ['currentBanner', 'isLoading', 'pities', 'inventory', 'isGacha', 'gachaResult', 'isGacha10x', 'gachaResult10x']),
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
        if (this.gachaResult.result) {
          const newName = this.gachaResult.result.obtained.split('-').join(' ');
          return newName.charAt(0).toUpperCase() + newName.slice(1);
        }
        if (this.gachaResult10x.obtained) {
          const newName = this.gachaResult10x.obtained[9].split('-').join(' ');
          return newName.charAt(0).toUpperCase() + newName.slice(1);
        }
        return '-';
      },
      getRNG() {
        if (this.gachaResult.RNG) return this.gachaResult.RNG;
        if (this.gachaResult10x.RNG) return this.gachaResult10x.RNG[9];
        return '-';
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchBannerById', 'startGachaLimitedCharacter', 'startGachaLimitedCharacter10x', 'fetchPities', 'fetchInventories', 'throwUser', 'fetchPities', 'fetchFiveStarCharacters', 'fetchFourStarCharacters']),
    },
    created() {
      this.fetchBannerById(this.$route.params.id);
      this.fetchPities();
      this.fetchInventories();
      this.fetchFourStarCharacters();
      this.fetchFiveStarCharacters();
    }
  }
</script>

<template>
  <GachaAnimation type="single" v-if="isGacha !== ''"/>
  <GachaAnimation type="bulk" v-if="isGacha10x !== ''"/>
  <div v-if="isGacha === '' && isGacha10x === '' && !isLoading" class="container vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex align-self-end mb-2">
      <div class="me-3 d-flex justify-content-center align-items-center">
        <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 30px;">
        <label class="fw-bold" style="text-shadow: 0px 0px 5px #fff;">{{ inventory.primogem }}</label>
      </div>
      <div v-if="currentBanner.id !== 1" class="me-3 d-flex justify-content-center align-items-center">
        <img src="https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Intertwined_Fate.png" style="width: 30px;">
        <label class="fw-bold" style="text-shadow: 0px 0px 5px #fff;">{{ inventory.intertwined_fate }}</label>
      </div>
      <div v-if="currentBanner.id === 1" class="me-3 d-flex justify-content-center align-items-center">
        <img src="https://static.wikia.nocookie.net/gensin-impact/images/2/22/Item_Acquaint_Fate.png" style="width: 30px;">
        <label class="fw-bold" style="text-shadow: 0px 0px 5px #fff;">{{ inventory.acquaint_fate }}</label>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <img src="https://static.wikia.nocookie.net/gensin-impact/images/6/69/Item_Masterless_Starglitter.png" style="width: 25px;">
        <label class="fw-bold ms-1" style="text-shadow: 0px 0px 5px #fff;">{{ inventory.starglitter }}</label>
      </div>
    </div>
    <div class="d-flex">
      <div class="card bg-light bg-opacity-75 px-3 py-1 me-5" style="width: 15vw; height: 70vh;">
        <p class="pt-3">Guaranteed Gold: {{ getGuaraGoldStatus }}</p>
        <p>Guaranteed Purple: {{ getGuaraPurpleStatus }}</p>
        <p>Gold Star Pity: {{ pities.charLimitedGoldPity }}</p>
        <p>Purple Star Pity: {{ pities.charLimitedPurplePity }}</p>
        <p>Gold Star Rate: {{ getGoldStarRate }}</p>
        <p>Purple Star Rate: 5100</p>
        <p>RNG: {{ getRNG }}</p>
        <hr>
        <p style="margin-bottom: 5px;">Obtained:</p>
        <p class="fw-semibold">{{ getObtainedName }}</p>
      </div>
      <div class="d-flex flex-column">
        <img :src="currentBanner.bannerImageUrl" style="width: 65vw; height: 70vh;">
        <div class="align-self-end mt-3">
          <div @click="startGachaLimitedCharacter(this.$route.params.id)" class="btn btn-primary" style="width: 20vh;">Wish x1</div>
          <div @click="startGachaLimitedCharacter10x(this.$route.params.id)" class="btn btn-primary m-3 shadow p-2" style="width: 20vh;">Wish x10</div>
        </div>
      </div>
    </div>
  </div>
</template>
