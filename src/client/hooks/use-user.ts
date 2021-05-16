import { useContext } from 'react';
import UserContext from '../contexts/user';

import type { UserContext as IUserContext } from '../contexts/user';

export default function useUser(): IUserContext {
  const userContext = useContext(UserContext);

  return userContext;
}
