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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "../context/ThemeProvider";

const Onboarding = () => {
  const { mode, setMode } = useTheme();
  const [step, setStep] = useState<number>(0);
  const colorsOnboardingIcons = ["bg-[#FFECE6]", "bg-[#FDF4EA]"];
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
      if (success) {
        setStep(1);
      } else {
        toast.error("Please select one option.");
      }
    }
    if (step === 1) {
      const success = await form.trigger("codingAmbitions");
      if (success) {
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
    <div
      className={`${
        mode === "light" ? "bg-white-100" : "bg-black-800"
      } min-h-screen flex`}>
      <Toaster
        toastOptions={{
          className: "!bg-black-600 !text-white-100",
        }}
      />
      <div className="hidden lg:w-1/2 p-16 lg:flex flex-col items-center">
        <div className="w-full">
          <Image
            onClick={() =>
              setMode && setMode(mode === "dark" ? "light" : "dark")
            }
            src={`${
              mode === "dark"
                ? "/assets/icons/logo-dark.svg"
                : "assets/icons/logo-light.svg"
            }`}
            alt="logo"
            width={147}
            height={30}
            className="mb-24"
          />
        </div>
        <div className="max-w-md">
          <h2 className="display-1-bold mb-10">Sign in to DevToday.</h2>
          <article className="flex flex-col gap-5">
            {onboardingWelcome.map((item, index) => (
              <div
                key={item.label}
                className={`${
                  mode === "dark" ? "bg-black-700" : "bg-white-100"
                } p-5 flex gap-5 items-center rounded-lg`}>
                <div
                  className={`${
                    mode === "dark"
                      ? "bg-black-800"
                      : `${colorsOnboardingIcons[index]}`
                  } h-[60px]  p-5 rounded-md`}>
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
      <div
        className={`text-white-100 flex flex-col  pt-10 lg:pt-44 lg:justify-start items-center ${
          mode === "dark" ? "bg-black-900" : "bg-white-200"
        } px-4 md:px-10 xl:px-28  w-full lg:w-1/2`}>
        <div className="w-full lg:hidden">
          <Image
            src={
              mode === "dark"
                ? "/assets/icons/logo-dark.svg"
                : "assets/icons/logo-light.svg"
            }
            alt="logo"
            width={147}
            height={30}
            className="mb-14 mx-auto"
          />
        </div>
        {step === 0 && (
          <h2 className="display-1-bold mr-auto md:mb-10">
            Which best describes your current programming journey?
          </h2>
        )}
        {step === 1 && (
          <h2 className="display-1-bold mr-auto md:mb-10">
            Define your coding ambitions
          </h2>
        )}
        {step === 2 && (
          <>
            <h2 className="display-1-bold mr-auto mb-10">
              Select your preferred languages and frameworks for a personalized
              experience.
            </h2>
            <p
              className={`mr-auto mb-3 ${
                mode === "light" ? "text-black-600" : ""
              }`}>
              Choose as many as you like.
            </p>
          </>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full ">
            {step === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="currentKnowledge"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1">
                          {currentKnowledge.map((item) => (
                            <FormItem key={item.value}>
                              <FormControl>
                                <RadioGroupItem
                                  value={item.value}
                                  className="hidden"
                                />
                              </FormControl>
                              <FormLabel
                                className={`w-full flex items-center
                              ${
                                item.value === field.value
                                  ? "bg-primary-500 !text-white-100"
                                  : `${
                                      mode === "dark"
                                        ? "bg-black-800"
                                        : "bg-white-100"
                                    }`
                              }
                              px-4 justify-start  rounded border-none h-14 text-[14px] paragraph-1-medium cursor-pointer`}>
                                {item.title}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 1 && (
              <FormField
                control={form.control}
                name="codingAmbitions"
                render={() => (
                  <FormItem className="flex flex-col">
                    {codingAmbitions.map((item, index) => (
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
                                className={`w-full flex items-center
                              ${
                                field.value.includes(item.value)
                                  ? "bg-primary-500 !text-white-100"
                                  : `${
                                      mode === "dark"
                                        ? "bg-black-800"
                                        : "bg-white-100"
                                    }`
                              }
                              px-4  justify-start  rounded border-none h-14 text-[14px] paragraph-1-medium cursor-pointer`}>
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
            {step === 2 && (
              <div>
                <FormField
                  control={form.control}
                  name="preferSkills"
                  render={() => (
                    <FormItem className="flex flex-wrap gap-3 items-center space-y-0">
                      {preferSkills.map((item) => (
                        <FormField
                          key={item.title}
                          control={form.control}
                          name="preferSkills"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.title} className="flex">
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
                                  className={`border-none cursor-pointer ${
                                    field.value.includes(item.title)
                                      ? "bg-primary-500 !text-white-100"
                                      : `${
                                          mode === "dark"
                                            ? "bg-black-800"
                                            : "bg-white-100"
                                        }`
                                  } h-12  rounded-lg flex items-center paragraph-3-medium !px-5`}>
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
              </div>
            )}
            <Button
              onClick={() => goNext()}
              className="w-full bg-primary-500 h-11 paragraph-2-bold ">
              {step === 2 ? "Get Started" : "Next"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboarding;
