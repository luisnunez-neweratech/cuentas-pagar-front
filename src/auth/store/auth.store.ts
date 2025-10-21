import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import type { User } from "../../interfaces/user.interface";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  loading: boolean;

  // getters
  //isAdmin: () => boolean,

  // actions
  login: (email: string, password: string) => Promise<boolean>;
  //logout: () => void,
  checkAuthStatus: () => Promise<boolean>;
  setLoading: (state: boolean) => void;
};

export const useAuthStore = create<AuthState>()((set, _get) => ({
  //implementacion
  user: null,
  token: null,
  authStatus: "checking",
  loading: false,

  //getters
  /* isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },
 */
  //actions
  login: async (email: string, password: string) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
  /*
    logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },
*/
  checkAuthStatus: async () => {
    /* try {
            const { user, token } = await checkAuthAction()
            set({
                user: user,
                token: token,
                authStatus: 'authenticated'
            })
            return true
        } catch (error) {
            console.log(error)
            set({ user: undefined, token: undefined, authStatus: 'not-authenticated' })
            return false
        } */
    set({ authStatus: "not-authenticated" });
    return false;
  },
  setLoading: (state: boolean) => {
    set({ loading: state });
  },
}));
