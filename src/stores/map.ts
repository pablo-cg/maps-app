import type { Map, Marker } from 'mapbox-gl';
import { defineStore } from 'pinia';

interface MapState {
  map?: Map;
  markers: Marker[];
  distance?: number;
  duration?: number;
}

export const useMapStore = defineStore({
  id: 'map',
  state: (): MapState => {
    return {
      map: undefined,
      markers: [],
      distance: undefined,
      duration: undefined,
    };
  },
  getters: {
    isMapReady: (state) => !!state.map,
  },
  actions: {},
});
