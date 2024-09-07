'use client';

import ImagePreviewIcon from '../icons/ImagePreview';
import ImageUploadIcon from '../icons/ImageUpload';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';

// ----------------------------------------------------------------

interface IRHFProfileImageUploadProps {
  name: string;
}

const RHFProfileImageUpload: React.FC<IRHFProfileImageUploadProps> = ({
  name,
}) => {
  const { control, getValues } = useFormContext();

  useWatch({ name });
  const image = getValues(name);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center gap-2.5">
              <div className="flex-center bg-white-100 dark:bg-black-800 size-[60px] shrink-0 rounded-full">
                {image ? (
                  <Image
                    src={image}
                    width={60}
                    height={60}
                    alt="Avatar image"
                    className="size-[60px] rounded-full"
                  />
                ) : (
                  <ImagePreviewIcon className="icon-light400__dark300" />
                )}
              </div>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESEST_NAME}
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
                      className="bg-white-100 dark:bg-black-800 flex h-11 w-auto items-center gap-2.5 rounded-[5px] px-5 py-3"
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
