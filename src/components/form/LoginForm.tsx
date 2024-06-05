'use client';

import { authenticate } from '@/lib/auth/actions';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const onFinish = async (values: FormData) => {
    try {
      await authenticate(values);
    } catch (error) {
      setErrorMsg('Authentication failed');
    }
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete='off'
      onFinish={ onFinish }
    >
      <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please input your email!',  },
            // { type: 'email', message: 'Please enter a valid email format!' }
          ]}
        >
          <Input placeholder='example@example.com' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='password' />
        </Form.Item>

        <Form.Item<FieldType>
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
        {errorMsg && <p>{ errorMsg }</p>}

    </Form>
  )

}