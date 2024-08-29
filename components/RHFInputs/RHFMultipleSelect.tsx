import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import type { FormatOptionLabelContext } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// ----------------------------------------------------------------

interface IRHFMultipleSelectProps {
  name: string;
  label?: string;
  description?: string;
  options?: {
    value: string;
    label: string;
  }[];
  defaultValue?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  hideDropDown?: boolean;
}

const RHFMultipleSelect: React.FC<IRHFMultipleSelectProps> = ({
  name,
  description,
  label,
  options,
  defaultValue,
  placeholder,
  hideDropDown,
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
              onChange={(newValue, actionMeta) => {
                if (actionMeta.option?.value === '') return;
                field.onChange(newValue);
              }}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  (e.target as HTMLInputElement).value === ''
                )
                  e.preventDefault();
              }}
              instanceId={field.name}
              placeholder={placeholder}
              defaultValue={defaultValue}
              classNames={{
                control: () =>
                  // TODO Add different hover and focus effect since we will probably add the same to the Inputs
                  'bg-white-100 dark:bg-black-800 border !border-white-border dark:!border-[#393E4F66] px-3 !min-h-[46px] !shadow-none',
                clearIndicator: () => '!hidden',
                dropdownIndicator: () => '!hidden',
                indicatorSeparator: () => '!hidden',
                placeholder: () => '!text-white-300 !text-sm !font-normal',
                input: () => '!p3-regular hover:outline-none',
                option: (state) =>
                  `bg-black-700 dark:text-white-300 ${
                    state.isFocused ? 'dark:!bg-black-700 !bg-white-300' : ''
                  } !cursor-pointer`,
                menuList: () => 'bg-white-100 dark:bg-black-800',
                multiValueLabel: () => 'dark:text-white-300 text-black-700',
                multiValueRemove: () =>
                  'dark:!text-white-300 !text-black-700 hover:!bg-inherit',
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

// TODO added this as temporary solution until i refactor MultipleSelect to be used in all components.
export const generateSelectStyles = () => {
  return {
    control: () =>
      // TODO Add different hover and focus effect since we will probably add the same to the Inputs
      'bg-white-100 dark:bg-black-800 border !border-white-border dark:!border-[#393E4F66] px-3 !min-h-[46px] !shadow-none',
    clearIndicator: () => '!hidden',
    dropdownIndicator: () => '!hidden',
    indicatorSeparator: () => '!hidden',
    placeholder: () =>
      'dark:placeholder:!text-white-400 placeholder:!text-white-400 !text-sm !font-medium',
    input: () => '!p3-regular hover:outline-none',
    option: (state: any) =>
      `bg-black-700 dark:text-white-300 ${
        state.isFocused ? 'dark:!bg-black-700 !bg-white-300' : ''
      }  ${state.isSelected ? '!bg-inherit' : ''} !cursor-pointer`,
    menuList: () => 'bg-white-100 dark:bg-black-800',
    multiValueLabel: () => 'dark:text-white-300 text-black-700',
    multiValueRemove: () =>
      'dark:!text-white-300 !text-black-700 hover:!bg-inherit',
    multiValue: () =>
      '!py-1 !bg-white-200 dark:!bg-black-700 !px-1.5 !text-white-400 dark:!text-white-100 !cap-8 md:!cap-10 !rounded-[20px] uppercase',
    singleValue: () => 'text-white-400 dark:text-white-100',
  };
};

export const MemberAdminFormatedOption = (
  option: { value: string; label: string },
  { context }: { context: FormatOptionLabelContext }
) => {
  if (context === 'value') {
    return (
      <div className="flex items-center gap-1">
        <div className="flex-center bg-white-100 size-[20px] rounded-full">
          <Image
            src={'/assets/images/avatars/avatar-2.svg'}
            alt={option.label}
            width={16}
            height={16}
          />
        </div>
        {option.label}
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <p className="p4-medium">{option.label}</p>
    </div>
  );
};

export default RHFMultipleSelect;
