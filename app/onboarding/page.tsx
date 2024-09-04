'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import LeftSidebar from '@/components/auth-onboarding/LeftSidebar';
import ThemeLogo from '@/components/shared/ThemeLogo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  CODING_AMBITIONS,
  CURRENT_KNOWLEDGE,
  generateOnboardingStepData,
  PREFERRED_SKILLS,
} from '@/constants';
import { type IOnboardingSchema, onboardingSchema } from '@/lib/validation';

// ----------------------------------------------------------------

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const OnboardingPage = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { data: session } = useSession();

  if (!session) throw new Error('User is not logged in!');

  const form = useForm<IOnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      currentKnowledge: '',
      codingAmbitions: [],
      preferredSkills: [],
    },
  });

  const goNext = async () => {
    if (step === 1) {
      const isValid = await form.trigger('currentKnowledge');

      if (isValid) {
        setStep(2);
      } else {
        toast.error('Please select one option.');
      }
    }

    if (step === 2) {
      const isValid = await form.trigger('codingAmbitions');

      if (isValid) {
        setStep(3);
      } else {
        toast.error('Please select one or more options.');
      }
    }

    if (step === 3) {
      const isValid = await form.trigger('preferredSkills');
      if (isValid) {
        form.handleSubmit(onSubmit)();
      } else {
        toast.error('Please select one or more options.');
      }
    }
  };

  const onSubmit = async (data: IOnboardingSchema) => {
    try {
      const response = await fetch(
        BASE_API_URL + `/user/${session.user.id}/onboarding`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({ ...data, isOnboardingCompleted: true }),
        }
      );

      if (response.status === 200) {
        toast.success('Onboarding completed successfully.');
        router.push('/posts');
      } else {
        toast.error('Error while updating user onboarding');
      }
    } catch (error) {
      toast.error('Error while updating user onboarding');
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="auth-onboarding-page-wrapper">
      <LeftSidebar
        title={generateOnboardingStepData(step).title}
        listItems={generateOnboardingStepData(step).listItems}
        isMounted={isMounted}
        theme={resolvedTheme}
      />
      <div className="auth-onboarding-right-sidebar gap-10">
        <div className="flex w-full max-w-md flex-col gap-10">
          <div className="mx-auto md:hidden">
            <ThemeLogo theme={resolvedTheme} isMounted={isMounted} />
          </div>
          <h1 className="d1-bold">
            {step === 1 &&
              'Which best describes your current programming journey?'}
            {step === 2 && 'Define your coding ambitions.'}
            {step === 3 &&
              'Which best describes your current programming journey?'}
          </h1>
          <Form {...form}>
            <form>
              {step === 1 && (
                <FormField
                  control={form.control}
                  name="currentKnowledge"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col gap-5"
                        >
                          {CURRENT_KNOWLEDGE.map((item) => (
                            <FormItem key={item.value}>
                              <FormControl>
                                <RadioGroupItem
                                  value={item.value}
                                  className="hidden"
                                />
                              </FormControl>
                              <FormLabel
                                key={item.value}
                                className={`p1-medium !mt-0 flex h-14 w-full cursor-pointer items-center rounded px-4 transition-transform hover:-translate-y-1
                              ${
                                item.value === field.value
                                  ? 'bg-primary-500 !text-white-100'
                                  : 'bg-white-100 dark:bg-black-800'
                              }`}
                              >
                                {item.title}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {step === 2 && (
                <FormField
                  control={form.control}
                  name="codingAmbitions"
                  render={() => (
                    <FormItem className="flex w-full flex-col gap-5 space-y-0">
                      {CODING_AMBITIONS.map((item, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name="codingAmbitions"
                          render={({ field }) => {
                            return (
                              <FormItem key={index}>
                                <FormControl>
                                  <Checkbox
                                    className="hidden"
                                    checked={field.value?.includes(item.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.value,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={`p1-medium !mt-0 flex h-14 w-full cursor-pointer items-center justify-start rounded border-none px-4 transition-transform hover:-translate-y-1
                              ${
                                field.value.includes(item.value)
                                  ? 'bg-primary-500 !text-white-100'
                                  : 'bg-white-100 dark:bg-black-800'
                              }`}
                                >
                                  {item.title}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </FormItem>
                  )}
                />
              )}
              {step === 3 && (
                <FormField
                  control={form.control}
                  name="preferredSkills"
                  render={() => (
                    <FormItem className="flex flex-wrap items-center gap-3 space-y-0">
                      {PREFERRED_SKILLS.map((item) => (
                        <FormField
                          key={item.title}
                          control={form.control}
                          name="preferredSkills"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.title} className="w-fit">
                                <FormControl>
                                  <Checkbox
                                    className="hidden"
                                    checked={field.value?.includes(item.title)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.title,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.title
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={`p3-medium !mt-0 flex h-14 cursor-pointer items-center rounded-lg !px-5 transition-transform hover:scale-[0.9] ${
                                    field.value.includes(item.title)
                                      ? 'bg-primary-500 !text-white-100'
                                      : 'bg-white-100 dark:bg-black-800'
                                  } `}
                                >
                                  {item.title}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </FormItem>
                  )}
                />
              )}
            </form>
            <Button
              onClick={goNext}
              variant="primary"
              className="p2-bold bg-primary-500 h-11 w-full"
            >
              {step === 2 ? 'Get Started' : 'Next'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
