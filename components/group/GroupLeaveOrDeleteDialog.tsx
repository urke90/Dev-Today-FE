import { Button } from '../ui/button';

import * as Dialog from '@radix-ui/react-dialog';

// ----------------------------------------------------------------

interface IGroupLeaveOrDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialog?: boolean;
  handleDeleteGroup?: () => void;
  handleLeaveGroup?: () => void;
}

const GroupLeaveOrDeleteDialog: React.FC<IGroupLeaveOrDeleteDialogProps> = ({
  isOpen,
  setIsOpen,
  isDeleteDialog = false,
  handleDeleteGroup,
  handleLeaveGroup,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* <Dialog.Trigger asChild></Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-md data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[85vh] w-[450px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[30px] rounded-[10px] bg-white-100 p-[30px] focus:outline-none data-[state=open]:animate-contentShow dark:bg-black-900 lg:w-[520px] lg:rounded-2xl">
          <p className="p1-medium">
            {isDeleteDialog
              ? 'Are you sure you want to delete this group?'
              : 'Are you sure you want to leave from this group?'}
          </p>
          <div className="flex gap-2.5">
            <Button variant="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="warning"
              onClick={isDeleteDialog ? handleDeleteGroup : handleLeaveGroup}
            >
              {isDeleteDialog ? 'Delete Group' : 'Leave Group'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GroupLeaveOrDeleteDialog;
