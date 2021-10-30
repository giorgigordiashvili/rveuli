import create from "zustand";

const store = (set) => ({
  error: null,
  addError: (message) => {
    set(() => ({
      error: message,
    }));
  },
  removeError: () => {
    set(() => ({
      error: null,
    }));
  },
});
export const userProvider = create(store);
