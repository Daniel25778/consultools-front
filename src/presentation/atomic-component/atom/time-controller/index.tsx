import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

dayjs.extend(customParseFormat);

interface TimePickerControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
}

export const TimePickerController = <T extends FieldValues>({
  control,
  name,
  label,
  required
}: TimePickerControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TimePicker
          label={label}
          value={value ? dayjs(value, 'HH:mm') : null}
          onChange={(newValue) => {
            onChange(newValue ? dayjs(newValue).format('HH:mm') : '');
          }}
          ampm={false}
          slotProps={{
            textField: {
              error: !!error,
              helperText: error?.message,
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
