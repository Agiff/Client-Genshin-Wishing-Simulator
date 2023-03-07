<script>
  export default {
    name: 'BannerCard',
    props: ['banner']
  }
</script>

<template>
  <div class="banner-card" @click="this.$router.push(`/gacha/${banner.id}`)">
    <img :src="banner.bannerImageUrl" class="card-img" alt="...">
  </div>
</template>

<style scoped>
  .banner-card {
    width: 15em;
    overflow: hidden;
    position: relative;
    transition: transform 0.3s ease;
  }
  .banner-card:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
</style>