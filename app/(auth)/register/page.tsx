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
import { regWelcome } from '@/constants';
import { signInSchema } from '@/lib/validation';
import { colorsRegister } from '@/styles/index';

import { useTheme } from '@/context/ThemeProvider';

const Register = () => {
  const { setMode, mode } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: values.userName,
          email: values.email,
          password: values.password,
        }),
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error while registering');
    }

    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      router.push('/onboarding');
    } else {
      throw new Error('Error while logging in');
    }
  }

  return (
    <div className="flex min-h-screen bg-white-100 dark:bg-black-800">
      <div className="hidden flex-col items-center p-16 lg:flex lg:w-1/2">
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
          <h2 className="d1-bold mb-10">
            Join our developer community! Sign up now and be part of the
            conversation.
          </h2>
          <article className="flex flex-col gap-5">
            {regWelcome.map((item, index) => {
              return (
                <div
                  key={index + 1}
                  className="bg-white-100 dark:bg-black-700 p-5 flex gap-5 items-center rounded-lg"
                >
                  <div
                    className={`dark:bg-black-800 ${colorsRegister[index]} h-[60px] p-5 rounded-md`}
                  >
                    <Image
                      src={
                        mode === 'dark'
                          ? item.image
                          : item.image.replace('dark', 'light')
                      }
                      alt={item.alt}
                      width={30}
                      height={20}
                    />
                  </div>
                  <p className="p1-medium">{item.label}</p>
                </div>
              );
            })}
          </article>
        </div>
      </div>
      <div
        className="text-white-100 flex flex-col pt-10 lg:pt-44 lg:justify-start items-center 
        dark:bg-black-900 bg-white-200
         px-4 md:px-10 xl:px-28  w-full lg:w-1/2"
      >
        <div className="w-full lg:hidden">
          <Image
            src={`${
              mode === 'dark'
                ? '/assets/icons/logo-dark.svg'
                : 'assets/icons/logo-light.svg'
            }`}
            alt="logo"
            width={147}
            height={30}
            className="mx-auto mb-14"
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full "
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="p3-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      className="p3-medium h-11 rounded border border-gray-300/40 bg-white-100 placeholder:font-normal focus:ring-offset-0  focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-none dark:bg-black-800 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="p3-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      className="p3-medium h-11 rounded border border-gray-300/40 bg-white-100 placeholder:font-normal focus:ring-offset-0  focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-none dark:bg-black-800 "
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
              className="w-full h-11 bg-primary-500 text-[14px] p2-bold "
            >
              Next
            </Button>
            <Link
              href="/login"
              className="text-white-500/70 block cursor-pointer text-center hover:underline"
            >
              Already have an account?
              <span className="ml-1 text-[16px] text-primary-500">Sign in</span>
            </Link>
            <div className="flex items-center justify-between">
              <Separator className="w-2/5  bg-black-700/10 dark:bg-black-800" />
              <p className="p4-regular">or</p>
              <Separator className="w-2/5 bg-black-700/10 dark:bg-black-800" />
            </div>
            <Button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
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
              onClick={() => signIn('github', { callbackUrl: '/onboarding' })}
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

export default Register;
