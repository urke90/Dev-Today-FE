'use client';

import { useState } from 'react';
import CalendarIcon from '../icons/Calendar';
import FrameIcon from '../icons/Frame';
import GroupsIcon from '../icons/Groups';
import PodcastIcon from '../icons/Podcast';
import SearchIcon from '../icons/Search';
import { Button } from '../ui/button';

import { fetchGroupsAndContents } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import { EContentType } from '@/types/content';
import type { IGlobalSearchItem } from '@/types/group';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { Command } from 'cmdk';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import SearchDialogIcon from '../icons/SearchDialog';
import LoadingSpinner from '../shared/LoadingSpinner';

interface ISearchDialogProps {}

// ----------------------------------------------------------------

const renderItemIcon = (type: EContentType | null) => {
  switch (type) {
    case EContentType.POST:
      return <FrameIcon className="icon-light400__dark300 shrink-0" />;
    case EContentType.MEETUP:
      return <CalendarIcon className="icon-light400__dark300 shrink-0" />;
    case EContentType.PODCAST:
      return <PodcastIcon className="icon-light400__dark300 shrink-0" />;
    case null:
      return <GroupsIcon className="icon-light400__dark300 shrink-0" />;
    default:
      <FrameIcon className="icon-light400__dark300 shrink-0" />;
  }
};

const SearchCommandDialog: React.FC<ISearchDialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [q] = useDebounce(query, 300);

  const { isLoading, data } = useQuery<IGlobalSearchItem[]>({
    queryKey: [EContentGroupQueries.FETCH_GROUPS_AND_CONTENTS, q],
    queryFn: () => fetchGroupsAndContents(q),
    enabled: q.trim() !== '' && isOpen,
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button
          className={`nav-btn-light200__dark700 ${isOpen ? '!bg-primary-500' : ''}`}
        >
          <SearchIcon
            className={`icon-light400__dark300 ${isOpen ? '!text-[#F9F9FA]' : ''}`}
          />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="bg-white-100 data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[346px] -translate-x-1/2 -translate-y-1/2  focus:outline-none lg:w-[576px] rounded-[5px]">
          <Command className="shadow-search-dialog border-white-border dark:border-white-border ">
            <div className="bg-white-100 dark:bg-black-800 flex items-center justify-between gap-3 px-3.5 py-4 lg:px-6">
              <div className="flex items-center gap-3">
                <SearchDialogIcon className="icon-light400__dark300" />
                <Command.Input
                  onValueChange={(value) => setQuery(value)}
                  placeholder="Start typing to search..."
                  className="bg-white-100 text-black-900 placeholder:text-white-400 dark:bg-black-800 dark:text-white-100 w-full text-sm font-medium placeholder:text-sm placeholder:font-normal  focus-visible:outline-none dark:placeholder:text-[#ADB3CC]"
                />
              </div>
              <kbd className="flex-center bg-white-200 text-white-400 dark:bg-black-700 h-[24px] w-[32px] gap-2 rounded text-[10px] max-lg:hidden dark:text-[#ADB3CC]">
                ESC
              </kbd>
            </div>
            <Command.List className="bg-white-200 text-black-700 dark:bg-black-900 dark:text-white-200 px-1 py-2 lg:p-2 ">
              {isLoading && (
                <Command.Loading>
                  <LoadingSpinner />
                </Command.Loading>
              )}
              {!isLoading && (
                <Command.Empty className="p3-regular hover:bg-white-100 hover:dark:bg-black-700 flex gap-3 p-2.5 hover:rounded lg:px-4 lg:py-2.5 transition-colors">
                  {q.length > 0
                    ? 'No results found.'
                    : 'Enter at least one character to start searching.'}
                </Command.Empty>
              )}

              {data?.map(({ id, title, type }) => (
                <Command.Item
                  key={id}
                  value={title}
                  onSelect={() => setIsOpen(false)}
                >
                  <Link
                    href={type === null ? `/groups/${id}` : `/content/${id}`}
                    className="p3-regular hover:bg-white-100 hover:dark:bg-black-700 flex gap-3 p-2.5 hover:rounded lg:px-4 lg:py-2.5 line-clamp-1"
                  >
                    {renderItemIcon(type)}
                    {title}
                  </Link>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchCommandDialog;
