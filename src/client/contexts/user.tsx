import React, { createContext, useState } from 'react';
import axios from 'axios';

import type { Thruway } from '../../@types/thruway';

export type Props = {
  children: JSX.Element;
};

export interface UserContext {
  user: Thruway.User | null;
  login(email: string, password: string): Promise<void>;
}

const UserContext = createContext<UserContext>(null);

UserContext.displayName = 'UserContext';

export function UserContextProvider({ children }: Props): JSX.Element {
  const [user, setUser] = useState<Thruway.User | null>(null);

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
        const { firstName, lastName, email } = meResponse.data;

        setUser({
          firstName,
          lastName,
          email,
        });

        return;
      }

      // TODO: Implement a dedicated error
      throw new Error('Failed to fetch user data');
    }

    // TODO: Implement a dedicated error
    throw new Error('Failed to authenticate');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
