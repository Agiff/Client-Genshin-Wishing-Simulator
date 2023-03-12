<script>
  export default {
    name: 'CharacterPotrait',
    props: ['character']
  }
</script>

<template>
  <div class="card m-2 character-potrait" style="width: 8rem;">
    <img :src="character.imageUrl" class="card-img-top" alt="...">
    <h6 v-if="this.$route.name === 'inventory'" class="ps-1 cons">C{{ character.constellation }}</h6>
  </div>
</template>

<style scoped>
  .character-potrait {
    overflow: hidden;
    position: relative;
    transition: transform 0.3s ease;
  }
  .character-potrait:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  .cons {
    position: absolute;
    top: 0;
    left: 0;
    text-shadow: 0px 0px 5px #fff;
  }
</style>