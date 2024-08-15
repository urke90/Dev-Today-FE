'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import LeftSidebar from '@/components/auth-onboarding/LeftSidebar';
import GithubIcon from '@/components/icons/Github';
import GoogleIcon from '@/components/icons/Google';
import RHFInput from '@/components/RHFInputs/RHFInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { SIGN_IN_SIDEBAR_DATA } from '@/constants';
import { type ILoginSchema, loginSchema } from '@/lib/validation';

// ----------------------------------------------------------------

const LoginPage = () => {
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
      router.push('/');
    } else {
      throw new Error('Error while logging in');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <LeftSidebar data={SIGN_IN_SIDEBAR_DATA} />
      <div className="flex flex-1  flex-col items-center bg-light200__dark900 px-4 max-md:flex-center shrink-0 my-12 md:my-36">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            <Button
              type="submit"
              className="w-full bg-primary-500 text-[14px] h-11 p2-bold "
            >
              Next
            </Button>
            <Link
              href="/register"
              className="text-white-300 block cursor-pointer text-center hover:underline"
            >
              Don&apos;t have an account yet?
              <span className="ml-1 text-[16px] text-primary-500">
                Join the community
              </span>
            </Link>
            <div className="flex items-center justify-between">
              <Separator className="w-2/5  bg-black-700/10 dark:bg-black-800" />
              <p className="p4-regular">or</p>
              <Separator className="w-2/5 bg-black-700/10 dark:bg-black-800" />
            </div>
            <Button
              type="button"
              variant="cancel"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="p3-medium gap-2.5"
            >
              <GoogleIcon className="dark:text-white-200 text-black-700" />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="cancel"
              onClick={() => signIn('github', { callbackUrl: '/home' })}
              className="p3-medium gap-2.5"
            >
              <GithubIcon className="dark:text-white-200 text-black-700" />
              Continue with Github
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
