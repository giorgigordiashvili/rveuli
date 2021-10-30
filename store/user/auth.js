import create from "zustand";
import { setTokenHeader } from "../../services/tokenHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = (set) => ({
  currentUser: {
    isAuthenticated: false,
    user: null,
    tabVisible: true,
  },
  setTabVisible: (visible) => {
    set((state) => {
      return {
        currentUser: {
          ...state.currentUser,
          tabVisible: !state.tabVisible,
        },
      };
    });
  },
  setCurrentUser: (isAuthenticated, user) => {
    set(() => ({
      currentUser: {
        isAuthenticated,
        user,
      },
    }));
  },
  setTextSize: (value) => {
    set((state) => {
      return {
        currentUser: {
          ...state.currentUser,
          user: { ...state.currentUser.user, text_size: value },
        },
      };
    });
  },
  setAforizmebiSize: (value) => {
    set((state) => {
      return {
        currentUser: {
          ...state.currentUser,
          user: { ...state.currentUser.user, aforizmebi_size: value },
        },
      };
    });
  },
  setEseebiSize: (value) => {
    set((state) => {
      return {
        currentUser: {
          ...state.currentUser,
          user: { ...state.currentUser.user, eseebi_size: value },
        },
      };
    });
  },
  setKeyboard: (value) => {
    set((state) => {
      return {
        currentUser: {
          ...state.currentUser,
          user: { ...state.currentUser.user, keyboard: value },
        },
      };
    });
  },

  setGasrialeba: () => {
    set((state) => {
      console.log(state);
      return {
        currentUser: {
          ...state.currentUser,
          user: {
            ...state.currentUser.user,
            gasrialeba: state.currentUser.user.gasrialeba ? 0 : 1,
          },
        },
      };
    });
  },
  logOut: () => {
    AsyncStorage.clear();
    setTokenHeader(false);
    set(() => ({
      currentUser: {
        isAuthenticated: false,
        user: null,
      },
    }));
  },
});

export const userProvider = create(store);
