import { ReactNode, createContext, useEffect, useState } from 'react';
import { readToken, readUser, removeAuth, saveAuth } from '../lib/read.ts';

export type User = {
  userId: number;
  emailAddress: string;
};

export type UserContextValues = {
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (user: User, token: string) => void;
  handleSignOut: () => void;
  handleGuest: () => void;
};

export const UserContext = createContext<UserContextValues>({
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
  handleGuest: () => undefined,
});

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const user = readUser();
    setUser(user);
    const token = readToken();
    setToken(token);
  }, []);

  function handleSignIn(user: User, token: string) {
    setUser(user);
    setToken(token);
    saveAuth(user, token);
  }

  function handleSignOut() {
    setUser(undefined);
    setToken(undefined);
    removeAuth();
  }

  async function handleGuest() {
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('/api/auth/guest-login', req);
      if (!response.ok) {
        throw new Error(`failed to log in as guest`);
      }
      const user = await response.json();
      localStorage.setItem('token', user.token);
      handleSignIn(user.user, user.token);
    } catch (err) {
      throw new Error(`Error registering user: ${err}`);
    }
  }

  const contextValue = {
    user,
    token,
    handleSignIn,
    handleSignOut,
    handleGuest,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
