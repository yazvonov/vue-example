<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";
import CartItem from "@/components/cart/CartItem.vue";
import CartSummary from "@/components/cart/CartSummary.vue";
import type CartStore from "@/interfaces/CartStore";
const cartStore = useCartStore();
const { cartGoods } = storeToRefs(cartStore) as CartStore;
</script>

<template>
  <div class="cart-view">
    <span class="cart-view__title">Корзина</span>
    <div class="cart-view__header">
      <div class="cart-view_header-item">Наименование товара и описание</div>
      <div class="cart-view_header-item">Количество</div>
      <div class="cart-view_header-item">Цена</div>
      <div class="cart-view_header-item"></div>
    </div>
    <template v-if="cartGoods.length">
      <CartItem
        v-for="cartGood in cartGoods"
        :key="cartGood.id"
        :cart-good="cartGood"
      />
      <div class="cart-view__footer">
        <CartSummary />
      </div>
    </template>
    <div class="cart-view__empty" v-else>Корзина пуста</div>
  </div>
</template>

<style>
.cart-view {
  margin-top: calc(var(--default-spacing) * 2);
}

.cart-view__title {
  font-weight: bold;
}

.cart-view__header {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: calc(var(--default-spacing) * 2);
  padding: var(--default-spacing) 0;
}

.cart-view_header-item {
  font-weight: bold;
}

.cart-view__empty {
  grid-template-columns: repeat(4, 1fr);
  padding: calc(var(--default-spacing) * 2) 0;
  border-top: 1px solid var(--color-gray);
}
</style>
