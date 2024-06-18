import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const RightSideBar = (props: Props) => {
  return (
    <aside className="p1-bold right-sidebar w-full">
      <div className="flex flex-col bg-light100__dark800 rounded-2xl items-center p-4 space-y-5">
        <Image
          src="/assets/images/post-example.svg"
          width={100}
          height={100}
          alt="post example"
          className="rounded-full"
        />
        <h2 className="d2-bold">JS Mastery</h2>
        <p className="p2-medium !text-white-400">@jsmastery</p>
        <Button className="dark:bg-black-900 text-purple-500 py-[10px] rounded ">
          Following
        </Button>
        <Link
          href="#"
          className="dark:bg-black-700 text-purple-500 p3-bold py-[10px] rounded  w-full text-center">
          Visit Profile
        </Link>
        <p className="p2-regular">joined 6 months ago</p>
      </div>
      <div className="right-sidebar bg-light100__dark800 p-5 rounded-2xl">
        <div className="flex gap-2 items-center">
          <h3>More from JS Mastery</h3>
          <ArrowRight size={20} />
        </div>
        <div>
          <Link href="" className="flex ">
            <div className="flex gap-3.5">
              <Image
                src={'/assets/images/no-image.svg'}
                alt="post"
                width={58}
                height={58}
                className="rounded bg-primary-100 dark:bg-primary-500"
              />
              <div className="flex flex-col gap-[6px]">
                <p className="p4-medium">
                  Showcase Saturday - Unveiling Innovation
                </p>
                <p className="subtitle-normal">by Santino More</p>
              </div>
            </div>
            <ArrowRightIcon className="text-white-400 shrink-0" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
