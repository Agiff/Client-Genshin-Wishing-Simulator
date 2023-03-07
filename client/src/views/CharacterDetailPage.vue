<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';

  export default {
    name: 'CharacterDetailPage',
    computed: {
      ...mapState(useGlobalStore, ['character', 'fourStarCharacters', 'fiveStarCharacters']),
      getImageUrl() {
        const allCharacters = [...this.fourStarCharacters, ...this.fiveStarCharacters];
        const currentCharacter = allCharacters.find(el => el.name === this.$route.params.name);
        return currentCharacter.imageUrl;
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchCharacterDetail', 'fetchFourStarCharacters', 'fetchFiveStarCharacters']),
      getTalentType(type) {
        if (type === 'Right Click') type = 'Alternate Sprint';
        return type;
      }
    },
    created() {
      this.fetchCharacterDetail(this.$route.params.name);
      this.fetchFourStarCharacters();
      this.fetchFiveStarCharacters();
    }
  }
</script>

<template>
  <div class="container pt-3">
    <div class="row d-flex justify-content-center align-items-center bg-light bg-opacity-75">
      <h1 class="fw-bold">{{ character.name }}</h1>
      <hr>
      <div class="row">
        <div class="col-6">
          <p class="fst-normal">
            <span class="fw-bolder">{{ character.name }}</span>
            is a playable 
            <span class="fw-bolder">{{ character.vision }} Character</span>
            in
            <span class="fw-bolder">Genshin Impact</span></p>
          <p>{{ character.description }}</p>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center align-items-center">
          <img :src="getImageUrl" style="width: 200px;">
          <div class="d-flex justify-content-around mt-2">
            <div class="col-6 d-flex flex-column justify-content-center align-items-center">
              <label class="fw-bold">Rarity</label>
              <div>
                <span class="material-symbols-outlined text-warning fw-normal" style="margin: 0px -3px; font-size: 20px;"
                v-for="(item, index) in character.rarity" :key="index">star</span>
              </div>
            </div>
            <div class="col-6 d-flex flex-column justify-content-center align-items-center">
              <label class="fw-bold">Weapon</label>
              <label class="fw-semibold">{{ character.weapon }}</label>
            </div>
            <div class="col-6 d-flex flex-column justify-content-center align-items-center">
              <label class="fw-bold">Vision</label>
              <label class="fw-semibold">{{ character.vision }}</label>
            </div>
          </div>
        </div>
        <h2 style="margin-top: 5%;">Skill Talents</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(talent, index) in character.skillTalents" :key="talent.id">
              <th scope="row">{{ index+1 }}</th>
              <td>{{ talent.name }}</td>
              <td>{{ getTalentType(talent.unlock) }}</td>
              <td colspan="3" class="description-column">{{ talent.description }}</td>
            </tr>
          </tbody>
        </table>
        <h2 style="margin-top: 5%;">Passive Talents</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(talent, index) in character.passiveTalents" :key="talent.id">
              <th scope="row">{{ index+1 }}</th>
              <td>{{ talent.name }}</td>
              <td>{{ getTalentType(talent.unlock) }}</td>
              <td colspan="3" class="description-column">{{ talent.description }}</td>
            </tr>
          </tbody>
        </table>
        <h2 style="margin-top: 5%;">Constellation</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(talent, index) in character.constellations" :key="talent.id">
              <th scope="row">{{ index+1 }}</th>
              <td>{{ talent.name }}</td>
              <td>{{ getTalentType(talent.unlock) }}</td>
              <td colspan="3" class="description-column">{{ talent.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>