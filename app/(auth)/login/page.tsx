'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import LeftSidebar from '@/components/auth-onboarding/LeftSidebar';
import ProvidersButtons from '@/components/auth-onboarding/ProvidersButtons';
import RHFInput from '@/components/RHFInputs/RHFInput';
import ThemeLogo from '@/components/shared/ThemeLogo';
import { Form } from '@/components/ui/form';
import { SIGN_IN_SIDEBAR_DATA } from '@/constants';
import { type ILoginSchema, loginSchema } from '@/lib/validation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------

const LoginPage = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: ILoginSchema) => {
    const response = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (response?.ok) {
      router.push('/posts');
    } else {
      throw new Error('Error while logging in');
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="auth-onboarding-page-wrapper">
      <LeftSidebar
        title={SIGN_IN_SIDEBAR_DATA.title}
        listItems={SIGN_IN_SIDEBAR_DATA.listItems}
        isMounted={isMounted}
        theme={resolvedTheme}
      />
      <div className="auth-onboarding-right-sidebar ">
        <div className="md:hidden mb-14 mx-auto">
          <ThemeLogo isMounted={isMounted} theme={resolvedTheme} />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 max-w-md w-full"
          >
            <RHFInput
              name="email"
              label="Email"
              placeholder="Enter your email address"
            />
            <RHFInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <ProvidersButtons isLoginPage />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
