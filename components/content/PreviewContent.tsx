'use client';

import AudioPlayer from './AudioPlayer';
import HtmlParser from './HtmlParser';

import ArrowLeftIcon from '../icons/ArrowLeft';

import Image from 'next/image';

import type { IContent } from '@/lib/validation';
import { EContentType } from '@/types/content';

// ----------------------------------------------------------------

interface IPreviewContentProps {
  setIsPreviewMode: (value: boolean) => void;
  type: string;
  data: IContent;
}

type TagProps = {
  label: string;
};

const PreviewContent: React.FC<IPreviewContentProps> = ({
  setIsPreviewMode,
  type,
  data,
}) => {
  return (
    <section className="w-full space-y-5 px-2">
      <div className="flex gap-2" onClick={() => setIsPreviewMode(false)}>
        <ArrowLeftIcon className="text-black-800 dark:text-white-200" />
        <Image
          src="/assets/icons/view.svg"
          alt="Preview"
          width={20}
          height={20}
        />
        <h1 className="font-semibold !text-primary-500">Preview</h1>
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
            src={data?.coverImage || '/assets/images/post-example.svg'}
            alt="avatar"
            width={72}
            height={72}
            className="rounded-md"
          />
        )}
        <h2 className="d2-bold">{data.title}</h2>
      </div>
      <div>
        <ul className="flex gap-2">
          {data?.tags?.map((tag: TagProps) => (
            <li
              key={tag.label}
              className="cap-10 rounded-full bg-gray-100 px-2 py-1 uppercase dark:bg-black-700"
            >
              {tag.label}
            </li>
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
            <p className="p3-medium">{data?.meetupLocation}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default PreviewContent;
