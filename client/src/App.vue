<script>
  import { RouterView } from 'vue-router'
</script>

<template>
  <div class="background">
    <RouterView />
  </div>
</template>

<style scoped>
  .background {
    background-image: url('https://cdn.discordapp.com/attachments/1082293161440841789/1082302423688814692/image.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    min-height: 100vh;
    min-width: 100vw;
  }
</style>