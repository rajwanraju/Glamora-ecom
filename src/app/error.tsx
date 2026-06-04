'use client';

import MainLayout from '@components/layout/MainLayout';
import { Button, Result } from 'antd';

export const metadata = {
  title: '500',
};

export default function ErrorHandler({
  error,
  reset,
}: {
  readonly error: Error;
  readonly reset: () => void;
}) {
  return (
    <MainLayout>
      <Result
        status='500'
        title='500'
        subTitle={
          error?.message
            ? `Error: ${error.message}!`
            : "Don't worry, Refresh the page to get back on track."
        }
        extra={
          <Button
            className='!rounded-default'
            onClick={() => reset()}
            type='primary'
            size='large'
          >
            Try Again
          </Button>
        }
      />
    </MainLayout>
  );
}
