'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SIGN_IN_SIDEBAR_DATA } from '@/constants';
import { loginSchema } from '@/lib/validation';
import { colorsLogIn } from '@/styles/index';
import { useTheme } from 'next-themes';

const Login = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  console.log('theme', theme);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      router.push('/');
    } else {
      throw new Error('Error while logging in');
    }
  }

  return (
    <div className="flex min-h-screen bg-white-100 dark:bg-black-800">
      <div className="hidden flex-col items-center p-16 lg:flex lg:w-1/2">
        <div className="w-full">
          <Image
            src={`${
              theme === 'dark'
                ? '/assets/icons/logo-dark.svg'
                : 'assets/icons/logo-light.svg'
            }`}
            alt="logo"
            width={147}
            height={30}
            className="mb-24"
          />
        </div>
        <div className="max-w-md">
          <h2 className="d1-bold mb-10">Sign in to DevToday.</h2>
          <article className="flex flex-col gap-5">
            {SIGN_IN_SIDEBAR_DATA.listItems.map((item, index) => (
              <div
                key={index + 1}
                className="flex items-center gap-5 rounded-lg bg-white-100 p-5 dark:bg-black-700"
              >
                <div
                  className={`dark:bg-black-800 ${colorsLogIn[index]} h-[60px] rounded-md p-5`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={30}
                    height={20}
                  />
                </div>
                <p className="p1-medium">{item.label}</p>
              </div>
            ))}
          </article>
        </div>
      </div>
      <div
        className="flex w-full flex-col items-center bg-white-200 px-4 pt-10 
        text-white-100 dark:bg-black-900
         md:px-10 lg:w-1/2 lg:justify-start  lg:pt-44 xl:px-28"
      >
        <div className="w-full lg:hidden">
          <Image
            src={
              theme === 'dark'
                ? '/assets/icons/logo-dark.svg'
                : '/assets/icons/logo-light.svg'
            }
            alt="logo"
            width={147}
            height={30}
            className="mx-auto mb-14"
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="p3-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      className="placeholder:text-bla p3-medium h-11 rounded border border-gray-300/40 bg-white-100 placeholder:!font-normal focus:ring-offset-0   focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-none dark:bg-black-800 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="p3-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className="p3-medium h-11 rounded border border-gray-300/40 bg-white-100 placeholder:font-normal focus:ring-offset-0  focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-none dark:bg-black-800 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
              Don’t have an account yet?
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
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="p3-medium h-11 flex w-full items-center gap-2 dark:bg-black-800 bg-white-100"
            >
              <Image
                src={'/assets/icons/google.svg'}
                alt="google"
                width={20}
                height={20}
                className="invert dark:invert-0"
              />
              <p className="p3-medium ">Continue with Google</p>
            </Button>
            <Button
              onClick={() => signIn('github', { callbackUrl: '/home' })}
              type="button"
              className="p3-medium h-11 flex w-full items-center gap-2 dark:bg-black-800 bg-white-100"
            >
              <Image
                src={'/assets/icons/github.svg'}
                alt="github"
                width={20}
                height={20}
                className="invert dark:invert-0"
              />
              <p className="p3-medium ">Continue with Github</p>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
