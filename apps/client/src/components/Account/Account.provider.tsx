import axios, { AxiosRequestConfig, isAxiosError, isCancel } from 'axios';
import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useState } from 'react';
import { LayoutProps } from '../Layout';
import { useNotification } from '../Notification';
import { AccountContext } from './Account.context.ts';
import * as query from './Account.queries.ts';
import { AccountContextType, AccountDetails } from './Account.types';

export const AccountProvider = ({ children }: LayoutProps) => {
  const { setNotification } = useNotification();
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null,
  );

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
      setAccountDetails(response.data);
      if (onSuccess) return onSuccess();
    } catch (error: unknown) {
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
      await axios.get('/api/auth/logout', config);
      await login('guest', config);
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
      .then((response) => {
        if (isEqual(response.data, accountDetails)) {
          return;
        }
        setAccountDetails(response.data);
      })
      .catch(onErrorRaiseNotification);

    return () => {
      controller.abort();
    };
  }, [setNotification, accountDetails, onErrorRaiseNotification]);

  const contextValue: AccountContextType = {
    accountDetails,
    login,
    logout,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
