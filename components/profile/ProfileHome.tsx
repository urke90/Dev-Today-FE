import Image from 'next/image';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

interface IProfileHomeProps {}

const ProfileHome: React.FC<IProfileHomeProps> = (props) => {
  return (
    <div className="relative m-auto top-[94px] lg:top-[100px] flex flex-col sm:flex-row border">
      <aside className="left-sidebar bg-light100__dark800 text-center">
        <div className="relative h-[106px] lg:h-[83px] profile-background rounded-t-2xl">
          <Image
            fill
            src="/assets/images/profile-background.svg"
            alt="profile bacground"
            objectFit="cover"
          />
        </div>
        <Image
          src="/assets/images/no-image.svg"
          width={110}
          height={110}
          alt="profile"
          className="ring-4 ring-primary-500 rounded-full m-auto relative z-10 -top-10"
        />
        <h1 className="h1-medium">JS Mastery</h1>
        <p className="p3-regular">@jsmastery</p>
      </aside>
      <main className="flex flex-1">MAIN</main>
      <aside className="right-sidebar bg-light100__dark800">
        RIGHT SIDEBAR
      </aside>
    </div>
  );
};

export default ProfileHome;
