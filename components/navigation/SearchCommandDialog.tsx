'use client';

import FrameIcon from '../icons/Frame';
import GroupsIcon from '../icons/Groups';
import SearchIcon from '../icons/Search';
import { Button } from '../ui/button';

import {
  Content,
  Overlay,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dialog';
import { Command } from 'cmdk';

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
        <Overlay className="fixed inset-0 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[346px] -translate-x-1/2 -translate-y-1/2 bg-white-100 focus:outline-none  data-[state=open]:animate-contentShow lg:w-[576px] ">
          <Command className="shadow-search-dialog border border-white-border dark:border-white-border">
            <div className="flex items-center justify-between gap-3 bg-white-100 px-3.5 py-4 dark:bg-black-800 lg:px-6">
              <div className="flex items-center gap-3">
                <SearchIcon className="icon-light400__dark300" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full bg-white-100 text-sm font-medium text-black-900 placeholder:text-sm placeholder:font-normal placeholder:text-white-400 focus-visible:outline-none dark:bg-black-800  dark:text-white-100 dark:placeholder:text-[#ADB3CC]"
                />
              </div>
              <kbd className="flex-center h-[24px] w-[32px] gap-2 rounded bg-white-200 text-[10px] text-white-400 dark:bg-black-700 dark:text-[#ADB3CC] max-lg:hidden">
                ESC
              </kbd>
            </div>
            <Command.List className="bg-white-200 px-1 py-2 text-black-700 dark:bg-black-900 dark:text-white-200 lg:p-2">
              <Command.Empty className="p3-regular flex gap-3 p-2.5 hover:rounded hover:bg-black-700 lg:px-4 lg:py-2.5">
                No results found.
              </Command.Empty>
              <Command.Item className="p3-regular flex gap-3 p-2.5 hover:rounded hover:bg-black-700 lg:px-4 lg:py-2.5">
                <FrameIcon className="icon-light400__dark300" /> Explore all
                posts
              </Command.Item>
              <Command.Item className="p3-regular flex gap-3 p-2.5 hover:rounded hover:bg-black-700 lg:px-4 lg:py-2.5">
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

export default SearchCommandDialog;
