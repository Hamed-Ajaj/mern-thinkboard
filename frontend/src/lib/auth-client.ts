import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, useSession, signOut } = createAuthClient({
  baseURL: "https://mern-thinkboard-9qvy.onrender.com",
});
