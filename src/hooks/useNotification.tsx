'use client';

import { notification } from 'antd';
import React from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface UseNotificationReturn {
  contextHolder: React.ReactElement;
  openNotificationWithIcon: (type: NotificationType, title: string, description: string) => void;
}

export default function useNotification(): UseNotificationReturn {
  const [api, contextHolder] = notification.useNotification();

  /**
   * Display a notification with an icon.
   *
   * @param {NotificationType} type - The type of notification ('success', 'info', 'warning', or 'error').
   */
  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    description: string
  ): void => {
    api[type]({
      message: title,
      description,
    });
  };

  return { contextHolder, openNotificationWithIcon };
}
