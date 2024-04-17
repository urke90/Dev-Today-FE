"use client";
import {
  codingAmbitions,
  currentKnowledge,
  onboardingWelcome,
  preferSkills,
} from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, FormState } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { onboardingSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const Onboarding = () => {
  const [step, setStep] = useState<number>(0);
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      currentKnowledge: "",
      codingAmbitions: [],
      preferSkills: [],
    },
  });

  const goNext = async () => {
    if (step === 0) {
      const success = await form.trigger("currentKnowledge");
      if (success && form.getValues("currentKnowledge")) {
        setStep(1);
      } else {
        toast.error("Please select one option.");
      }
    }
    if (step === 1) {
      const success = await form.trigger("codingAmbitions");
      if (success && form.getValues("codingAmbitions")) {
        setStep(2);
      } else {
        toast.error("Please select one or more options.");
      }
    }
    if (step === 2) {
      const success = await form.trigger("preferSkills");
      if (success) {
        form.handleSubmit(onSubmit)();
      } else {
        toast.error("Please select one or more options.");
      }
    }
  };

  function onSubmit(values: z.infer<typeof onboardingSchema>) {
    console.log(values);
  }
  return (
    <div className="bg-black-800 min-h-screen flex">
      <Toaster
        toastOptions={{
          className: "!bg-black-600 !text-white-100",
        }}
      />
      <div className="hidden lg:w-1/2 p-16 lg:flex flex-col items-center">
        <div className="w-full">
          <Image
            src="/assets/icons/logo-dark.svg"
            alt="logo"
            width={147}
            height={30}
            className="mb-24"
          />
        </div>
        <div className="max-w-md">
          <h2 className="display-1-bold mb-10">Sign in to DevToday.</h2>
          <article className="flex flex-col gap-5">
            {onboardingWelcome.map((item) => (
              <div
                key={item.label}
                className="bg-black-700 p-5 flex gap-5 items-center rounded-lg">
                <div className="bg-black-800 h-[60px] p-5 rounded-md">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={30}
                    height={20}
                  />
                </div>
                <p className="paragraph-1-medium">{item.label}</p>
              </div>
            ))}
          </article>
        </div>
      </div>
      <div className="text-white-100 flex flex-col  pt-10 lg:pt-44 lg:justify-start items-center bg-black-900 px-4 md:px-10 xl:px-28  w-full lg:w-1/2">
        <div className="w-full lg:hidden">
          <Image
            src="/assets/icons/logo-dark.svg"
            alt="logo"
            width={147}
            height={30}
            className="mb-14 mx-auto"
          />
        </div>
        {step === 0 && (
          <h2 className="display-1-bold mr-auto !text-white-100 mb-10">
            Which best describes your current programming journey?
          </h2>
        )}
        {step === 1 && (
          <h2 className="display-1-bold mr-auto !text-white-100 mb-10">
            Define your coding ambitions
          </h2>
        )}
        {step === 2 && (
          <>
            <h2 className="display-1-bold mr-auto !text-white-100 mb-10">
              Select your preferred languages and frameworks for a personalized
              experience.
            </h2>
            <p className="mr-auto mb-3">Choose as many as you like.</p>
          </>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full ">
            {step === 0 && (
              <>
                {currentKnowledge.map((item) => (
                  <Controller
                    key={item.title}
                    control={form.control}
                    defaultValue="false"
                    name="currentKnowledge"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            type="button"
                            value={item.title}
                            onClick={() => field.onChange(item.title)}
                            className={`w-full justify-start bg-black-800 ${
                              field.value === item.title ? "bg-primary-500" : ""
                            } border-none h-11 text-[14px] paragraph-1-medium`}>
                            {item.title}
                          </Button>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </>
            )}
            {step === 1 && (
              <>
                {codingAmbitions.map((item, index) => (
                  <Controller
                    key={item.title}
                    control={form.control}
                    name="codingAmbitions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            type="button"
                            onClick={() => {
                              const newValue = field.value.includes(item.title)
                                ? field.value.filter(
                                    (value) => value !== item.title
                                  )
                                : [...field.value, item.title];
                              field.onChange(newValue);
                            }}
                            className={`w-full 
                         ${
                           field.value.includes(item.title)
                             ? "bg-primary-500"
                             : "bg-black-800"
                         }  border-none h-11 justify-start text-[14px] paragraph-1-medium`}>
                            {item.title}
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </>
            )}
            {step === 2 && (
              <div className="flex flex-wrap gap-3">
                {preferSkills.map((item) => (
                  <Controller
                    key={item.title}
                    control={form.control}
                    name="preferSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            type="button"
                            onClick={() => {
                              const newValue = field.value.includes(item.title)
                                ? field.value.filter(
                                    (value) => value !== item.title
                                  )
                                : [...field.value, item.title];
                              field.onChange(newValue);
                            }}
                            className={`border-none ${
                              field.value.includes(item.title)
                                ? "bg-primary-500"
                                : "bg-black-800"
                            } h-11 text-[14px] paragraph-1-medium `}>
                            {item.title}
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}
            <Button
              onClick={() => goNext()}
              className="w-full bg-primary-500 text-[14px] paragraph-2-bold ">
              {step === 2 ? "Get Started" : "Next"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboarding;
