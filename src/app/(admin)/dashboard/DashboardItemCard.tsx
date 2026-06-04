'use client';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import cn from '@utils/cn';
import { Avatar, Card } from 'antd';
import Image from 'next/image';

const { Meta } = Card;

interface IDashboardItemCardProps {
  title: string;
  description: string;
  imageURL: string;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function DashboardItemCard({
  title,
  description,
  imageURL,
  className = '',
}: IDashboardItemCardProps) {
  return (
    <Card
      className={cn('w-full', className)}
      cover={
        <Image
          className='h-auto w-full'
          alt='example'
          src={imageURL}
          width={300}
          height={300}
          priority
        />
      }
      actions={[
        <SettingOutlined key='setting' />,
        <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' />,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            className='!border-gray !rounded-full !border-[1px] !border-dashed'
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${Math.floor(Math.random() * 100) + 1}`}
            size={35}
          />
        }
        title={title}
        description={description}
      />
    </Card>
  );
}
