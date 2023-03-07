<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import CharacterPotrait from '../components/CharacterPotrait.vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';

  export default {
    name: 'CharacterPage',
    components: {
      CharacterPotrait,
      LoadingSpinner
    },
    computed: {
      ...mapState(useGlobalStore, ['fourStarCharacters', 'fiveStarCharacters', 'isLoading'])
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
  <LoadingSpinner v-if="isLoading" />
  <div v-if="!isLoading" class="container pt-3">
    <div class="row d-flex justify-content-center align-items-center bg-light bg-opacity-75">
      <CharacterPotrait v-for="(character, index) in fiveStarCharacters" :key="character.id"
      :character="character" @click="this.$router.push(`/characters/${character.name}`)"/>
    </div>
  </div>
</template>
