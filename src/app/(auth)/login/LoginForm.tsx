'use client';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import useGoogleCaptcha from '@hooks/useGoogleCaptcha';
import useNotification from '@hooks/useNotification';
import {
  setAccessToken,
  setIsLoggedUser,
  setIsRememberMe,
  setRefreshToken,
  setUserAuthData,
} from '@store/slices/authSlice';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { captchaToken, validToken } = useGoogleCaptcha();
  const dispatch = useDispatch();
  const router = useRouter();

  // function to handle form submission
  const onFinish = async (values: any) => {
    try {
      // check if captcha token is valid
      if (!captchaToken || !validToken) {
        throw new Error('Invalid captcha token!');
      }

      // call API to login
      /* const response = await ApiService.post('/auth/login', {
        email: values.email,
        password: values.password,
        token: captchaToken,
      }); */

      // show success notification
      openNotificationWithIcon('success', 'Success', 'You have been logged in successfully!');

      // save token and user data to Redux store
      dispatch(setIsLoggedUser(true));
      dispatch(setIsRememberMe(values.remember ?? false));
      dispatch(setAccessToken('test-access-token'));
      dispatch(setRefreshToken('test-refresh-token'));
      dispatch(
        setUserAuthData({
          id: 'test-user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          role: 'admin',
          profilePicture: `https://api.dicebear.com/7.x/miniavs/svg?seed=${Math.floor(Math.random() * 100) + 1}`,
          isActive: true,
          isEmailVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );

      // redirect to dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);

      // show error notification
      openNotificationWithIcon(
        'error',
        'Error',
        error?.response?.data?.message ??
          error?.message ??
          'Something went wrong! Failed to log in.'
      );
    }
  };

  return (
    <Form
      name='login'
      className='w-full max-w-[400px]'
      initialValues={{ remember: true }}
      layout='vertical'
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        label='Email Address'
        rules={[{ required: true, message: 'This is required — you’ll need to enter an email.' }]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder='Enter your email address'
          size='large'
        />
      </Form.Item>

      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true, message: 'This is required — you’ll need to enter a password.' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type='password'
          placeholder='Enter your password'
          size='large'
        />
      </Form.Item>

      <Form.Item>
        <Flex
          justify='space-between'
          align='center'
        >
          <Form.Item
            name='remember'
            valuePropName='checked'
            noStyle
          >
            <Checkbox className='font-medium'>Keep me logged in?</Checkbox>
          </Form.Item>
          <Link
            className='font-inter text-link hover:text-link-hover text-[14px] leading-[18px] font-semibold capitalize transition-colors duration-200 ease-in-out'
            href='/forgot-password'
          >
            Forgot password?
          </Link>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button
          className='!rounded-default'
          htmlType='submit'
          type='primary'
          size='large'
          block
        >
          Log In
        </Button>
      </Form.Item>

      <div className='flex flex-row items-center justify-center gap-x-2'>
        <p className='font-inter text-[14px] leading-[18px] font-medium'>Don't have an account?</p>
        <Link
          className='font-inter text-link hover:text-link-hover text-[14px] leading-[18px] font-semibold capitalize transition-colors duration-200 ease-in-out'
          href='/register'
        >
          Register now!
        </Link>
      </div>

      {contextHolder}
    </Form>
  );
}
