'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { ShareSocial } from 'react-share-social';

import CloseIcon from '@/components/icons/CloseIcon';

// ----------------------------------------------------------------

const style = {
  root: {
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: 'white',
  },
  iconContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'justify-between',
    width: '100%',
  },
  copyContainer: {
    border: '1px solid rgba(72, 72, 73, 0.4)',
    background: 'transparent',
    borderRadius: 7,
  },
  copyUrl: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#808191',
  },
  title: {
    color: 'aquamarine',
    fontStyle: 'italic',
  },
  copyIcon: {
    cursor: 'pointer',
    color: '#55597D',
  },
};

interface IShareOnSocialNetworkDialogProps {
  triggerBtn?: React.ReactNode;
  customUrl?: string;
}

const ShareOnSocialNetworkDialog: React.FC<
  IShareOnSocialNetworkDialogProps
> = ({ triggerBtn, customUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (customUrl) {
        setUrl(window.location.origin + customUrl);
        return;
      } else {
        setUrl(window.location.href);
      }
    }
  }, [customUrl]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{triggerBtn}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-md data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 flex max-h-[85vh] w-[354px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-[10px] bg-white-100 px-3.5 py-[30px] shadow-card focus:outline-none data-[state=open]:animate-contentShow dark:bg-black-900 md:gap-[30px] md:px-10 md:py-9 lg:w-[520px] lg:rounded-2xl"
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.preventDefault();
          }}
        >
          <div className="flex-between">
            <h1 className="h1-medium">Share with</h1>
            <Dialog.Close asChild>
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

export default ShareOnSocialNetworkDialog;
