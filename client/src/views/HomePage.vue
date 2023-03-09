<script>
  import { mapState, mapActions } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import BannerCard from '../components/BannerCard.vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';

  export default {
    name: 'HomePage',
    components: {
      BannerCard,
      LoadingSpinner
    },
    computed: {
      ...mapState(useGlobalStore, ['banners', 'isLoading'])
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchBanners'])
    },
    created() {
      this.fetchBanners();
    }
  }
</script>

<template>
  <LoadingSpinner v-if="isLoading"/>
  <div v-if="!isLoading" class="container pt-3">
    <div class="row d-flex justify-content-center align-items-center">
      <BannerCard class="m-3" v-for="(banner, index) in banners" :key="banner"
      :banner="banner" /> 
    </div>
  </div>
</template>