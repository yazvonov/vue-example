<script setup lang="ts">
import type GroupedGoods from "@/interfaces/GroupedGoods";
import GoodItem from "@/components/goods/GoodItem.vue";
import { ref, type Ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  goodGroup: GroupedGoods;
}>();

const opened: Ref<boolean> = ref(true);

function toggleOpened() {
  opened.value = !opened.value;
}
</script>

<template>
  <div class="good-group">
    <div class="good-group__title" @click="toggleOpened()">
      {{ opened ? "&#9650;" : "&#9660;" }} {{ goodGroup.groupTitle }}
    </div>
    <div
      class="good-group__items"
      v-show="opened"
      :class="{ 'good-group__items--odd': goodGroup.goods.length % 2 > 0 }"
    >
      <GoodItem v-for="good in goodGroup.goods" :key="good.id" :good="good" />
    </div>
  </div>
</template>

<style>
.good-group {
  margin: calc(var(--default-spacing) / 2) 0;
  border: 1px solid var(--color-gray);
  border-radius: 2px 2px 0 0;
}

.good-group__title {
  padding: 3px;
  background: var(--color-light-blue);
  font-weight: bold;
  cursor: pointer;
}

.good-group__items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;
  background-color: var(--color-gray);
  border-top: 1px solid var(--color-gray);
}

.good-group__items--odd {
  grid-template-columns: 1fr;
}
</style>
