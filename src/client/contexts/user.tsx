import React, { createContext, useState } from 'react';
import axios from 'axios';

import {
  getLocalStorageValue,
  Key,
  setLocalStorageValue,
} from '../utils/local-storage';

import type { Thruway } from '../../@types/thruway';

export type Props = {
  children: JSX.Element;
};

export interface UserContext {
  user: Thruway.User | null;
  login(email: string, password: string): Promise<void>;
  resumeSession(): Promise<void>;
}

const UserContext = createContext<UserContext>(null);

UserContext.displayName = 'UserContext';

export function UserContextProvider({ children }: Props): JSX.Element {
  const [user, setUser] = useState<Thruway.User | null>(null);

  const openSession = (user: Thruway.User) => {
    setUser(user);
    setLocalStorageValue(Key.User, user);
  };

  const closeSession = () => {
    setUser(null);
    setLocalStorageValue(Key.User, null);
  };

  const login = async (email: string, password: string): Promise<void> => {
    const loginResponse = await axios.post(
      'api/auth/login',
      {},
      {
        auth: {
          username: email,
          password,
        },
      },
    );

    if (loginResponse.status === 200) {
      const meResponse = await axios.get('api/v1/me');

      if (meResponse.status === 200) {
        const user = meResponse.data;

        openSession(user);

        return;
      }

      // TODO: Implement a dedicated error
      throw new Error('Failed to fetch user data');
    }

    // TODO: Implement a dedicated error
    throw new Error('Failed to authenticate');
  };

  const resumeSession = async (): Promise<void> => {
    const localUser = getLocalStorageValue(Key.User);

    if (localUser === null) {
      return;
    }

    const refreshTokenResponse = await axios.post('api/auth/refresh');

    if (refreshTokenResponse.status === 200) {
      const meResponse = await axios.get('api/v1/me');

      if (meResponse.status === 200) {
        const user = meResponse.data;

        openSession(user);

        return;
      }

      closeSession();

      return;
    }

    closeSession();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        resumeSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
