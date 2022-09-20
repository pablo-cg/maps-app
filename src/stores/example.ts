import { defineStore } from "pinia";

interface State {
  counter: number;
}

export const useExampleStore = defineStore({
  id: "example",
  state: (): State => {
    return {
      counter: 0,
    };
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
