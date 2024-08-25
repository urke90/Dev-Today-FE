'use client';
import RHFInput from '../RHFInputs/RHFInput';
import RCommentForm from '../RHFInputs/RCommentForm';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { revalidateRoute } from '@/lib/actions/revalidate';
import { commentFormSchema, IComment } from '@/lib/validation';
import { typedFetch } from '@/utils/api';
import { formatDate } from '@/utils/format';

// ----------------------------------------------------------------

interface ICommentsProps {
  comments: IComment[];
  commentAuthorId: string;
  contentId: string;
}

const Comments: React.FC<ICommentsProps> = ({
  comments,
  commentAuthorId,
  contentId,
}) => {
  const [editComment, setEditComment] = useState<string | null>(null);
  const [replyingComment, setReplyingComment] = useState<string | null>(null);

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      text: '',
      authorId: commentAuthorId,
      contentId,
    },
  });

  const onSubmit = async (values: z.infer<typeof commentFormSchema>) => {
    try {
      await typedFetch({
        url: '/content/comment',
        method: 'POST',
        body: {
          text: values.text,
          authorId: values.authorId,
          contentId: values.contentId,
        },
      });
      revalidateRoute('/content/comment');
      form.reset();
      setReplyingComment(null);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to post comment');
    }
  };

  const onDelete = async (commentId: string) => {
    try {
      await typedFetch({
        url: '/content/comment/delete',
        method: 'DELETE',
        body: {
          id: commentId,
        },
      });
      revalidateRoute('/comment');
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete comment');
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await typedFetch({
        url: '/content/comment/like',
        method: 'POST',
        body: {
          id: commentId,
          userId: commentAuthorId,
        },
      });
      revalidateRoute('/content/comment');
    } catch (error) {
      console.error(error);
      throw new Error('Failed to like comment');
    }
  };

  return (
    <div className="!mt-20 max-w-[825px] space-y-5">
      <h2 className="h1-medium ">Comments</h2>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white-100 p-1 px-2">
          <Image
            src="/assets/images/avatars/avatar-1.svg"
            width={32}
            height={30}
            alt="avatar"
            className="ml-1 rounded-full"
          />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <RHFInput
              className="bg-white-200"
              name="text"
              onChange={(e) => form.setValue('text', e.target.value)}
              placeholder="Say something nice to Mansurl Haque..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)();
                }
              }}
            />
          </form>
        </Form>
      </div>

      {comments.map((comment) => (
        <>
          {editComment === comment.id ? (
            <RCommentForm
              comment={comment}
              isReplying={false}
              isEdit={true}
              setOpenEdit={() => setEditComment(null)}
              setOpenReply={() => setReplyingComment(null)}
            />
          ) : (
            <div key={comment.id}>
              <div className="bg-light200__dark800 space-y-4 rounded-lg p-3 shadow-lg md:p-6">
                <div className="flex  items-start justify-between sm:items-center">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <div className="flex h-full items-center">
                        <Image
                          src={
                            comment.author.avatarImg ||
                            '/assets/images/avatars/avatar-1.svg'
                          }
                          width={28}
                          height={28}
                          alt="avatar"
                          className="h-full rounded-full object-cover"
                        />
                      </div>

                      <div className="ml-1 flex h-6 flex-col items-start sm:ml-0 md:flex-row md:items-center md:gap-2">
                        <h4 className="p3-bold !text-[12px] !font-semibold tracking-wide sm:!text-[14px] md:mb-2 md:font-bold">
                          {comment.author.userName}
                        </h4>
                        <div className="text-[8px] sm:text-[10px] lg:text-[12px]">
                          <span className="relative bottom-1 text-white-400">
                            {formatDate(comment.createdAt)}
                          </span>
                          <span className="relative bottom-1 size-1 rounded-full bg-white-400"></span>
                          <span className="relative bottom-1 text-white-400">
                            {formatDate(comment.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:mt-0  md:gap-4">
                    <div
                      className="flex cursor-pointer items-center gap-1"
                      onClick={() => setReplyingComment(comment.id)}
                    >
                      <Image
                        src="/assets/icons/reply.svg"
                        width={16}
                        height={16}
                        alt="avatar"
                        className="rounded-full invert"
                      />
                      <p className="text-[10px] text-white-400">Reply</p>
                    </div>
                    <Image
                      onClick={() => handleLike(comment.id)}
                      src={
                        comment?.viewerHasLiked
                          ? '/assets/icons/like.svg'
                          : '/assets/icons/heart.svg'
                      }
                      width={16}
                      height={16}
                      alt="avatar"
                      className="size-[16px] cursor-pointer"
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
                          className="shadow-header-menu z-20 mb-4 flex !w-48 flex-col gap-2.5 rounded-[10px] border border-black-700/40 bg-black-900 px-5 py-4 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                        >
                          <Item
                            onClick={() => setEditComment(comment.id)}
                            className="p2-medium flex cursor-pointer items-center gap-2.5"
                          >
                            <EditIcon size={16} />
                            <p>Edit Comment</p>
                          </Item>
                          <Item
                            onClick={() => onDelete(comment.id)}
                            onSelect={(e) => e.preventDefault()}
                            className="p2-medium flex cursor-pointer items-center gap-2.5 !text-[#FF584D]"
                          >
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

                <p className="p2-regular !ml-3 !mt-3 !text-[12px] !font-semibold !text-white-400 md:!mt-1 md:!text-[14px]">
                  {comment.text.charAt(0).toUpperCase() + comment.text.slice(1)}
                </p>
                {comment.replies && (
                  <div className="overflow-wrap break-word !mt-0 !w-full space-y-2 overflow-hidden text-wrap break-words rounded-lg p-2 text-[11px]">
                    {comment.replies.map((reply, idx) => (
                      <div key={idx + 1}>
                        <div className="flex items-center">
                          <div className="flex gap-1">
                            <Image
                              src={
                                reply.author.avatarImg ||
                                '/assets/images/avatars/avatar-1.svg'
                              }
                              width={20}
                              height={20}
                              alt="avatar"
                              className="rounded-full"
                            />
                            {reply.author.userName}

                            <p className="ml-1">
                              {formatDate(reply.createdAt)}
                            </p>
                          </div>
                        </div>
                        <p className="ml-7 font-semibold text-white-400">
                          {reply.text.charAt(0).toUpperCase() +
                            reply.text.slice(1)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {replyingComment === comment.id && (
            <RCommentForm
              comment={comment}
              isReplying={true}
              isEdit={false}
              setOpenEdit={() => setEditComment(null)}
              setOpenReply={() => setReplyingComment(null)}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default Comments;
