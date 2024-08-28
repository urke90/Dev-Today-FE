import RHFInput from '../RHFInputs/RHFInput';
import { Button } from '../ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { revalidateRoute } from '@/lib/actions/revalidate';
import {
  editAndReplyCommentSchema,
  type IComment,
  type IEditAndReplyCommentSchema,
} from '@/lib/validation';
import { typedFetch } from '@/utils/api';
import { formatDate } from '@/utils/format';

// ----------------------------------------------------------------

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
  const { data: session } = useSession();
  const form = useForm<IEditAndReplyCommentSchema>({
    resolver: zodResolver(editAndReplyCommentSchema),
    defaultValues: {
      text: isReplying ? '' : comment?.text ?? '',
    },
  });

  const onSubmit = async (data: IEditAndReplyCommentSchema) => {
    if (isReplying) {
      try {
        await typedFetch({
          url: '/content/comment',
          method: 'POST',
          body: {
            text: data.text,
            // authorId: session?.data?.user.id,
            authorId: session?.user.id,
            contentId: comment.contentId,
            replyingToId: comment.id,
          },
        });

        setOpenReply(false);
        revalidateRoute('/content/comment');
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
            text: data.text,
            authorId: comment.authorId,
          },
        });
        setOpenEdit(false);
        revalidateRoute('/content/comment');
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update comment');
      }

      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-light100__dark800 mt-4 !w-full space-y-4 rounded-lg p-3 shadow-2xl md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/avatars/avatar-1.svg"
                width={28}
                height={28}
                alt="avatar"
                className="rounded-full"
              />
              <div className="flex gap-1">
                <h4 className="p3-bold  !mb-0 !text-[12px] !font-semibold  tracking-wide md:mb-2 md:font-bold lg:!text-[12px]">
                  {session?.user.name}
                </h4>
                <span className=" text-white-400 text-[10px] md:text-[12px] ">
                  {formatDate(comment.createdAt)}
                </span>
                <span className=" text-white-400 text-[10px] md:text-[12px] ">
                  {formatDate(comment.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="!mt-5 flex-col space-y-4 md:mt-0">
            <RHFInput
              name="text"
              onChange={(e) => form.setValue('text', e.target.value)}
              className="bg-white-200 dark:bg-black-900 md:h-20 "
              placeholder={isEdit ? 'Edit your comment' : 'Reply to comment'}
            />
            <div className=" ml-auto flex w-1/2  justify-end">
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
                className="p3-medium !text-white-400 w-1/3 cursor-pointer !text-[14px] capitalize md:w-1/4"
              >
                Cancel
              </Button>
              <span className="text-white-400 mx-1">|</span>
              <Button
                type="submit"
                className="p3-medium  !text-primary-500 w-1/3  cursor-pointer  !text-[14px] capitalize md:w-1/4"
              >
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
