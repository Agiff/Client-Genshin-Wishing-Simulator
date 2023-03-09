<script>
  import { mapActions, mapState } from 'pinia';
  import { useGlobalStore } from '../stores/global';
  import TopupCard from '../components/TopupCard.vue';

  export default {
    name: 'TopupPage',
    components: {
      TopupCard
    },
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
  <div class="container pt-3 d-flex justify-content-center">
    <div class="row bg-light bg-opacity-75 p-5 position-relative" style="width: 50vw;">
      <div class="position-absolute top-0 end-0 d-flex justify-content-end align-items-center py-3 px-4">
        <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" style="width: 30px;">
        <label class="fw-semibold ms-1">{{ inventory.primogem }}</label>
      </div>
      <div class="col-md-4 py-3">
        <TopupCard price="15000" quantity="120"/>
      </div>
      <div class="col-md-4 py-3">
        <TopupCard price="75000" quantity="600"/>
      </div>
      <div class="col-md-4 py-3">
        <TopupCard price="225000" quantity="1960"/>
      </div>
      <div class="col-md-4 py-3">
        <TopupCard price="450000" quantity="3960"/>
      </div>
      <div class="col-md-4 py-3">
        <TopupCard price="750000" quantity="6560"/>
      </div>
      <div class="col-md-4 py-3">
        <TopupCard price="1500000" quantity="12960"/>
      </div>
    </div>
  </div>
</template>