'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import RHFInput from '../RHFInputs/RHFInput';

import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { EditIcon } from 'lucide-react';

const formSchema = z.object({
  messageToAuthor: z.string().min(2).max(50),
});
const Comments = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageToAuthor: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="h1-medium !mt-20 space-y-5">
      <h1>Comments</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/avatars/avatar-1.svg"
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full"
            />

            <RHFInput
              name="messageToAuthor"
              placeholder="Say something nice to Mansurl Haque..."
            />
          </div>

          <div className="bg-light100__dark800 space-y-4 !w-full p-6 rounded-lg shadow-lg ">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/images/avatars/avatar-1.svg"
                  width={28}
                  height={28}
                  alt="avatar"
                  className="rounded-full"
                />
                <div className="flex items-center h-6 gap-1">
                  <h4 className=" p3-bold tracking-wide font-bold mb-2">
                    Mishacreatrix
                  </h4>
                  <span className="size-1 relative bottom-1 rounded-full bg-white-400"></span>
                  <span className="text-[14px]  relative bottom-1 text-white-400">
                    Feb 01
                  </span>
                  <span className="size-1 relative bottom-1 rounded-full bg-white-400"></span>
                  <span className="text-[14px]  relative bottom-1 text-white-400">
                    Edited on Feb 01
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/icons/heart.svg"
                  width={16}
                  height={16}
                  alt="avatar"
                  className="rounded-full"
                />
                <DropdownMenu>
                  <Trigger asChild>
                    <Button className="w-auto">
                      <Image
                        src="/assets/icons/menu-vertical.svg"
                        alt="Menu"
                        width={16}
                        height={16}
                      />
                    </Button>
                  </Trigger>
                  <Portal>
                    <Content
                      avoidCollisions
                      collisionPadding={15}
                      sideOffset={8}
                      align="end"
                      onCloseAutoFocus={(e) => e.preventDefault()}
                      className="bg-black-900 border border-black-700/40 !w-48 px-5 shadow-header-menu data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-20 mb-4 flex  flex-col gap-2.5 rounded-[10px] py-4 ">
                      <Item
                        // onSelect={() => router.push(`/content/${content?.id}/edit`)}
                        className="flex items-center  gap-2.5 p2-medium cursor-pointer">
                        <EditIcon size={16} />
                        <p>Edit Comment</p>
                      </Item>
                      <Item
                        onSelect={(e) => e.preventDefault()}
                        className="flex items-center  gap-2.5 p2-medium !text-[#FF584D] cursor-pointer">
                        <Image
                          src="/assets/icons/trash.svg"
                          width={16}
                          height={18}
                          alt="Delete"
                        />
                        Delete Comment
                      </Item>
                    </Content>
                  </Portal>
                </DropdownMenu>
              </div>
            </div>

            <p className="p2-regular">
              Can't wait for this meetup! The lineup looks fantastic, and I'm
              eager to learn more about the latest in front-end technologies. 🚀
            </p>
          </div>
          <div className="bg-light100__dark800 space-y-4 !w-full p-6 rounded-lg shadow-lg ">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/images/avatars/avatar-1.svg"
                  width={28}
                  height={28}
                  alt="avatar"
                  className="rounded-full"
                />
                <div className="flex items-center h-6 gap-1">
                  <h4 className=" p3-bold tracking-wide font-bold mb-2">
                    Mishacreatrix
                  </h4>
                  <span className="size-1 relative bottom-1 rounded-full bg-white-400"></span>
                  <span className="text-[14px]  relative bottom-1 text-white-400">
                    Feb 01
                  </span>
                  <span className="size-1 relative bottom-1 rounded-full bg-white-400"></span>
                  <span className="text-[14px]  relative bottom-1 text-white-400">
                    Edited on Feb 01
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-col space-y-4">
              <RHFInput
                name="messageToAuthor"
                className="!bg-black-900 h-20 "
                placeholder="Say something nice to Mansurl Haque..."
              />
              <div className="w-1/5 ml-auto flex gap-4 justify-end">
                <span className="!text-white-400 !text-[14px] capitalize cursor-pointer p3-medium">
                  Cancel
                </span>
                <span className="text-white-400">|</span>
                <span className="!text-primary-500 !text-[14px] capitalize cursor-pointer p3-medium">
                  Save
                </span>
              </div>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Comments;
