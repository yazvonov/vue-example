<script setup lang="ts">
import type Good from "@/interfaces/Good";
import { type Ref, ref, watch } from "vue";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const props = defineProps<{
  good: Good;
}>();

let goodItemClass: Ref<string | null> = ref(null);

watch(
  () => props.good.price,
  (newPrice, oldPrice) => {
    if (newPrice > oldPrice) {
      goodItemClass.value = "good-item--price-increase";
    } else if (newPrice < oldPrice) {
      goodItemClass.value = "good-item--price-decreased";
    } else {
      goodItemClass.value = null;
    }
  }
);

function addToCart(good: Good) {
  try {
    cartStore.addToCart(good);
  } catch (e) {
    alert(e);
  }
}
</script>

<template>
  <div class="good-item" :class="goodItemClass">
    <div class="good-item__title">
      {{ good.title }} ({{ good.availableQty }})
      <button @click="addToCart(good)">+</button>
    </div>
    <div class="good-item__price">
      {{ good.price }}
    </div>
  </div>
</template>

<style>
.good-item {
  display: grid;
  grid-template-columns: 1fr 80px;
  background: var(--color-light-gray);
}

.good-item--price-increase {
  background: var(--color-red);
}

.good-item--price-decreased {
  background: var(--color-green);
}

.good-item__title {
  padding: calc(var(--default-spacing) / 2) var(--default-spacing);
  background: var(--color-white);
}

.good-item__price {
  font-size: var(--big-font-size);
  font-weight: bold;
  text-align: center;
  align-self: center;
}
</style>
