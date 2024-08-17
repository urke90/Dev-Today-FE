'use client';

import { useTheme } from 'next-themes';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
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
  PREFERRED_SKILLS,
  generateOnboardingStepData,
} from '@/constants';
import { type IOnboardingSchema, onboardingSchema } from '@/lib/validation';

// ----------------------------------------------------------------

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
        `http://localhost:8080/api/user/${session.user.id}/onboarding`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, isOnboardingCompleted: true }),
        }
      );
      if (response?.ok) {
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
        <div className="max-w-md flex flex-col gap-10">
          <div className="md:hidden mx-auto">
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
                                className={`flex items-center w-full px-4 !mt-0 rounded h-14 p1-medium cursor-pointer hover:-translate-y-1 transition-transform
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
                    <FormItem className="flex flex-col gap-5 space-y-0">
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
                                  className={`flex w-full !mt-0 items-center px-4 justify-start rounded border-none hover:-translate-y-1 transition-transform h-14 p1-medium cursor-pointer
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
                    <FormItem className="flex flex-wrap gap-3 items-center space-y-0">
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
                                  className={`cursor-pointer !mt-0 h-14 hover:scale-[0.9] transition-transform rounded-lg flex items-center p3-medium !px-5 ${
                                    field.value.includes(item.title)
                                      ? 'bg-primary-500 !text-white-100'
                                      : 'dark:bg-black-800 bg-white-100'
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
              className="w-full bg-primary-500 h-11 p2-bold"
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
