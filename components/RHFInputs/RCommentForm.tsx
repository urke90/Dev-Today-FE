import { Form } from '@/components/ui/form';
import { revalidate } from '@/lib/actions/revalidate';
import { IComment, editAndReplyCommentSchema } from '@/lib/validation';
import { typedFetch } from '@/utils/api';
import { formatDate } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import RHFInput from './RHFInput';

type CommentProps = {
  isEdit: boolean;
  comment: IComment;
  setOpenEdit: (value: boolean) => void;
  setOpenReply: (value: boolean) => void;
  isReplying: boolean;
};

const RCommentForm = ({
  isEdit,
  setOpenEdit,
  setOpenReply,
  isReplying,
  comment,
}: CommentProps) => {
  const session = useSession();
  const form = useForm<z.infer<typeof editAndReplyCommentSchema>>({
    resolver: zodResolver(editAndReplyCommentSchema),
    defaultValues: {
      text: isReplying ? '' : comment?.text ?? '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof editAndReplyCommentSchema>
  ) => {
    console.log(session);
    if (isReplying) {
      try {
        await typedFetch({
          url: '/content/comment',
          method: 'POST',
          body: {
            text: values.text,
            authorId: session?.data?.user.id,
            contentId: comment.contentId,
            replyingToId: comment.id,
          },
        });

        setOpenReply(false);
        revalidate('/content/comment');
      } catch (error) {
        console.error(error);
        throw new Error('Failed to reply to comment');
      }
    } else {
      try {
        await typedFetch({
          url: '/content/comment/update',
          method: 'PATCH',
          body: {
            id: comment.id,
            contentId: comment.contentId,
            text: values.text,
            authorId: comment.authorId,
          },
        });
        setOpenEdit(false);
        revalidate('/content/comment');
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update comment');
      }

      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="bg-light100__dark800 space-y-4 !w-full p-3 md:p-6 rounded-lg shadow-2xl mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Image
                src="/assets/images/avatars/avatar-1.svg"
                width={28}
                height={28}
                alt="avatar"
                className="rounded-full"
              />
              <div className="flex items-start flex-col h-6 ml-1 sm:ml-0 md:gap-1">
                <h4 className="p3-bold tracking-wide !text-[12px] !mb-0  lg:!text-[14px] !font-semibold md:font-bold md:mb-2">
                  {session?.data?.user.name}
                </h4>
                <div className="text-[8px] sm:text-[11px]  lg:text-[14px]">
                  <span className="relative bottom-1 text-white-400">
                    {formatDate(comment.createdAt)}
                  </span>
                  <span className="size-1 relative bottom-1 rounded-full bg-white-400"></span>
                  <span className="relative bottom-1 text-white-400">
                    {formatDate(comment.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col space-y-4 !mt-5 md:mt-0">
            <RHFInput
              name="text"
              onChange={(e) => form.setValue('text', e.target.value)}
              className="!bg-black-900 md:h-20 "
              placeholder={isEdit ? 'Edit your comment' : 'Reply to comment'}
            />
            <div className="w-1/5 ml-auto flex gap-4 justify-end">
              <Button
                type="button"
                onSelect={(e) => e.preventDefault()}
                onClick={() => {
                  if (isEdit) {
                    setOpenEdit(false);
                  } else {
                    setOpenReply(false);
                  }
                }}
                className="!text-white-400 !text-[14px] capitalize cursor-pointer p3-medium">
                Cancel
              </Button>
              <span className="text-white-400">|</span>
              <Button
                type="submit"
                className="!text-primary-500 !text-[14px] capitalize cursor-pointer p3-medium">
                {isEdit ? 'Save' : 'Reply'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RCommentForm;
