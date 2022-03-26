import type { ComputedRef } from "vue";
import type Good from "@/interfaces/Good";
import type GroupedGoods from "@/interfaces/GroupedGoods";

export default interface GoodStore {
  goods: ComputedRef<Good[]>;
  groupedGoods: ComputedRef<GroupedGoods[]>;
  getNames: () => void;
  getData: () => void;
}
