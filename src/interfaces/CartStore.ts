import type { ComputedRef, Ref } from "vue";
import type CartGood from "@/interfaces/CartGood";
import type Good from "@/interfaces/Good";

export default interface CartStore {
  cartGoods: Ref<CartGood[]>;
  summary: ComputedRef<number>;
  addToCart: (good: Good) => void | undefined;
  removeFromCart: (cartGood: CartGood) => void | undefined;
  updateInCart: (good: Good, quantity: number) => void | undefined;
}
