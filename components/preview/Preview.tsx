'use client';

import Image from 'next/image';
import ParseHtml from '../ParseHtml/ParseHtml';
import { Button } from '../ui/button';

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
        <h1 className="!text-primary-500">Preview</h1>
      </div>
      <Image
        src="/assets/icons/coding.png"
        alt="Preview"
        width={785}
        height={270}
        className="w-full rounded-lg object-fill"
      />
      <div className="flex gap-2 max-w-3xl">
        <Image
          src="/assets/images/post-example.svg"
          alt="avatar"
          width={72}
          height={72}
          className="rounded-md"
        />
        <h2 className="d2-bold">
          Web Dev Showcase: Exploring the Future of Front-End Technologies
        </h2>
      </div>
      <div>
        <ul className="flex gap-2">
          <li className="dark:bg-black-700 bg-gray-100 rounded-full px-2 py-1 cap-10 uppercase ">
            React
          </li>
          <li className="dark:bg-black-700 bg-gray-100 rounded-full px-2 py-1 cap-10 uppercase ">
            React
          </li>
          <li className="dark:bg-black-700 bg-gray-100 rounded-full px-2 py-1 cap-10  uppercase">
            React
          </li>
        </ul>
      </div>
      <ParseHtml data={data.contentDescription} />
      <div className="flex gap-2">
        <Image
          src="/assets/icons/calendar-primary.svg"
          alt="Preview"
          width={20}
          height={20}
        />
        <p>June 20, 2021</p>
      </div>
      <div className="flex gap-2">
        <Image
          src="/assets/icons/location-primary.svg"
          alt="Preview"
          width={20}
          height={20}
        />
        <p>San Francisco, CA</p>
      </div>
      <div className="flex flex-row py-10 items-center p-4 bg-gray-100 dark:bg-black-800 rounded-lg shadow-md">
        <div className="flex items-center relative space-x-4 w-2/5">
          <Image
            src="/assets/images/post-example.svg"
            alt="avatar"
            width={150}
            height={150}
            className="z-10 dark:invert-0 invert rounded-lg"
          />
          <Image
            src="/assets/images/disk.png"
            alt="avatar"
            width={130}
            height={130}
            className="absolute top-1/2 animate-pulse left-[150px] transform -translate-x-1/2 -translate-y-1/2 dark:invert-0 invert"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Podcast Title
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Podcast Subtitle
            </p>
            <div className="w-full flex items-center gap-2 mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value="63"
                step="1"
                className="h-2 bg-gray-300 dark:bg-gray-700 w-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                00:00
              </span>
              <span className="text-white-400">|</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                63:37
              </span>
            </div>

            <Button
              type="button"
              className="inline-block mt-4 w-28 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Play/Pause
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Preview;
