<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import CharacterPotrait from '../components/CharacterPotrait.vue';

  export default {
    name: 'CharacterPage',
    components: {
      CharacterPotrait
    },
    computed: {
      ...mapState(useGlobalStore, ['fourStarCharacters', 'fiveStarCharacters'])
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchFourStarCharacters', 'fetchFiveStarCharacters'])
    },
    created() {
      this.fetchFourStarCharacters();
      this.fetchFiveStarCharacters();
    }
  }
</script>

<template>
  <div class="container pt-3">
    <div class="row d-flex justify-content-center align-items-center bg-light bg-opacity-75">
      <CharacterPotrait v-for="(character, index) in fiveStarCharacters" :key="character.id"
      :character="character" @click="this.$router.push(`/characters/${character.name}`)"/>
    </div>
  </div>
</template>
