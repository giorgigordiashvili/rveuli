import create from "zustand";

const store = (set) => ({
  keyboardStatus: false,
  setKeyboardStatus: (state) => {
    set(() => ({
      keyboardStatus: state,
    }));
  },
});
export const keyboardProvider = create(store);
