import { searchApi } from '@/api';
import type { Feature, PlacesResponse } from '@/interfaces';
import { defineStore } from 'pinia';

interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; // lng, lat
  places: Feature[];
  isPlacesLoading: boolean;
}

export const usePlacesStore = defineStore({
  id: 'places',
  state: (): PlacesState => {
    return {
      isLoading: true,
      userLocation: undefined,
      places: [],
      isPlacesLoading: false,
    };
  },
  getters: {
    isUserLocationReady: (state) => !!state.userLocation,
  },
  actions: {
    getInitialLocation() {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          this.isLoading = false;
        },
        (err) => {
          console.error(err);
          throw new Error('No Geolocation, 😢');
        }
      );
    },

    async getPlacesByText(query: string): Promise<Feature[]> {
      this.isPlacesLoading = true;

      if (!query.length) {
        this.places = [];
        this.isPlacesLoading = false;
        return [];
      }

      if (!this.userLocation) {
        throw new Error('No hay Ubicación');
      }

      const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(','),
        },
      });

      this.places = data.features;

      this.isPlacesLoading = false;

      return data.features;
    },
  },
});
