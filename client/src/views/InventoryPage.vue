<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import CharacterPotrait from '../components/CharacterPotrait.vue';

  export default {
    name: 'InventoryPage',
    components: {
      CharacterPotrait
    },
    computed: {
      ...mapState(useGlobalStore, ['inventory', 'fourStarCharacters', 'fiveStarCharacters'])
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchInventories', 'fetchFourStarCharacters', 'fetchFiveStarCharacters']),
      findCharacter(character) {
        const allCharacters = [...this.fourStarCharacters, ...this.fiveStarCharacters];
        const currentCharacter = allCharacters.find(el => el.name === character.name);
        return currentCharacter;
      }
    },
    created() {
      this.fetchInventories();
      this.fetchFourStarCharacters();
      this.fetchFiveStarCharacters();
    }
  }
</script>

<template>
  <div class="container pt-3">
    <div class="row d-flex justify-content-center align-items-center bg-light bg-opacity-75">
      <div class="d-flex justify-content-center align-items-center pt-3">
        <p class="px-3 fw-bold">Primogem: {{ inventory.primogem }}</p>
        <p class="px-3 fw-bold">Intertwined Fate: {{ inventory.intertwined_fate }}</p>
        <p class="px-3 fw-bold">Acquaint Fate: {{ inventory.acquaint_fate }}</p>
        <p class="px-3 fw-bold">Starglitter: {{ inventory.starglitter }}</p>
        <p class="px-3 fw-bold">Weapons: {{ inventory.Weapons.length }}</p>
      </div>
      <CharacterPotrait v-for="(character, index) in inventory.Characters" :key="character.id"
      :character="findCharacter(character)" />
    </div>
  </div>
</template>