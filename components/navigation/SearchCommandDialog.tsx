'use client';

import { Command } from 'cmdk';
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
} from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import FrameIcon from '../icons/Frame';
import SearchIcon from '../icons/Search';
import GroupsIcon from '../icons/Groups';

interface ISearchDialogProps {}

// ----------------------------------------------------------------

const SearchCommandDialog: React.FC<ISearchDialogProps> = (props) => {
  return (
    <Root>
      <Trigger asChild>
        <Button className="nav-btn-light200__dark700 ">
          <SearchIcon className="icon-light400__dark300" />
        </Button>
      </Trigger>
      <Portal>
        <Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm" />
        <Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[346px] lg:w-[576px] translate-x-[-50%] translate-y-[-50%]  focus:outline-none bg-white-100 ">
          <Command className="border border-[#C5D0E666] dark:border-[#393E4F66] shadow-search-dialog">
            <div className="flex items-center justify-between gap-3 lg:px-6 bg-white-100 dark:bg-black-800 px-3.5 py-4">
              <div className="flex items-center gap-3">
                <SearchIcon className="icon-light400__dark300" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full focus-visible:outline-none dark:placeholder:text-[#ADB3CC] placeholder:text-white-400 placeholder:font-normal placeholder:text-sm dark:text-white-100 text-black-900 text-sm font-medium  bg-white-100 dark:bg-black-800"
                />
              </div>
              <kbd className="max-lg:hidden bg-white-200 dark:bg-black-700 rounded gap-2 w-[32px] h-[24px] text-[10px] flex-center text-white-400 dark:text-[#ADB3CC]">
                ESC
              </kbd>
            </div>
            <Command.List className="py-2 px-1 lg:p-2 dark:bg-black-900 bg-white-200 text-black-700 dark:text-white-200">
              <Command.Empty className="p3-regular lg:py-2.5 lg:px-4 flex p-2.5 gap-3 hover:bg-black-700 hover:rounded">
                No results found.
              </Command.Empty>
              <Command.Item className="p3-regular lg:py-2.5 lg:px-4 flex p-2.5 gap-3 hover:bg-black-700 hover:rounded">
                <FrameIcon className="icon-light400__dark300" /> Explore all
                posts
              </Command.Item>
              <Command.Item className="p3-regular lg:py-2.5 lg:px-4 flex p-2.5 gap-3 hover:bg-black-700 hover:rounded">
                <GroupsIcon className="icon-light400__dark300" />
                ByteBuilders Collective
              </Command.Item>
            </Command.List>
          </Command>
        </Content>
      </Portal>
    </Root>
  );
};
// border border-[#C5D0E666] dark:border-[#393E4F66]

// const SearchMenuDialog: React.FC<ISearchDialogProps> = (props) => {
//   return (
//     <Root>
//       <Trigger asChild>
//         <Button className="nav-button-white-200__dark-black-700">
//           <SearchIcon className="icon-light400__dark300" />
//         </Button>
//       </Trigger>
//       <Portal>
//         <Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
//         <Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[346px] lg:w-[576px] translate-x-[-50%] translate-y-[-50%] border border-[#C5D0E666] dark:border-[#393E4F66] focus:outline-none bg-white-100 shadow-search-dialog">
//           <div className="flex items-center gap-3 bg-white-100 dark:bg-black-800">
//             <SearchIcon className="icon-light400__dark300" />
//             <Input
//               placeholder="Type a command or search..."
//               type="text"
//               className="rounded-none border-none	"
//             />
//           </div>
//           <ul className="bg-white-200 dark:bg-black-900">
//             <li></li>
//           </ul>
//         </Content>
//       </Portal>
//     </Root>
//   );
// };

// ? border for content

export default SearchCommandDialog;
