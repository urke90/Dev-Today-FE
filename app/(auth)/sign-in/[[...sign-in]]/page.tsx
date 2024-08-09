'use client';

import LeftSidebar from '@/components/auth-onboarding/LeftSidebar';
// import { SignIn } from '@clerk/nextjs';
import { SIGN_IN_SIDEBAR_DATA } from '@/constants';
import { loginSchema } from '@/lib/validation';
import { SignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ----------------------------------------------------------------

const SignInPage = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      // router.push('/');
    } else {
      throw new Error('Error while logging in');
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <LeftSidebar
        title="Sign in to DevToday."
        listItems={SIGN_IN_SIDEBAR_DATA}
      />
      {/* <div className="flex flex-col flex-1 bg-light100__dark800 min-h-screen max-md:hidden px-5">
        <div className="mb-12 mt-9 md:ml-6 md:mb-20 max-md:mx-auto">
          {!isMounted ? (
            <Image
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              width={147}
              height={30}
              sizes="147x30"
              alt="Loading Light/Dark Toggle"
              priority={false}
              title="Loading Light/Dark Toggle"
            />
          ) : (
            <Image
              src={`${
                resolvedTheme === 'dark'
                  ? '/assets/icons/logo-dark.svg'
                  : '/assets/icons/logo-light.svg'
              }`}
              alt="logo"
              width={147}
              height={30}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="max-w-md max-md:hidden flex flex-col gap-10">
            <h2 className="d1-bold">Sign in to DevToday.</h2>
            <ul className="flex flex-col gap-5">
              {SIGN_IN_SIDEBAR_DATA.listItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-5 rounded-lg bg-white-100 p-5 dark:bg-black-700 p1-medium"
                >
                  <div
                    className={`flex-center dark:bg-black-800 ${item.bgColor} size-[60px] rounded-md shrink-0`}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={20}
                      height={20}
                    />
                  </div>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
      <div className="flex-1 flex-col bg-light200__dark900 flex items-center">
        <div className="mb-12 mt-9 md:ml-6 max-md:mx-auto md:hidden">
          {!isMounted ? (
            <Image
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              width={147}
              height={30}
              sizes="147x30"
              alt="Loading Light/Dark Toggle"
              priority={false}
              title="Loading Light/Dark Toggle"
            />
          ) : (
            <Image
              src={`${
                resolvedTheme === 'dark'
                  ? '/assets/icons/logo-dark.svg'
                  : '/assets/icons/logo-light.svg'
              }`}
              alt="logo"
              width={147}
              height={30}
            />
          )}
        </div>
        <div className="md:mt-[146px] px-5">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
