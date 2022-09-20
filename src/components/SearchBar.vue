<script lang="ts" setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { usePlacesStore } from '@/stores';
import SearchResults from './SearchResults.vue';

const places = usePlacesStore();

const searchInput = ref('');

const getPlaces = useDebounceFn(async () => {
  await places.getPlacesByText(searchInput.value);
}, 1000);
</script>

<template>
  <main
    class="p-1 w-72 rounded overflow-hidden bg-zinc-50 z-[999999] shadow-lg shadow-zinc-400/90"
  >
    <input
      class="block w-full px-3 py-1 text-zinc-700 bg-clip-padding border border-zinc-400 rounded transition-all duration-150 ease-in-out focus:border-blue-300 focus:outline-0 focus:shadow-lg focus:shadow-blue-300/25"
      type="text"
      placeholder="Buscar Lugares..."
      v-model="searchInput"
      @input="getPlaces"
    />
    <SearchResults />
  </main>
</template>
