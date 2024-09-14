import { USER_INFO_KEY } from '@app/constants/auth';
import { UserTypeResponse } from '@app/types/user';

export const saveUserToCache = (value: UserTypeResponse): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(value));
};

export const getUserFromCache = (): UserTypeResponse | null => {
  const user = localStorage.getItem(USER_INFO_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user) as UserTypeResponse;
  } catch {
    return null;
  }
};

export const removeUserFromCache = (): void => {
  localStorage.removeItem(USER_INFO_KEY);
};
