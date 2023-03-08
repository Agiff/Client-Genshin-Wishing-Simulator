<script>
  export default {
    name: 'CharacterPotrait',
    props: ['character']
  }
</script>

<template>
  <div class="card m-2 character-potrait" style="width: 8rem;">
    <img :src="character.imageUrl" class="card-img-top" alt="...">
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
</style>