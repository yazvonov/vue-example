<script setup lang="ts">
import type GoodStore from "@/interfaces/GoodStore";
import type CartGood from "@/interfaces/CartGood";
import type Good from "@/interfaces/Good";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useGoodStore } from "@/stores/good";
import { useCartStore } from "@/stores/cart";
import { computed, type ComputedRef } from "vue";
import type CartStore from "@/interfaces/CartStore";

const cartStore = useCartStore();
const goodStore = useGoodStore();
const { goods } = storeToRefs(goodStore) as GoodStore;
const { cartGoods } = storeToRefs(cartStore) as CartStore;
const quantityInput = ref();

const props = defineProps<{
  id: number;
}>();

const good: ComputedRef<Good | undefined> = computed(() => {
  return goods.value.find((good: Good) => good.id === props.id);
});

const cartGood: ComputedRef<CartGood | undefined> = computed(() => {
  return cartGoods.value.find((cartGood: CartGood) => cartGood.id === props.id);
});

function updateInCart($event: Event) {
  const quantity: number = +($event.target as HTMLInputElement).value;

  if (!good.value) return;
  if (quantity <= 0 || isNaN(quantity)) return returnOldValue();

  try {
    cartStore.updateInCart(good.value, quantity);
  } catch (e) {
    returnOldValue();
    alert(e);
  }

  function returnOldValue() {
    quantityInput.value.value = cartGood.value?.quantity;
  }
}
</script>

<template>
  <input
    v-if="cartGood"
    ref="quantityInput"
    class="cart-item-quantity"
    :value="cartGood.quantity"
    @change="updateInCart($event)"
  />
  шт.
</template>

<style>
.cart-item-quantity {
  width: 40px;
}
</style>
