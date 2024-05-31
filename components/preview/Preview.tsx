'use client';

import Image from 'next/image';
import ParseHtml from '../ParseHtml/ParseHtml';
import AudioPlayer from '../audioPlayer/AudioPlayer';

type Props = {
  setIsPreview: (value: boolean) => void;
  type: string;
  data: any;
};

const Preview = ({ setIsPreview, type, data }: Props) => {
  console.log(data);
  return (
    <section className="space-y-5 w-full">
      <div className="flex gap-2" onClick={() => setIsPreview(false)}>
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="Preview"
          width={20}
          height={20}
          className="dark:invert-0 invert"
        />
        <Image
          src="/assets/icons/view.svg"
          alt="Preview"
          width={20}
          height={20}
        />
        <h1 className="!text-primary-500 font-semibold">Preview</h1>
      </div>
      {type === 'podcast' && (
        <AudioPlayer
          audioSrc={data?.podcastAudioFile || ''}
          coverImage={data?.coverImage || ''}
          title={data?.title || ''}
          audioTitle={data?.audioTitle || ''}
        />
      )}
      {type !== 'podcast' && (
        <Image
          src={data?.coverImage || '/assets/images/post-example.svg'}
          alt="Preview"
          width={785}
          height={270}
          className="rounded-lg h-72 object-cover"
        />
      )}
      <div className="flex gap-2 max-w-3xl">
        {type === 'meetup' && (
          <Image
            src={data?.profileImage || '/assets/images/post-example.svg'}
            alt="avatar"
            width={72}
            height={72}
            className="rounded-md"
          />
        )}
        <h2 className="d2-bold">{data?.title || 'Title'}</h2>
      </div>
      <div>
        <ul className="flex gap-2">
          <li className="dark:bg-black-700 bg-gray-100 rounded-full px-2 py-1 cap-10 uppercase">
            React
          </li>
          <li className="dark:bg-black-700 bg-gray-100 rounded-full px-2 py-1 cap-10 uppercase">
            React
          </li>
          <li className="dark:bg-black-700 bg-gray-100 rounded-full px-2 py-1 cap-10 uppercase">
            React
          </li>
        </ul>
      </div>
      <ParseHtml data={data?.description} />
      {type === 'meetup' && (
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

export default Preview;
