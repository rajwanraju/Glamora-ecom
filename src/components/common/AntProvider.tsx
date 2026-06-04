'use client';

import '@ant-design/v5-patch-for-react-19';
import { RootState } from '@store/index';
import { AppType, setTheme } from '@store/slices/appSlice';
import { ConfigProvider, theme as andTheme } from 'antd';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AntProvider({ children }: { readonly children: React.ReactNode }) {
  const rootStyles = getComputedStyle(document.documentElement);
  const { theme }: AppType = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (theme === 'dark') {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? andTheme.darkAlgorithm : andTheme.defaultAlgorithm,
        token: {
          colorPrimary: rootStyles.getPropertyValue('--color-primary'),
          colorSuccess: rootStyles.getPropertyValue('--color-success'),
          colorError: rootStyles.getPropertyValue('--color-error'),
          colorWarning: rootStyles.getPropertyValue('--color-warning'),
          colorLink: rootStyles.getPropertyValue('--color-link'),
          colorLinkHover: rootStyles.getPropertyValue('--color-link-hover'),
          colorLinkActive: rootStyles.getPropertyValue('--color-bg-light'),
          fontFamily: rootStyles.getPropertyValue('--font-inter'),
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
