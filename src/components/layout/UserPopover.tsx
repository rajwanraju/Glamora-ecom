'use client';

import { LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import useMediaQuery from '@hooks/useMediaQuery';
import { RootState } from '@store/index';
import { AuthType, setUserLogout } from '@store/slices/authSlice';
import cn from '@utils/cn';
import { truncateStringEnd } from '@utils/truncateString';
import { Avatar, Button, Divider, Popover } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function UserPopover({
  className = '',
}: {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) {
  const { userAuthData }: AuthType = useSelector((state: RootState) => state.auth);
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Popover
      placement='bottomRight'
      title={() => (
        <p className='font-poppins text-[18px] leading-[20px] font-semibold text-black capitalize'>
          {truncateStringEnd(
            `${userAuthData?.firstName ?? 'Unknown'} ${userAuthData?.lastName}`,
            20
          )}
        </p>
      )}
      content={
        <div className='flex w-[200px] flex-col items-start justify-start'>
          <Button
            className='!text-link hover:!text-link-hover font-inter font-medium'
            onClick={() => router.push(`/dashboard`)}
            size={isDesktop ? 'large' : 'middle'}
            icon={<PieChartOutlined />}
            type='link'
          >
            Dashboard
          </Button>
          <Divider className='!my-0' />

          <Button
            className='!text-link hover:!text-link-hover font-inter font-medium'
            onClick={() => {
              // logout the user
              dispatch(setUserLogout());

              // redirect to login
              router.push('/login');
            }}
            size={isDesktop ? 'large' : 'middle'}
            icon={<LogoutOutlined />}
            type='link'
          >
            Logout
          </Button>
        </div>
      }
    >
      <Avatar
        className={cn(
          '!border-gray cursor-pointer !rounded-full !border-[1px] !border-dashed',
          className
        )}
        src={
          userAuthData?.profilePicture ??
          `https://api.dicebear.com/7.x/miniavs/svg?seed=${Math.floor(Math.random() * 100) + 1}`
        }
        size={40}
      />
    </Popover>
  );
}
