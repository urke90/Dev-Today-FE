'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import RHFInput from '../RHFInputs/RHFInput';

import { revalidate } from '@/lib/actions/revalidate';
import { IComment, commentFormSchema } from '@/lib/validation';
import { typedFetch } from '@/utils/api';
import { formatDate } from '@/utils/format';
import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';
import RCommentForm from '../RHFInputs/RCommentForm';

type AllCommentProps = {
  allComments: IComment[];
  commentAuthorId: string;
  contentId: string;
};

const Comments = ({
  allComments,
  commentAuthorId,
  contentId,
}: AllCommentProps) => {
  const [editComment, setEditComment] = useState<string | null>(null);
  const [replyingComment, setReplyingComment] = useState<string | null>(null);

  const findCommentEdit = allComments.find(
    (comment) => comment.id === editComment
  );

  const findCommentReply = allComments.find(
    (comment) => comment.id === replyingComment
  );

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
      revalidate('/content/comment');
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
      revalidate('/comment');
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete comment');
    }
  };

  return (
    <div className="!mt-20 space-y-5">
      <h2 className="h1-medium ">Comments</h2>
      {findCommentEdit && (
        <div className="mt-4">
          <RCommentForm
            comment={findCommentEdit}
            replyingComment={replyingComment}
            isEdit
            setOpenEdit={() => setEditComment(null)}
            setOpenReply={() => setReplyingComment(null)}
          />
        </div>
      )}

      {findCommentReply && (
        <div className="mt-4">
          <RCommentForm
            comment={findCommentReply}
            replyingComment={replyingComment}
            isEdit={false}
            setOpenEdit={() => setEditComment(null)}
            setOpenReply={() => setReplyingComment(null)}
          />
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-white-100 rounded-full p-1 px-2">
              <Image
                src="/assets/images/avatars/avatar-1.svg"
                width={32}
                height={30}
                alt="avatar"
                className="rounded-full ml-1"
              />
            </div>

            <RHFInput
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
          </div>

          {allComments.map((comment) => (
            <div key={comment.id}>
              <div className="bg-light100__dark800 space-y-4 !w-full p-6 rounded-lg shadow-lg ">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Image
                      src={
                        comment.author.avatarImg ||
                        '/assets/images/avatars/avatar-1.svg'
                      }
                      width={28}
                      height={28}
                      alt="avatar"
                      className="rounded-full"
                    />
                    <div className="flex items-center h-6 gap-1">
                      <h4 className=" p3-bold tracking-wide font-bold mb-2">
                        {comment.author.userName}
                      </h4>
                      <span className="size-1 relative bottom-1 rounded-full bg-white-400"></span>
                      <span className="text-[14px]  relative bottom-1 text-white-400">
                        {formatDate(comment.createdAt)}
                      </span>
                      <span className="size-1 relative bottom-1 rounded-full bg-white-400"></span>
                      <span className="text-[14px]  relative bottom-1 text-white-400">
                        {formatDate(comment.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex gap-1 items-center cursor-pointer"
                      onClick={() =>
                        setReplyingComment(
                          replyingComment === comment.id ? null : comment.id
                        )
                      }>
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
                      src="/assets/icons/heart.svg"
                      width={16}
                      height={16}
                      alt="avatar"
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
                            onClick={() =>
                              setEditComment(
                                editComment === comment.id ? null : comment.id
                              )
                            }
                            className="flex items-center  gap-2.5 p2-medium cursor-pointer">
                            <EditIcon size={16} />
                            <p>Edit Comment</p>
                          </Item>
                          <Item
                            onClick={() => onDelete(comment.id)}
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
                  {comment.text.charAt(0).toUpperCase() + comment.text.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </form>
      </Form>
    </div>
  );
};

export default Comments;
