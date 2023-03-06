<script>
  import { mapState, mapActions } from 'pinia';
  import { useGlobalStore } from '../stores/global';

  export default {
    name: 'HomePage',
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
  <h1>Home</h1>
</template>