import React from 'react';

import CreatableSelect from 'react-select/creatable';
// import createCache from '@emotion/cache';
// import { CacheProvider } from '@emotion/react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------

interface IRHFMultipleSelectProps {
  name: string;
  label?: string;
  description?: string;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

// const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
//   const cache = React.useMemo(
//     () =>
//       createCache({
//         key: 'with-tailwind',
//         insertionPoint: document.querySelector('title')!,
//       }),
//     []
//   );

//   return <CacheProvider value={cache}>{children}</CacheProvider>;
// };

// noOptionsMessage={() => 'No tags available!'}
//               onChange={(newValue) => {
//                 field.onChange(newValue);
//               }}

const RHFMultipleSelect: React.FC<IRHFMultipleSelectProps> = ({
  name,
  description,
  label,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <CreatableSelect
              isMulti
              isClearable
              options={options}
              onChange={(newValue) => {
                console.log('newValue', newValue);
                field.onChange(newValue);
              }}
              classNames={{
                control: () =>
                  // TODO Add different hover and focus effect since we will probably add the same to the Inputs
                  'bg-white-100 dark:bg-black-800 border !border-white-border dark:!border-[#393E4F66] px-3 h-[46px]',
                clearIndicator: () => '!hidden',
                dropdownIndicator: () => '!hidden',
                indicatorSeparator: () => '!hidden',
                placeholder: () => '!text-white-300 !text-sm !font-normal',
                input: () => '!p3-regular ',
                option: (state) =>
                  `bg-black-700 dark:text-white-300 ${
                    state.isFocused ? 'dark:!bg-black-700 !bg-white-300' : ''
                  }`,
                menuList: () => 'bg-white-100 dark:bg-black-800',
                multiValueLabel: () => 'dark:text-white-300 text-black-700',
                multiValueRemove: () => 'dark:!text-white-300 !text-black-700',
                multiValue: () =>
                  '!py-1 !bg-white-200 dark:!bg-black-700 !px-1.5 !text-white-400 dark:!text-white-100 !cap-8 md:!cap-10 !rounded-[20px] uppercase',
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFMultipleSelect;
