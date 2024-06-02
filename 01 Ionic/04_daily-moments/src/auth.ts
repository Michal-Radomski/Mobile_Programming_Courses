import React from "react";
import { onAuthStateChanged } from "@firebase/auth";

import { auth as firebaseAuth } from "./firebase";

export interface Auth {
  loggedIn: boolean;
  userId?: string;
}

interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
  return React.useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = React.useState<AuthInit>({ loading: true });
  React.useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      const auth = firebaseUser ? { loggedIn: true, userId: firebaseUser.uid } : { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);

  return authInit;
}
