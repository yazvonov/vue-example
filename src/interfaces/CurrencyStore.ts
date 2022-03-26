import type { Ref } from "vue";

export default interface CurrencyStore {
  dollar: Ref<number>;
  updateDollarCurrency: () => void;
}
