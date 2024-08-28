'use client';

import CommentForm from './CommentForm';

import RHFInput from '../RHFInputs/RHFInput';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { EditIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { revalidateRoute } from '@/lib/actions/revalidate';
import {
  commentFormSchema,
  type IComment,
  type ICommentFormSchema,
} from '@/lib/validation';
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

  const form = useForm<ICommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      text: '',
      authorId: commentAuthorId,
      contentId,
    },
  });

  const onSubmit = async (data: ICommentFormSchema) => {
    try {
      await typedFetch({
        url: '/content/comment',
        method: 'POST',
        body: {
          text: data.text,
          authorId: data.authorId,
          contentId: data.contentId,
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

  const handleDeleteComment = async (commentId: string) => {
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
        <div className="bg-white-100 rounded-full p-1 px-2">
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
              name="text"
              onChange={(e) => form.setValue('text', e.target.value)}
              placeholder="Add comment..."
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
            <CommentForm
              key={comment.id}
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
                          <span className="text-white-400 relative bottom-1">
                            {formatDate(comment.createdAt)}
                          </span>
                          <span className="bg-white-400 relative bottom-1 size-1 rounded-full"></span>
                          <span className="text-white-400 relative bottom-1">
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
                      <p className="text-white-400 text-[10px]">Reply</p>
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
                          className="shadow-header-menu border-black-700/40 bg-black-900 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-20 mb-4 flex !w-48 flex-col gap-2.5 rounded-[10px] border px-5 py-4"
                        >
                          <Item
                            onClick={() => setEditComment(comment.id)}
                            className="p2-medium flex cursor-pointer items-center gap-2.5"
                          >
                            <EditIcon size={16} />
                            Edit Comment
                          </Item>
                          <Item
                            onClick={() => handleDeleteComment(comment.id)}
                            onSelect={(e) => e.preventDefault()}
                            className="p2-medium text-error-text flex cursor-pointer items-center gap-2.5"
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

                <p className="p2-regular !text-white-400 !ml-3 !mt-3 !text-[12px] !font-semibold md:!mt-1 md:!text-[14px]">
                  {comment.text.charAt(0).toUpperCase() + comment.text.slice(1)}
                </p>
                {comment.replies && comment.replies.length > 0 && (
                  <div className="overflow-wrap break-word !mt-0 !w-full space-y-2 overflow-hidden text-wrap break-words rounded-lg p-2 text-[11px]">
                    {comment.replies.map((reply) => (
                      <div key={reply.id}>
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
                        <p className="text-white-400 ml-7 font-semibold">
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
            <CommentForm
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
