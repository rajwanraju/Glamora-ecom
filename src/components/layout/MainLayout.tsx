'use client';

import cn from '@utils/cn';
import { FloatButton, Layout } from 'antd';
import MyFooter from './MyFooter';
import Navbar from './Navbar';

const { Content, Header } = Layout;

interface IMainLayoutProps {
  readonly children: React.ReactNode;
  readonly containerClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function MainLayout({ children, containerClassName = '' }: IMainLayoutProps) {
  return (
    <Layout className='!bg-background min-h-screen'>
      {/* Set Header background to transparent and height auto to support Glamora double-row Navbar */}
      <Header className='sticky top-0 z-[100] !bg-white !p-0 !h-auto shadow-sm'>
        <Navbar />
      </Header>

      <Content
        className={cn(
          'w-full min-h-[calc(100vh-300px)]',
          containerClassName
        )}
      >
        {children}
      </Content>

      <MyFooter className='!bg-slate-950' />

      <FloatButton.BackTop className='!rounded-full' />
    </Layout>
  );
}
