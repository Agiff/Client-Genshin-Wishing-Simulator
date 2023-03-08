<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import CharacterPotrait from '../components/CharacterPotrait.vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';

  export default {
    name: 'InventoryPage',
    components: {
      CharacterPotrait,
      LoadingSpinner
    },
    computed: {
      ...mapState(useGlobalStore, ['inventory', 'fourStarCharacters', 'fiveStarCharacters', 'isLoading'])
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
  <LoadingSpinner v-if="isLoading" />
  <div v-if="!isLoading" class="container pt-3 d-flex justify-content-center">
    <div class="row bg-light bg-opacity-75 pb-4 px-4" style="width: 67vw;">
      <div class="d-flex justify-content-end align-items-center ms-auto me-5 mt-3 mb-3">
        <div class="me-3 d-flex justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 30px;">
          <label class="fw-semibold">{{ inventory.primogem }}</label>
        </div>
        <div class="me-3 d-flex justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Intertwined_Fate.png" style="width: 30px;">
          <label class="fw-semibold">{{ inventory.intertwined_fate }}</label>
        </div>
        <div class="me-3 d-flex justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/2/22/Item_Acquaint_Fate.png" style="width: 30px;">
          <label class="fw-semibold">{{ inventory.acquaint_fate }}</label>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/6/69/Item_Masterless_Starglitter.png" style="width: 25px;">
          <label class="fw-semibold ms-1">{{ inventory.starglitter }}</label>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Weapon_Dull_Blade.png" style="width: 25px;">
          <label class="fw-semibold ms-1">{{ inventory.Weapons ? inventory.Weapons.length : 0 }}</label>
        </div>
      </div>
      <CharacterPotrait v-for="(character, index) in inventory.Characters" :key="character.id"
      :character="findCharacter(character)" @click="this.$router.push(`/characters/${character.name}`)"/>
    </div>
  </div>
</template>