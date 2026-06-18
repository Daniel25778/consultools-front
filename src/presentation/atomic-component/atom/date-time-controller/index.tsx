import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

dayjs.extend(customParseFormat);

interface DateTimePickerControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
}

export const DateTimePickerController = <T extends FieldValues>({
  control,
  name,
  label,
  required
}: DateTimePickerControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DateTimePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            onChange(newValue ? dayjs(newValue).format('YYYY-MM-DDTHH:mm') : '');
          }}
          ampm={false}
          slotProps={{
            textField: {
              error: !!error,
              required,
              fullWidth: true,
              size: 'small'
            }
          }}
        />
      )}
    />
  );
};
