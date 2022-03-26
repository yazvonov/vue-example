<script setup lang="ts">
import type GoodStore from "@/interfaces/GoodStore";
import type CartGood from "@/interfaces/CartGood";
import type Good from "@/interfaces/Good";
import { storeToRefs } from "pinia";
import { useGoodStore } from "@/stores/good";
import { useCartStore } from "@/stores/cart";
import { computed, type ComputedRef } from "vue";
import CartItemQuantity from "@/components/cart/CartItemQuantity.vue";

const cartStore = useCartStore();
const goodStore = useGoodStore();
const { goods } = storeToRefs(goodStore) as GoodStore;

const props = defineProps<{
  cartGood: CartGood;
}>();

const good: ComputedRef<Good | undefined> = computed(() => {
  return goods.value.find((good: Good) => good.id === props.cartGood.id);
});
</script>

<template>
  <div class="cart-item" v-if="good">
    <div class="cart-item__cell">{{ good.title }}</div>
    <div class="cart-item__cell">
      <CartItemQuantity :id="cartGood.id"></CartItemQuantity>
    </div>
    <div class="cart-item__cell">
      <span class="cart-item__price">{{ good.price }} руб.</span> / шт.
    </div>
    <div class="cart-item__cell">
      <button @click="cartStore.removeFromCart(cartGood)">Удалить</button>
    </div>
  </div>
</template>

<style>
.cart-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: calc(var(--default-spacing) * 2) 0;
  border-top: 1px solid var(--color-gray);
}

.cart-item__price {
  font-size: var(--big-font-size);
  font-weight: bold;
}
</style>
