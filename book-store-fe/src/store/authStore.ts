import { create } from "zustand";

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: getToken() ? true : false,
  storeLogin: (token: string) => {
    set({ isLoggedIn: true });
    setToken(token);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
  },
}));
