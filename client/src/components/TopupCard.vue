<script>
  import { mapActions } from 'pinia';
  import { useGlobalStore } from '../stores/global';

  export default {
    name: 'TopupCard',
    props: ['price', 'quantity'],
    computed: {
      formatPrice() {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(this.price);
      }
    },
    methods: {
      ...mapActions(useGlobalStore, ['topup'])
    }
  }
</script>

<template>
  <div class="card d-flex flex-column justify-content-center align-items-center">
    <div class="position-relative">
      <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 150px;">
      <div class="position-absolute bottom-0 end-0 text-dark">
        <label class="fw-semibold m-1" style="font-size: 20px;">x{{ quantity }}</label>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center" style="width: 100%;">
      <div @click="topup(price, quantity)" class="btn btn-primary d-flex justify-content-center align-items-center" style="width: 100%;">
        <label class="fw-semibold" style="font-size: 20px;">{{ formatPrice }}</label>
      </div>
    </div>
  </div>
</template>