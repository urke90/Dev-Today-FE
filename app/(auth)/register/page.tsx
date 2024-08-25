'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import LeftSidebar from '@/components/auth-onboarding/LeftSidebar';
import ProvidersButtons from '@/components/auth-onboarding/ProvidersButtons';
import RHFInput from '@/components/RHFInputs/RHFInput';
import ThemeLogo from '@/components/shared/ThemeLogo';
import { Form } from '@/components/ui/form';
import { SIGN_UP_SIDEBAR_DATA } from '@/constants';
import { type IRegisterSchema, registerSchema } from '@/lib/validation';

// ----------------------------------------------------------------

const BASE_API_URL = process.env.NEXT_API_BASE_URL ?? '';

const RegisterPage = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const form = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: IRegisterSchema) => {
    try {
      const registerResponse = await fetch(BASE_API_URL + '/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: data.userName,
          email: data.email,
          password: data.password,
        }),
      });

      if (!registerResponse.ok) {
        if (registerResponse.status === 409) {
          return toast.error('User with provided email already exists');
        }
        return toast.error("Something went wrong. Couldn't create new user.");
      }

      const signInResponse = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResponse?.ok) {
        toast.success('You have registered successfully');
        router.push('/onboarding');
      } else {
        toast.error('Internal server error');
      }
    } catch (error) {
      console.error('Error creating new user', error);
      toast.error("Something went wrong. Couldn't register new user");
    }
  };

  return (
    <div className="auth-onboarding-page-wrapper">
      <LeftSidebar
        title={SIGN_UP_SIDEBAR_DATA.title}
        listItems={SIGN_UP_SIDEBAR_DATA.listItems}
        isMounted={isMounted}
        theme={resolvedTheme}
      />
      <div className="auth-onboarding-right-sidebar">
        <div className="mx-auto mb-14 md:hidden">
          <ThemeLogo isMounted={isMounted} theme={resolvedTheme} />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-5"
          >
            <RHFInput
              name="userName"
              label="Full Name"
              placeholder="Full Name"
            />
            <RHFInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
            />
            <RHFInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <ProvidersButtons />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
