import { FormControlLabel, Switch } from '@mui/material';
import type { ReactElement } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type SwitchOption = {
  label: string;
  value: string;
};

type SwitchControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: [SwitchOption, SwitchOption];
  disabled?: boolean;
  showMessage?: boolean;
};

export const SwitchController = <T extends FieldValues>({
  control,
  name,
  options,
  disabled,
  showMessage
}: SwitchControllerProps<T>): ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }): ReactElement => {
        const isChecked = value === options[1].value;

        const handleChange = (checked: boolean): void => {
          onChange(checked ? options[1].value : options[0].value);
        };

        return (
          <div className={'gap-1 min-w-min text-primary'}>
            <div className={'flex items-center gap-2'}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isChecked}
                    disabled={disabled}
                    onChange={(e) => handleChange(e.target.checked)}
                  />
                }
                label={''}
              />

              <span className={`font-medium mb-1 ${!isChecked ? 'text-gray-400' : 'text-primary'}`}>
                {isChecked ? options[1].label : options[0].label}
              </span>
            </div>

            {error?.message && showMessage ? (
              <p className={'text-red-1'}>* {error.message}</p>
            ) : null}
          </div>
        );
      }}
    />
  );
};
