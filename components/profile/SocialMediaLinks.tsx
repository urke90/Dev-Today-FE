import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

interface ISocialMediaLinksProps {
  linkedinLink: string | null;
  twitterLink: string | null;
  instagramLink: string | null;
}

const SocialMediaLinks: React.FC<ISocialMediaLinksProps> = ({
  instagramLink,
  linkedinLink,
  twitterLink,
}) => {
  return (
    <>
      {linkedinLink && (
        <Link href={linkedinLink}>
          <Image
            src="/assets/icons/social-media/linkedin.svg"
            width={20}
            height={20}
            alt="linkedin"
          />
        </Link>
      )}
      {twitterLink && (
        <Link href={twitterLink}>
          <Image
            src="/assets/icons/social-media/twitter.svg"
            width={20}
            height={20}
            alt="twitter"
          />
        </Link>
      )}
      {instagramLink && (
        <Link href={instagramLink}>
          <Image
            src="/assets/icons/social-media/instagram.svg"
            width={20}
            height={20}
            alt="instagram"
          />
        </Link>
      )}
    </>
  );
};

export default SocialMediaLinks;
