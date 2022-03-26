<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useGoodStore } from "@/stores/good";
import { useCurrencyStore } from "@/stores/currency";
import CurrencyView from "@/components/currency/CurrencyView.vue";
import CartView from "@/components/cart/CartView.vue";
import GoodList from "@/components/goods/GoodList.vue";
const goodStore = useGoodStore();
const currencyStore = useCurrencyStore();
let updateInterval: number;

onBeforeMount(() => {
  goodStore.getData();
  goodStore.getNames();

  // Update data and dollar currency every 15 seconds
  updateInterval = setInterval(() => {
    goodStore.getData();
    currencyStore.updateDollarCurrency();
  }, 15000);
});

onBeforeUnmount(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});
</script>

<template>
  <CurrencyView />
  <GoodList />
  <CartView />
</template>
