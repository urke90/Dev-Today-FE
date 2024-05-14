'use client';
import Image from 'next/image';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { loginSchema } from '@/lib/validation';
import { Separator } from '@/components/ui/separator';
import { signIn } from 'next-auth/react';
import { loginWelcome } from '@/constants';
import { colorsLogIn } from '@/styles/index';
import { useTheme } from '@/app/context/ThemeProvider';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { mode, setMode } = useTheme();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

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
    <div className="bg-white-100 dark:bg-black-800 min-h-screen flex">
      <div className="hidden lg:w-1/2 p-16 lg:flex flex-col items-center">
        <div className="w-full">
          <Image
            onClick={() =>
              setMode && setMode(mode === 'dark' ? 'light' : 'dark')
            }
            src={`${
              mode === 'dark'
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
            {loginWelcome.map((item, index) => (
              <div
                key={index + 1}
                className="bg-white-100 dark:bg-black-700 p-5 flex gap-5 items-center rounded-lg">
                <div
                  className={`dark:bg-black-800 ${colorsLogIn[index]} h-[60px] p-5 rounded-md`}>
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
        className="text-white-100 flex flex-col pt-10 lg:pt-44 lg:justify-start items-center 
        dark:bg-black-900 bg-white-200
         px-4 md:px-10 xl:px-28  w-full lg:w-1/2">
        <div className="w-full lg:hidden">
          <Image
            src={
              mode === 'dark'
                ? '/assets/icons/logo-dark.svg'
                : '/assets/icons/logo-light.svg'
            }
            alt="logo"
            width={147}
            height={30}
            className="mb-14 mx-auto"
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="p3-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      className="h-11 rounded placeholder:!font-normal placeholder:text-bla border-[1px] dark:border-none border-gray-300/40 dark:bg-black-800 bg-white-100   p3-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 "
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
                      className="h-11 rounded placeholder:font-normal border-[1px] dark:border-none border-gray-300/40 dark:bg-black-800 bg-white-100  p3-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary-500 text-[14px] h-11 p2-bold ">
              Next
            </Button>
            <Link
              href="/register"
              className="text-white-300 block cursor-pointer text-center hover:underline">
              Don’t have an account yet?
              <span className="text-[16px] ml-1 text-primary-500">
                Join the community
              </span>
            </Link>
            <div className="flex items-center justify-between">
              <Separator className="w-2/5  dark:bg-black-800 bg-black-700/10" />
              <p className="p4-regular">or</p>
              <Separator className="w-2/5 dark:bg-black-800 bg-black-700/10" />
            </div>
            <Button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="p3-medium h-11 flex w-full items-center gap-2 dark:bg-black-800 bg-white-100">
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
              className="p3-medium h-11 flex w-full items-center gap-2 dark:bg-black-800 bg-white-100">
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
