('');

import ImagePreviewIcon from '../icons/ImagePreview';
import ImageUploadIcon from '../icons/ImageUpload';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

import { CldUploadWidget, getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { CLOUDINARY_URL } from '@/constants';

// ----------------------------------------------------------------

interface IRHFProfileImageUploadProps {
  name: string;
  // image: string;
}

const RHFProfileImageUpload: React.FC<IRHFProfileImageUploadProps> = ({
  name,
  // image,
}) => {
  const { control, getValues } = useFormContext();

  let image = getValues(name);

  if (image?.startsWith(CLOUDINARY_URL)) {
    image = getCldImageUrl({
      src: image,
      width: 60,
      height: 60,
      crop: 'fill',
    });
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center gap-2.5">
              <div className="flex-center size-[60px] shrink-0 rounded-full bg-white-100 dark:bg-black-800">
                {image ? (
                  <Image
                    src={image}
                    width={60}
                    height={60}
                    className="size-[60px] rounded-full"
                    alt="Avatar image"
                  />
                ) : (
                  <ImagePreviewIcon className="icon-light400__dark300" />
                )}
              </div>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESEST_NAME}
                // onSuccess={handleUploadImage}
                onSuccess={(res) => {
                  if (res.info && typeof res.info === 'object') {
                    field.onChange(res.info.secure_url);
                  } else {
                    field.onChange(res.info);
                  }
                }}
                options={{
                  multiple: false,
                  cropping: true,
                  croppingShowDimensions: true,
                }}
              >
                {({ open }) => {
                  return (
                    <Button
                      onClick={() => open()}
                      type="button"
                      className="flex h-11 w-auto items-center gap-2.5 rounded-[5px] bg-white-100 px-5 py-3 dark:bg-black-800"
                    >
                      <ImageUploadIcon className="icon-light400__dark300" />
                      <span className="p3-regular">Set a profile photo</span>
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFProfileImageUpload;
