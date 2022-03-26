<script setup lang="ts">
import type GoodStore from "@/interfaces/GoodStore";
import type GroupedGoods from "@/interfaces/GroupedGoods";
import { computed, type ComputedRef } from "vue";
import { storeToRefs } from "pinia";
import { useGoodStore } from "@/stores/good";
import GoodGroup from "@/components/goods/GoodGroup.vue";
const goodStore = useGoodStore();
const { groupedGoods } = storeToRefs(goodStore) as GoodStore;

const groupedGoodsColumns: ComputedRef<[GroupedGoods[], GroupedGoods[]]> =
  computed(() => {
    return groupedGoods.value.reduce(
      (
        acc: [GroupedGoods[], GroupedGoods[]],
        groupedGoods: GroupedGoods,
        index: number
      ) => {
        acc[index & 1].push(groupedGoods);
        return acc;
      },
      [[], []]
    );
  });
</script>

<template>
  <div class="good-list">
    <div
      class="good-list__column"
      v-for="(groupedGoodsColumn, index) in groupedGoodsColumns"
      :key="index"
    >
      <GoodGroup
        v-for="group in groupedGoodsColumn"
        :key="group.groupId"
        :good-group="group"
      />
    </div>
  </div>
</template>

<style>
.good-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--default-spacing);
}

@media (min-width: 1024px) {
  .good-list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
