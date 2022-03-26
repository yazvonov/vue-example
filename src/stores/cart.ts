import { computed, ref, type ComputedRef, type Ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import type Good from "@/interfaces/Good";
import type CartGood from "@/interfaces/CartGood";
import type GoodStore from "@/interfaces/GoodStore";
import { useGoodStore } from "@/stores/good";
import type CartStore from "@/interfaces/CartStore";

export const useCartStore = defineStore("cart", (): CartStore => {
  const cartGoods: Ref<CartGood[]> = ref([]);

  const summary: ComputedRef<number> = computed(() => {
    const goodStore = useGoodStore();
    const { goods } = <GoodStore>storeToRefs(goodStore);

    const summary: number = cartGoods.value.reduce(
      (acc: number, cartGood: CartGood) => {
        const good: Good | undefined = goods.value.find(
          (good: Good) => good.id === cartGood.id
        );

        if (good) {
          acc += cartGood.quantity * good.price;
        }

        return acc;
      },
      0
    );

    return Math.ceil(summary * 100) / 100;
  });

  const addToCart = (good: Good): void | undefined => {
    const cartGood: CartGood | undefined = cartGoods.value.find(
      (cartGood: CartGood) => cartGood.id === good.id
    );

    const newQty: number = cartGood ? cartGood.quantity + 1 : 1;

    if (newQty > good.availableQty) {
      throw "Данного товара нет в наличии в таком количестве";
    }

    if (cartGood) {
      cartGood.quantity = newQty;
    } else {
      cartGoods.value.push({
        id: good.id,
        quantity: newQty,
      });
    }
  };

  const removeFromCart = (cartGood: CartGood): void | undefined => {
    if (!cartGood) {
      return;
    }

    const index: number = cartGoods.value.findIndex(
      (cGood: CartGood) => cGood.id === cartGood.id
    );

    if (index > -1) {
      cartGoods.value.splice(index, 1);
    }
  };

  const updateInCart = (good: Good, quantity: number): void | undefined => {
    if (!good && !quantity) {
      return;
    }

    const cartGood: CartGood | undefined = cartGoods.value.find(
      (cartGood: CartGood) => cartGood.id === good.id
    );

    if (quantity > good.availableQty) {
      throw "Данного товара нет в наличии в таком количестве";
    }

    if (cartGood) {
      cartGood.quantity = quantity;
    }
  };

  return {
    cartGoods,
    summary,
    addToCart,
    removeFromCart,
    updateInCart,
  };
});
