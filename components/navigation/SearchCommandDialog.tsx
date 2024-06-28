'use client';

import { useState } from 'react';
import FrameIcon from '../icons/Frame';
import GroupsIcon from '../icons/Groups';
import SearchIcon from '../icons/Search';
import { Button } from '../ui/button';

import { fetchGroupsAndContents } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { Command } from 'cmdk';

interface ISearchDialogProps {}

// ----------------------------------------------------------------

const SearchCommandDialog: React.FC<ISearchDialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // useEffect(() => {
  //   const fetchGroupsAndContents = async () => {
  //     const response = await typedFetch({  })
  //   }
  // }, []);

  const { isLoading, data } = useQuery({
    queryKey: [EContentGroupQueries.FETCH_GROUPS_AND_CONTENTS, query],
    queryFn: () => fetchGroupsAndContents(query),
    enabled: query.trim() !== '' && isOpen,
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button className="nav-btn-light200__dark700 ">
          <SearchIcon className="icon-light400__dark300" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="bg-white-100 data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[346px] -translate-x-1/2 -translate-y-1/2  focus:outline-none lg:w-[576px] rounded-[5px]">
          <Command className="shadow-search-dialog border-white-border dark:border-white-border ">
            <div className="bg-white-100 dark:bg-black-800 flex items-center justify-between gap-3 px-3.5 py-4 lg:px-6">
              <div className="flex items-center gap-3">
                <SearchIcon className="icon-light400__dark300" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="bg-white-100 text-black-900 placeholder:text-white-400 dark:bg-black-800 dark:text-white-100 w-full text-sm font-medium placeholder:text-sm placeholder:font-normal  focus-visible:outline-none dark:placeholder:text-[#ADB3CC]"
                />
              </div>
              <kbd className="flex-center bg-white-200 text-white-400 dark:bg-black-700 h-[24px] w-[32px] gap-2 rounded text-[10px] max-lg:hidden dark:text-[#ADB3CC]">
                ESC
              </kbd>
            </div>
            <Command.List className="bg-white-200 text-black-700 dark:bg-black-900 dark:text-white-200 px-1 py-2 lg:p-2">
              <Command.Empty className="p3-regular hover:bg-black-700 flex gap-3 p-2.5 hover:rounded lg:px-4 lg:py-2.5">
                No results found.
              </Command.Empty>
              <Command.Item className="p3-regular hover:bg-black-700 flex gap-3 p-2.5 hover:rounded lg:px-4 lg:py-2.5">
                <FrameIcon className="icon-light400__dark300" /> Explore all
                posts
              </Command.Item>
              <Command.Item className="p3-regular hover:bg-black-700 flex gap-3 p-2.5 hover:rounded lg:px-4 lg:py-2.5">
                <GroupsIcon className="icon-light400__dark300" />
                ByteBuilders Collective
              </Command.Item>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchCommandDialog;
