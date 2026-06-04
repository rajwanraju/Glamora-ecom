'use client';

import { RootState } from '@store/index';
import { AuthType } from '@store/slices/authSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface IRouteGuardProps {
  readonly accessType: 'private' | 'public';
  readonly children: React.ReactNode;
}

export default function RouteGuard({ accessType, children }: IRouteGuardProps) {
  const { isLoggedUser }: AuthType = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  /**
   * Redirects user based on authentication status and access type:
   * - If user is logged in and access type is 'public': redirect to dashboard
   * - If user is not logged in and access type is 'private': redirect to login
   */
  useEffect(() => {
    if (isLoggedUser && accessType === 'public') {
      router.replace('/dashboard');
    } else if (!isLoggedUser && accessType === 'private') {
      router.replace('/login');
    }
  }, [isLoggedUser, accessType, router]);

  return <>{children}</>;
}
