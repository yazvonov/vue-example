<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "@/stores/currency";
import type CurrencyStore from "@/interfaces/CurrencyStore";
const currencyStore = useCurrencyStore();
const { dollar } = storeToRefs(currencyStore) as CurrencyStore;
</script>

<template>
  <div class="currency-view">$1 = {{ dollar }}₽</div>
</template>

<style>
.currency-view {
  text-align: right;
}
</style>
