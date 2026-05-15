import type { LabelInputProps } from 'presentation/atomic-component/atom/label-input';
import { LabelInput } from 'presentation/atomic-component/atom/label-input';
import type { ReactElement } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type InputProps<T extends FieldValues> = LabelInputProps & {
  control: Control<T>;
  name: Path<T>;
  showMessage?: boolean;
  disabled?: boolean;
};

export const InputController = <T extends FieldValues>({
  control,
  name,
  disabled,
  showMessage,
  ...props
}: InputProps<T>): ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }): ReactElement => (
        <div className={'gap-2 w-full'}>
          <LabelInput
            disabled={disabled}
            error={!!error}
            inputRef={ref}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            {...props}
          />

          {error?.message && showMessage ? (
            <p className={'text-red-1'}>* {error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
};
