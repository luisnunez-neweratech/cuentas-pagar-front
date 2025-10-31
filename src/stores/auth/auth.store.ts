import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { loginAction } from "../../auth/actions/login.action";
import type { User } from "../../interfaces/user.interface";
import type { AuthStatus } from "../../interfaces/auth-status.interface";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  //checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, mail, nickName, name, colaboratorId } = await loginAction(
        email,
        password
      );

      //mapper
      const user: User = {
        id: colaboratorId,
        email: mail,
        fullName: name,
        roles: ["Admin"], // TODO backend regrese los roles, por ahora todos son admin
        nickName,
      };

      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },

  /* checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  }, */

  logoutUser: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, { name: "auth-storage" })
);
