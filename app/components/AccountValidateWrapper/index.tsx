'use client';
import {
  WebLoginState,
  WebLoginEvents,
  useWebLoginEvent,
  useLoginState,
  usePortkeyLock,
  ERR_CODE,
} from 'aelf-web-login';
import { useAppContext } from '../../hooks/useAppContext';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';

import styles from './AccountValidateWrapper.module.scss';
import { useEffect, useRef } from 'react';
import { useAccountOwner } from '@/hooks/useAccountOwner';
import { CHAIN_ID } from '@/constants/network';
import { useResetAccountState } from '@/hooks/useResetAccountState';

interface AccountValidateWrapperProps {
  children: React.ReactNode;
}

const AccountValidateWrapper = ({ children }: AccountValidateWrapperProps) => {
  const isFirstTimeMounting = useRef(true);
  const { isUnlocking } = usePortkeyLock();
  const { t } = useTranslation();
  const { loadingService } = useAppContext();
  const { mutate: getAccountOwner } = useAccountOwner(CHAIN_ID);
  const { resetAccountState } = useResetAccountState();

  // logout loader
  useLoginState((state) => {
    if (state === WebLoginState.logouting) {
      loadingService.send('LOADING');
    }
    if (state === WebLoginState.initial) {
      loadingService.send('IDLE');
    }
  });

  //@ts-ignore
  useWebLoginEvent(WebLoginEvents.DISCOVER_DISCONNECTED, async (e) => {
    await resetAccountState();

    switch (e?.code) {
      case 4001: {
        message.open({
          content: t('disconnected.message'),
          duration: 5,
          className: styles.message,
        });
        break;
      }
    }
  });

  //@ts-ignore
  useWebLoginEvent(WebLoginEvents.LOGOUT, async (e) => {
    await resetAccountState();
  });

  //@ts-ignore
  useWebLoginEvent(WebLoginEvents.LOGINED, async (e) => {
    await getAccountOwner();
  });

  useWebLoginEvent(WebLoginEvents.LOGIN_ERROR, (e) => {
    switch (e?.code) {
      case ERR_CODE.NETWORK_TYPE_NOT_MATCH: {
        message.open({
          content: t('login.network.error'),
          duration: 5,
          className: styles.message,
        });
        break;
      }
      case 4001:
      case ERR_CODE.DISCOVER_LOGIN_EAGERLY_FAIL: {
        message.open({
          content: t('modal.cancel.error'),
          duration: 5,
          className: styles.message,
        });
        break;
      }
      case ERR_CODE.ACCOUNTS_IS_EMPTY: {
        message.open({
          content: t('account.sync.info'),
          duration: 5,
          className: styles.message,
        });
        break;
      }
    }
  });

  useEffect(() => {
    if (isFirstTimeMounting.current) {
      if (isUnlocking) {
        loadingService.send('LOADING');
      } else {
        loadingService.send('IDLE');
      }
      isFirstTimeMounting.current = false;
    }
  }, [isUnlocking]);

  return <>{children}</>;
};

export default AccountValidateWrapper;
