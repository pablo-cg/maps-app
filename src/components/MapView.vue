<script setup lang="ts">
import { useMapStore, usePlacesStore } from '@/stores';
import { Map, Marker, Popup } from 'mapbox-gl';
import { nextTick, onMounted, ref, watch } from 'vue';

const places = usePlacesStore();
const mapStore = useMapStore();

const mapRef = ref<HTMLDivElement>();

async function initMap() {
  nextTick(() => {
    if (!mapRef.value) return;
    if (!places.userLocation) return;

    mapStore.map = new Map({
      container: mapRef.value, // container ID
      style: 'mapbox://styles/mapbox/dark-v10', // style URL
      center: places.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const locationPopUp = new Popup()
      .setLngLat(places.userLocation)
      .setHTML(`<p>AQUI</p>`);

    const locationMarker = new Marker()
      .setLngLat(places.userLocation)
      .setPopup(locationPopUp)
      .addTo(mapStore.map);
  });
}

onMounted(() => {
  if (places.isUserLocationReady) {
    return initMap();
  }
});

watch(places, () => {
  if (places.isUserLocationReady) {
    return initMap();
  }
});
</script>

<template>
  <main
    v-if="!places.isUserLocationReady"
    class="fixed w-full h-full bg-black/80 z-[999999] top-0 left-0 flex flex-col justify-center items-center"
  >
    <div class="text-center text-white">
      <h3 class="text-3xl">Espere por Favor</h3>
      <span>Localizando...</span>
    </div>
  </main>
  <main
    v-show="places.isUserLocationReady"
    class="fixed w-screen h-screen"
    ref="mapRef"
  />
</template>
