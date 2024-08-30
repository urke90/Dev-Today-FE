'use client';

import AudioPlayer from './AudioPlayer';
import HtmlParser from './HtmlParser';

import ArrowLeftIcon from '../icons/ArrowLeft';
import BadgeItem from '../shared/BadgeItem';

import Image from 'next/image';

import type { IContent } from '@/lib/validation';
import { EContentType } from '@/types/content';

// ----------------------------------------------------------------

interface IPreviewContentProps {
  setIsPreviewMode: (value: boolean) => void;
  type: string;
  data: IContent;
}

const PreviewContent: React.FC<IPreviewContentProps> = ({
  setIsPreviewMode,
  type,
  data,
}) => {
  return (
    <section className="w-full space-y-5 px-2">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => setIsPreviewMode(false)}
      >
        <ArrowLeftIcon className="text-black-800 dark:text-white-200" />
        <Image
          src="/assets/icons/view.svg"
          alt="Preview"
          width={20}
          height={20}
          className="size-[20px]"
        />
        <h4 className="!text-primary-500 font-semibold">Preview</h4>
      </div>
      {type === EContentType.PODCAST && (
        <AudioPlayer
          audioSrc={data.podcastFile}
          coverImage={data.coverImage}
          title={data.title}
          audioTitle={data.podcastTitle}
        />
      )}
      {type !== EContentType.PODCAST && (
        <Image
          src={data?.coverImage || '/assets/icons/image-preview.svg'}
          alt="Preview"
          width={785}
          height={270}
          className="h-72 w-full rounded-lg object-cover"
        />
      )}
      <div className="flex max-w-3xl gap-2">
        {type === EContentType.MEETUP && (
          <Image
            src={data?.coverImage || '/assets/icons/image-preview.svg'}
            alt="avatar"
            width={72}
            height={72}
            className="size-[72px] rounded-md"
          />
        )}
        <h2 className="d2-bold">{data.title}</h2>
      </div>
      <div>
        <ul className="flex gap-2">
          {data?.tags?.map(({ label, value }) => (
            <BadgeItem key={value} title={value} />
          ))}
        </ul>
      </div>
      <div className="break-words">
        <HtmlParser data={data?.description} />
      </div>

      {type === EContentType.MEETUP && (
        <>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar-primary.svg"
              alt="Preview"
              width={20}
              height={20}
            />
            <p className="p3-medium">
              {new Date(data?.meetupDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/location-primary.svg"
              alt="Preview"
              width={20}
              height={20}
            />
            <p className="p3-medium">{data?.meetupLocation.address}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default PreviewContent;
