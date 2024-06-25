'use client';

import * as Dialog from '@radix-ui/react-dialog';
import CloseIcon from '../icons/CloseIcon';
import { Button } from '../ui/button';
import MemberItemCard from './MemberItemCard';

// ----------------------------------------------------------------

interface IMembersDialogProps {
  members: {
    id: string;
    avatarImg: string;
    userName: string;
  }[];
}

const MembersDialog: React.FC<IMembersDialogProps> = ({ members }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="w-auto p4-regular">View All</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content className="bg-white-100 dark:bg-black-900 py-[30px] px-3.5 gap-6 md:gap-[30px] flex flex-col md:py-9 md:px-10 data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[354px] -translate-x-1/2 -translate-y-1/2 focus:outline-none lg:w-[520px] ">
          <div className="flex-between border">
            <h1 className="h1-medium">All members</h1>
            <CloseIcon className="text-black-800 dark:text-white-200" />
          </div>
          <ul className="flex flex-col gap-2.5">
            {members.length > 0
              ? members.map(({ id, avatarImg, userName }) => (
                  <MemberItemCard
                    key={id}
                    id={id}
                    avatarImg={avatarImg}
                    userName={userName}
                    isViewDialog
                  />
                ))
              : null}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MembersDialog;
