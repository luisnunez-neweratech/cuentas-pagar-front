import { type StateCreator, create } from "zustand";

export interface DashboardLayoutState {
  isLoading: boolean;

  setIsLoading: (loading: boolean) => void;
}

const storeApi: StateCreator<DashboardLayoutState> = (set) => ({
  isLoading: false,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
});

export const useDashboardLayoutStore = create<DashboardLayoutState>()(storeApi);
