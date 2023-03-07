<script>
  import { mapState, mapActions } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import BannerCard from '../components/BannerCard.vue';

  export default {
    name: 'HomePage',
    components: {
      BannerCard
    },
    computed: {
      ...mapState(useGlobalStore, ['banners'])
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
  <div class="container pt-3">
    <div class="row d-flex justify-content-center align-items-center">
      <BannerCard class="m-3" v-for="(banner, index) in banners" :key="banner"
      :banner="banner" /> 
    </div>
  </div>
</template>