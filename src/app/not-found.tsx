import MainLayout from '@components/layout/MainLayout';
import { Button, Result } from 'antd';
import Link from 'next/link';

export const metadata = {
  title: '404',
};

export default function NotFound() {
  return (
    <MainLayout containerClassName='container mx-auto flex flex-row items-center justify-center'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Link href='/'>
            <Button
              className='!rounded-default'
              type='primary'
              size='large'
            >
              Back to Home
            </Button>
          </Link>
        }
      />
    </MainLayout>
  );
}
