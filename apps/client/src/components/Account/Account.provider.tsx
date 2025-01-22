import { LayoutProps } from '@/components/Layout';
import { useNotification } from '@/components/Notification';
import { useStorageStore } from '@/lib/store';
import { AxiosRequestConfig, isAxiosError, isCancel } from 'axios';
import { useCallback, useEffect } from 'react';
import { AccountContext } from './Account.context.ts';
import * as query from './Account.queries.ts';
import { AccountContextType } from './Account.types';

export const AccountProvider = ({ children }: LayoutProps) => {
  const { setNotification } = useNotification();

  const { token, setToken, accountDetails, setAccountDetails } =
    useStorageStore();

  const onErrorRaiseNotification = useCallback(
    (error: unknown) => {
      if (isCancel(error)) {
        return;
      } else if (isAxiosError(error)) {
        setNotification({
          message: error.message,
          severity: 'error',
        });
      } else {
        console.error('An unknown error occurred:', error);
        setNotification({
          message: 'An unknown error occurred',
          severity: 'error',
        });
      }
    },
    [setNotification],
  );

  const login = async (
    provider: 'guest' | 'google',
    config: AxiosRequestConfig = {},
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => {
    try {
      const response = await query.login(provider, config);
      setToken(response.data);
      query
        .me(config)
        .then((response) => setAccountDetails(response.data))
        .catch((error) => {
          if (error.name === 'AbortError') {
            return;
          }
          setAccountDetails(null);
        });
      if (onSuccess) return onSuccess();
    } catch (error: unknown) {
      console.error('Login failed:', error);
      onErrorRaiseNotification(error);
      if (onError) return onError(error);
    }
  };

  const logout = async (
    config: AxiosRequestConfig = {},
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => {
    try {
      await login('guest', config);
      setNotification({
        message: 'You have been logged out',
        severity: 'info',
      });
      if (onSuccess) return onSuccess();
    } catch (error: unknown) {
      onErrorRaiseNotification(error);
      setAccountDetails(null);
      if (onError) return onError(error);
    }
  };

  useEffect(() => {
    if (accountDetails !== null) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    query
      .me({ signal })
      .then((response) => setAccountDetails(response.data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }
        onErrorRaiseNotification(error);
        setAccountDetails(null);
      });
    return () => {
      controller.abort();
    };
  }, [
    accountDetails,
    onErrorRaiseNotification,
    setAccountDetails,
    setNotification,
  ]);

  const contextValue: AccountContextType = {
    accountDetails,
    token,
    login,
    logout,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
