<script setup lang="ts">
import { usePlacesStore } from '@/stores';
import { ref } from 'vue';
import LoadingIcon from './LoadingIcon.vue';

const placesStore = usePlacesStore();

const isActive = ref(false);
</script>

<template>
  <section
    v-if="placesStore.isPlacesLoading"
    class="flex items-center justify-evenly py-3"
  >
    <h5>Cargando</h5>
    <LoadingIcon />
  </section>
  <ul
    v-else-if="placesStore.places.length"
    class="mt-3 flex flex-col mb-0 pl-0 border border-zinc-300 first:rounded-tl first:rounded-tr last:mb-0 last:rounded-br last:rounded-bl first:border-none last:border-none"
  >
    <li
      v-for="place in placesStore.places"
      :key="place.id"
      class="cursor-pointer block py-3 px-5 -mb-[1px] border border-zinc-300 hover:bg-zinc-100"
      :class="isActive ? 'text-white bg-blue-500 border-blue-300' : ''"
    >
      <h5 class="text-base">{{ place.text }}</h5>
      <p class="text-xs">
        {{ place.place_name }}
      </p>
      <section class="flex flex-row-reverse">
        <button
          class="inline-block text-center whitespace-nowrap border py-1 px-2 text-sm rounded transition-all ease-in-out duration-150 text-blue-500 border-blue-500 bg-transparent hover:text-white hover:bg-blue-500 active:text-white active:bg-blue-500"
        >
          Direcciones
        </button>
      </section>
    </li>
  </ul>
</template>
