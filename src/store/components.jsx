import { create } from "zustand";

export const useComponentStore = create((set) => ({
  components: [],
  addNewComponent: (component) =>
    set((state) => ({ components: [...state.components, component] })),
  setComponents: (components) => set(() => ({ components: components })),
  removeAllComponents: () => set({ components: [] }),
}));
