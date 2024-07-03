import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/button';

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
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="bg-white-100 dark:bg-black-900 gap-[30px] flex flex-col p-[30px] data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[450px] -translate-x-1/2 -translate-y-1/2 focus:outline-none lg:w-[520px] rounded-[10px] lg:rounded-2xl">
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
