<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';

  export default {
    name: 'Shop',
    computed: {
      ...mapState(useGlobalStore, ['inventory']),
      getMax() {
        return this.inventory.primogem / 160;
      },
      getImageUrl() {
        let result = '';
        if (this.type === 'intertwined_fate') result = 'https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Intertwined_Fate.png';
        else result = 'https://static.wikia.nocookie.net/gensin-impact/images/2/22/Item_Acquaint_Fate.png';
        return result;
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['fetchInventories', 'handleBuy']),
      showSlider(type) {
        this.amount = 1;
        this.slider = true;
        this.type = type;
      },
      hideSlider() {
        this.slider = false;
      },
      onClickBuy() {
        this.slider = false;
        const option = {};
        option[this.type] = this.amount;
        this.handleBuy(option);
      }
    },
    created() {
      this.fetchInventories();
    },
    data() {
      return {
        slider: false,
        amount: 0,
        type: ''
      }
    }
  }
</script>

<template>
  <div class="container vh-100 d-flex flex-column justify-content-center align-items-center">
    <div v-if="!slider" class="d-flex flex-column bg-light bg-opacity-75" style="width: 40vw; height: 50vh;">
      <div class="d-flex justify-content-center align-items-center ms-auto me-5 mt-3">
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
      <div class="d-flex justify-content-evenly align-items-center h-100">
        <div class="card d-flex flex-column justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/1/1f/Item_Intertwined_Fate.png" style="width: 150px;">
          <div class="d-flex justify-content-center align-items-center" style="width: 100%;">
            <div @click="showSlider('intertwined_fate')" class="btn btn-primary d-flex justify-content-center align-items-center" style="width: 100%;">
              <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 40px;">
              <label class="fw-semibold" style="font-size: 20px;">160</label>
            </div>
          </div>
        </div>
        <div class="card d-flex flex-column justify-content-center align-items-center">
          <img src="https://static.wikia.nocookie.net/gensin-impact/images/2/22/Item_Acquaint_Fate.png" style="width: 150px;">
          <div class="d-flex justify-content-center align-items-center" style="width: 100%;">
            <div @click="showSlider('acquaint_fate')" class="btn btn-primary d-flex justify-content-center align-items-center" style="width: 100%;">
              <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 40px;">
              <label class="fw-semibold" style="font-size: 20px;">160</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="slider" class="d-flex flex-column bg-light bg-opacity-75 justify-content-center px-3" style="width: 30vw; height: 30vh;">
      <button @click="hideSlider" type="button" class="btn-close align-self-end" aria-label="Close"></button>
      <label class="fw-semibold mb-3 fs-5" for="amount-slider">Select amount:</label>
      <input class="form-control-range" type="range" id="amount-slider" name="amount" v-model="amount" min="1" :max="getMax">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between align-items-center">
          <span class="ms-3 me-2 fw-semibold text-center fs-3" style="width: 40px;">{{ amount }}</span>
          <img :src="getImageUrl" style="width: 40px;">
        </div>
        <div @click="onClickBuy" class="btn btn-primary w-25 align-self-end my-4">Buy</div>
      </div>
    </div>
  </div>
</template>