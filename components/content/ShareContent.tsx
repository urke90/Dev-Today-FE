'use client';
import CloseIcon from '@/components/icons/CloseIcon';
import { style } from '@/styles';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { ShareSocial } from 'react-share-social';
import ShareIcon from '../icons/Share';

const ShareContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className="flex-center shadow-card transition-colors dark:bg-black-800 hover:dark:bg-black-700 bg-white-100 hover:bg-white-400/30 py-2 rounded gap-2 cursor-pointer">
          <ShareIcon className="dark:text-white-300 text-black-700" />
          <p className="p3-medium">Share with</p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="bg-white-100 dark:bg-black-900 py-[30px] px-3.5 gap-6 md:gap-[30px] flex flex-col md:py-9 md:px-10 data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[354px] -translate-x-1/2 -translate-y-1/2 focus:outline-none lg:w-[520px] rounded-[10px] lg:rounded-2xl">
          <div className="flex-between">
            <h1 className="h1-medium">Share with</h1>
            <Dialog.Close>
              <CloseIcon className="text-black-800 dark:text-white-200" />
            </Dialog.Close>
          </div>
          <ShareSocial
            url={url}
            socialTypes={['linkedin', 'whatsapp', 'telegram', 'facebook']}
            style={style}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShareContent;
