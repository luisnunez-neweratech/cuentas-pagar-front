import { type StateCreator, create } from "zustand";

export interface AuthLayoutState {
  isLoading: boolean;

  setIsLoading: (loading: boolean) => void;
}

const storeApi: StateCreator<AuthLayoutState> = (set) => ({
  isLoading: false,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
});

export const useAuthLayoutStore = create<AuthLayoutState>()(storeApi);
