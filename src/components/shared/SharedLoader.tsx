'use client';

import { LoadingOutlined } from '@ant-design/icons';
import cn from '@utils/cn';
import { Spin } from 'antd';

interface ISharedLoaderProps {
  readonly className?: string;
  readonly size?: number;
  readonly color?: string;
}

export default function SharedLoader({ className = '', size, color }: ISharedLoaderProps) {
  const rootStyles = getComputedStyle(document.documentElement);

  return (
    <div
      className={cn(
        'flex h-[20vh] w-full flex-col items-center justify-center lg:h-[30vh]',
        className
      )}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: size ?? 50,
              color: color ?? rootStyles.getPropertyValue('--color-primary'),
            }}
            spin
          />
        }
      />
    </div>
  );
}
