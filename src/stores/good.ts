import { ref, computed, type Ref, type ComputedRef } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useCurrencyStore } from "@/stores/currency";
import ApiService from "@/services/ApiService";
import type Good from "@/interfaces/Good";
import type GoodStore from "@/interfaces/GoodStore";
import type DataResponse from "@/interfaces/DataResponse";
import type GroupedGoods from "@/interfaces/GroupedGoods";
import type NamesResponse from "@/interfaces/NamesResponse";
import type CurrencyStore from "@/interfaces/CurrencyStore";

export const useGoodStore = defineStore("good", (): GoodStore => {
  const apiService: ApiService = new ApiService();
  const names: Ref<NamesResponse | undefined> = ref();
  const data: Ref<DataResponse | undefined> = ref();

  const goods: ComputedRef<Good[]> = computed(() => {
    if (!data.value || !names.value) {
      return [];
    }

    const currencyStore = useCurrencyStore();
    const { dollar } = storeToRefs(currencyStore) as CurrencyStore;

    try {
      return data.value?.Value.Goods.map((good) => {
        return <Good>{
          id: good.T,
          title: names.value ? names.value[good.G].B[good.T].N : "",
          groupId: good.G,
          groupTitle: names.value ? names.value[good.G].G : "",
          price: Math.ceil(good.C * dollar.value * 100) / 100,
          availableQty: good.P,
        };
      });
    } catch (e) {
      console.log("Parsing data error");
      return [];
    }
  });

  const groupedGoods: ComputedRef<GroupedGoods[]> = computed(() => {
    return goods.value.reduce((acc: GroupedGoods[], good: Good) => {
      const element: GroupedGoods | undefined = acc.find(
        (group: GroupedGoods) => {
          return group.groupId === good.groupId;
        }
      );

      if (element) {
        element.goods.push(good);
      } else {
        acc.push({
          groupId: good.groupId,
          groupTitle: good.groupTitle,
          goods: [good],
        });
      }

      return acc;
    }, []);
  });

  const getNames = () => {
    apiService
      .get("names.json")
      .then(async (response: Response) => {
        names.value = await response.json();
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const getData = () => {
    apiService
      .get("data.json")
      .then(async (response: Response) => {
        data.value = await response.json();
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  return {
    goods,
    groupedGoods,
    getNames,
    getData,
  };
});
