'use client';

import { fetchGroupMembers } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { IGroupMembersResponse } from '@/types/group';
import { EUserRole } from '@/types/user';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Button } from '../ui/button';
import MemberItemCard from './MemberItemCard';

// ----------------------------------------------------------------

interface IAdminDialogProps {
  // groupMembers: IGroupMembersResponse;
  // role: EUserRole;
  groupId: string;
}

const AdminMembersDialog: React.FC<IAdminDialogProps> = ({ groupId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery<IGroupMembersResponse>({
    queryKey: [EContentGroupQueries.FETCH_MEMBERS, EUserRole.ADMIN],
    queryFn: () => fetchGroupMembers(groupId, page, EUserRole.ADMIN),
    // initialData: groupMembers,
    enabled: isOpen,
  });

  const updatePage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const lastListItemRef = useInfiniteScroll({
    isLoading: isFetching,
    updatePage,
    shouldFetch: data?.hasNextPage || data?.members.length === 5,
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-auto p4-regular">View All</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="bg-white-100 dark:bg-black-900 py-[30px] px-3.5 gap-6 md:gap-[30px] flex flex-col md:py-9 md:px-10 data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[354px] -translate-x-1/2 -translate-y-1/2 focus:outline-none lg:w-[520px] rounded-[10px] lg:rounded-2xl">
          <div className="flex-between">
            <h1 className="h1-medium">All admins</h1>
            <Dialog.Close>
              <CloseIcon className="text-black-800 dark:text-white-200" />
            </Dialog.Close>
          </div>
          <ul className="flex flex-col gap-2.5 max-h-[360px] overflow-scroll">
            {data?.members && data?.members?.length > 0 ? (
              data?.members?.map(({ id, avatarImg, userName }) => (
                <MemberItemCard
                  key={id}
                  id={id}
                  avatarImg={avatarImg}
                  userName={userName}
                  isViewDialog
                />
              ))
            ) : (
              <p className="p1-bold text-center">
                There are no admins in the group.
              </p>
            )}
            <li ref={lastListItemRef} />
          </ul>
          {isFetching && (
            <div className="mt-2">
              <LoadingSpinner />
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AdminMembersDialog;
