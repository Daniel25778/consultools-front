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
  query?: unknown;
}

export const SelectController = <T extends FieldValues>({
  control,
  name,
  options,
  query,
  ...props
}: SelectControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const getValue = () => {
          const currentOptions = options || [];
          if (props.isMultiple) {
            const valuesArray = Array.isArray(value) ? value : [];
          }
          return currentOptions.find((option) => option.value === value) ?? null;
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
            query={query}
          />
        );
      }}
    />
  );
};
