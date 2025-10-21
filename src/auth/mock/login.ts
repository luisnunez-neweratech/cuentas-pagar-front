import type { AuthResponse } from "../interfaces/auth.response";

export const loginResponse: AuthResponse = {
  token: "testtoken1",
  user: {
    id: "1",
    email: "Luis.Nunez@NewEraTech.com",
    fullName: "Luis Nuñez",
    isActive: true,
    roles: ["admin"],
  },
};
