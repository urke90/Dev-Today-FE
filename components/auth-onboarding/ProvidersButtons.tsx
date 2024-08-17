import { signIn } from 'next-auth/react';
import Link from 'next/link';
import GithubIcon from '../icons/Github';
import GoogleIcon from '../icons/Google';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

// ----------------------------------------------------------------

interface IProvidersButtonsProps {
  isLoginPage?: boolean;
}

const ProvidersButtons: React.FC<IProvidersButtonsProps> = ({
  isLoginPage = false,
}) => {
  return (
    <div className="space-y-5">
      <Button type="submit" variant="primary" className="p2-bold">
        Next
      </Button>
      <Link
        href={isLoginPage ? '/register' : '/login'}
        className="block cursor-pointer text-center hover:underline p3-regular"
      >
        {isLoginPage
          ? "Don't have an account yet?"
          : 'Already have an account?'}
        <span className="ml-1 text-[16px] text-primary-500">
          {isLoginPage ? 'Join the community!' : 'Sign in.'}
        </span>
      </Link>
      <div className="flex-center">
        <Separator className="w-2/5  bg-black-700/10 dark:bg-black-800" />
        <p className="p1-medium">or</p>
        <Separator className="w-2/5 bg-black-700/10 dark:bg-black-800" />
      </div>
      <Button
        type="button"
        variant="cancel"
        onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
        className="p3-medium gap-2.5"
      >
        <GoogleIcon className="dark:text-white-200 text-black-700" />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="cancel"
        onClick={() => signIn('github', { callbackUrl: '/onboarding' })}
        className="p3-medium gap-2.5"
      >
        <GithubIcon className="dark:text-white-200 text-black-700" />
        Continue with Github
      </Button>
    </div>
  );
};

export default ProvidersButtons;
