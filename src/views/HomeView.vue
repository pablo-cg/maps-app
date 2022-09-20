<script setup lang="ts">
import { useMapStore, usePlacesStore } from '@/stores';
import { computed, onMounted } from 'vue';
import MapView from '@/components/MapView.vue';
import LocationButton from '../components/LocationButton.vue';
import SearchBar from '../components/SearchBar.vue';

const places = usePlacesStore();
const mapStore = useMapStore();

const isLocationReady = computed(() => {
  return places.isUserLocationReady && mapStore.isMapReady;
});

function gotoDefaultLocation() {
  mapStore.map?.flyTo({
    center: places.userLocation,
    zoom: 14,
  });
}

onMounted(() => {
  if (!places.isUserLocationReady) {
    places.getInitialLocation();
  }
});
</script>

<template>
  <MapView />
  <SearchBar class="fixed top-7 left-7" />
  <LocationButton
    v-if="isLocationReady"
    class="fixed top-7 right-7"
    @click="gotoDefaultLocation"
  />
</template>
