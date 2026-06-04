import CaptchaCopyrights from '@components/common/CaptchaCopyrights';
import RouteGuard from '@components/common/RouteGuard';
import MainLayout from '@components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register',
};

export default function Register() {
  return (
    <RouteGuard accessType='public'>
      <MainLayout containerClassName='container mx-auto flex flex-row items-center justify-center'>
        <Image
          className='hidden h-full object-cover p-10 lg:block lg:w-1/2'
          src='/images/register.svg'
          alt='login'
          width={300}
          height={300}
          priority
        />

        <div className='flex w-full flex-col items-center justify-center lg:w-1/2'>
          <Link href='/'>
            <Image
              className='h-[90px] w-[120px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105'
              src='/images/next.svg'
              alt='brand-logo'
              width={120}
              height={90}
              priority
            />
          </Link>

          <RegisterForm />

          <CaptchaCopyrights className='mt-4 w-full max-w-[400px]' />
        </div>
      </MainLayout>
    </RouteGuard>
  );
}
