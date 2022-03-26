<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";
import type CartStore from "@/interfaces/CartStore";
const cartStore = useCartStore();
const { summary } = storeToRefs(cartStore) as CartStore;
</script>

<template>
  <div class="cart-summary">
    Общая стоимость: <span class="cart-summary__price">{{ summary }} руб.</span>
  </div>
</template>

<style>
.cart-summary__price {
  font-weight: bold;
  color: var(--color-orange);
}
</style>
