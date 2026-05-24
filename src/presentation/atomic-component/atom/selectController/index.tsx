import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Select, type SelectValues } from '../select';

interface SelectControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: SelectValues[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  isMultiple?: boolean;
  isLoading?: boolean;
  labelTop?: string;
  width?: number | string;
}

export const SelectController = <T extends FieldValues>({
  control,
  name,
  options,
  ...props
}: SelectControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const getValue = () => {
          if (props.isMultiple) {
            return options.filter((option) => (value as string[])?.includes(option.value));
          }
          return options.find((option) => option.value === value) ?? null;
        };

        return (
          <Select
            {...props}
            error={!!error}
            id={name}
            onChange={(newValue) => {
              const data = Array.isArray(newValue)
                ? newValue.map((item) => item.value)
                : (newValue?.value ?? null);
              onChange(data);
            }}
            options={options}
            value={getValue()}
          />
        );
      }}
    />
  );
};
