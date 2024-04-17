"use client";
import { currentKnowledge, onboardingWelcome } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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

const Onboarding = () => {
  const [step, setStep] = useState<number>(0);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      currentKnowledge: "",
      codingAmbitions: [] ?? "",
      preferSkills: [] ?? "",
    },
  });

  const goNext = async () => {
    const success = await form.trigger("currentKnowledge");
    if (success && form.getValues("currentKnowledge")) {
      setStep(step + 1);
    }
  };

  function onSubmit(values: z.infer<typeof onboardingSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="bg-black-800 min-h-screen flex">
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full ">
            {currentKnowledge.map((item, index) => (
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
                        className={`w-full bg-black-800 ${
                          field.value === item.title ? "bg-primary-500" : ""
                        } border-none h-11 text-[14px] paragraph-1-medium !text-white-100`}>
                        {item.title}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="codingAmbitions"
              render={({ field }) => (
                <FormItem>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferSkills"
              render={({ field }) => (
                <FormItem>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              onClick={() => goNext()}
              className="w-full bg-primary-500 text-[14px] paragraph-2-bold ">
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboarding;
