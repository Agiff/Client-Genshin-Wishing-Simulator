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
      ...mapState(useGlobalStore, ['fourStarCharacters', 'fiveStarCharacters', 'isLoading']),
      allCharacters() {
        return [...this.fourStarCharacters, ...this.fiveStarCharacters].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
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
  <div v-if="!isLoading" class="container pt-3 d-flex justify-content-center">
    <div class="row bg-light bg-opacity-75 pb-4 px-4" style="width: 67vw;">
      <CharacterPotrait v-for="(character, index) in allCharacters" :key="index"
      :character="character" @click="this.$router.push(`/characters/${character.name}`)"/>
    </div>
  </div>
</template>
