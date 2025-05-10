import { create } from "zustand";

export const useApStore = create((set) => ({
  selectedAp: "grid",
  setSelectedAp: (newAp) => set({ selectedAp: newAp }),
}));

export const useCursorStore = create((set) => ({
  cursorVariant: "default",
  setCursorVariant: (variant) => set({ cursorVariant: variant }),

  handleMouseEnter: (variant) =>
    set((state) => {
      if (!state.isClicked) return { cursorVariant: variant };
      return {};
    }),

  handleMouseLeave: () => set({ cursorVariant: "default" }),

  isClicked: false,
  handleClick: (variant = "default") =>
    set((state) => {
      if (!state.isClicked) {
        setTimeout(() => set({ isClicked: false }), 500);
        return { cursorVariant: variant, isClicked: true };
      }
      return {};
    }),
}));

export const usePlayingVideoStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (status) => set({ isPlaying: status }),
}));
