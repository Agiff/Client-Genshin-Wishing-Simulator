<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';

  export default {
    name: 'Shop',
    computed: {
      ...mapState(useGlobalStore, ['inventory'])
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchInventories'])
    },
    created() {
      this.fetchInventories();
    }
  }
</script>

<template>
  <div class="container vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex flex-column justify-content-center align-items-center bg-light bg-opacity-75" style="width: 60vw; height: 75vh;">
      <div class="d-flex justify-content-center align-items-center ms-auto me-5 mt-3 bg-primary">
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
      </div>
      <div class="d-flex">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Intertwined_Fate.png" style="width: 150px;">
          <div class="me-3 d-flex justify-content-center align-items-center">
            <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 40px;">
            <label class="fw-semibold" style="font-size: 20px;">160</label>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/2/22/Item_Acquaint_Fate.png" style="width: 150px;">
          <div class="me-3 d-flex justify-content-center align-items-center">
            <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 30px;">
            <label class="fw-semibold">160</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>