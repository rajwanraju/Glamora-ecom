'use client';

import useMediaQuery from '@hooks/useMediaQuery';
import { Button, Result } from 'antd';
import { usePathname } from 'next/navigation';

interface ISharedErrorProps {
  readonly title?: string;
  readonly error?: string;
}

export default function SharedError({ title, error }: ISharedErrorProps) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const pathname = usePathname();

  return (
    <Result
      status='500'
      title={title ?? 'Error'}
      subTitle={error ?? 'Sorry! Something went wrong. Please reload and try again. Thanks'}
      extra={
        <Button
          className='!rounded-default'
          size={isDesktop ? 'large' : 'middle'}
          href={pathname}
          type='primary'
        >
          Reload
        </Button>
      }
    />
  );
}
