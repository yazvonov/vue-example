import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import CurrencyService from "@/services/CurrencyService";
import type CurrencyStore from "@/interfaces/CurrencyStore";

export const useCurrencyStore = defineStore("currency", (): CurrencyStore => {
  const currencyService: CurrencyService = new CurrencyService();
  const dollar: Ref<number> = ref(currencyService.getDollarCurrency());

  const updateDollarCurrency = (): void => {
    dollar.value = currencyService.getDollarCurrency();
  };

  return {
    dollar,
    updateDollarCurrency,
  };
});
