'use client';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import useGoogleCaptcha from '@hooks/useGoogleCaptcha';
import useNotification from '@hooks/useNotification';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { captchaToken, validToken } = useGoogleCaptcha();
  const router = useRouter();
  const [form] = Form.useForm();

  // function to handle form submission
  const onFinish = () => {
    try {
      // check if captcha token is valid
      if (!captchaToken || !validToken) {
        throw new Error('Invalid captcha token!');
      }

      // show info notification
      openNotificationWithIcon(
        'info',
        'Info',
        'This feature is currently in development and will be available soon.'
      );

      // reset form and redirect to login
      form.resetFields();
      router.push('/login');
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
      form={form}
      name='register'
      className='w-full max-w-[400px]'
      layout='vertical'
      onFinish={onFinish}
    >
      <Form.Item
        name='first_name'
        label='First Name'
        rules={[
          { required: true, message: 'This is required — you’ll need to enter a first name.' },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder='Enter your first name'
          size='large'
        />
      </Form.Item>

      <Form.Item
        name='last_name'
        label='Last Name'
        rules={[
          { required: true, message: 'This is required — you’ll need to enter a last name.' },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder='Enter your last name'
          size='large'
        />
      </Form.Item>

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
        <Button
          className='!rounded-default mt-2'
          htmlType='submit'
          type='primary'
          size='large'
          block
        >
          Register
        </Button>
      </Form.Item>

      <div className='flex flex-row items-center justify-center gap-x-2'>
        <p className='font-inter text-[14px] leading-[18px] font-medium'>
          Already have an account?
        </p>
        <Link
          className='font-inter text-link hover:text-link-hover text-[14px] leading-[18px] font-semibold capitalize transition-colors duration-200 ease-in-out'
          href='/login'
        >
          Login now!
        </Link>
      </div>

      {contextHolder}
    </Form>
  );
}
