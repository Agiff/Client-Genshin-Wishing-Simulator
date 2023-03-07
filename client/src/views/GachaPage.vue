<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';

  export default {
    name: 'GachaPage',
    computed: {
      ...mapState(useGlobalStore, ['currentBanner'])
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchBannerById'])
    },
    created() {
      this.fetchBannerById(this.$route.params.id);
    }
  }
</script>

<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
      <img :src="currentBanner.bannerImageUrl" style="width: 65vw; height: 70vh;">
      <div class="align-self-end pt-2" style="margin-right: 10%;">
        <div class="btn btn-primary m-3 shadow p-2" style="width: 15vh;">Wish x1</div>
        <div class="btn btn-primary m-3 shadow p-2" style="width: 15vh;">Wish x10</div>
      </div>
    </div>
  </div>
</template>