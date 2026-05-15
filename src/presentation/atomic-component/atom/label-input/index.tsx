import { ErrorOutline, WarningOutlined } from '@mui/icons-material';
import type { InputBaseComponentProps, TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import type {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  ReactNode,
} from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface LabelInputProps extends Pick<
  TextFieldProps,
  | 'defaultValue'
  | 'InputLabelProps'
  | 'inputMode'
  | 'InputProps'
  | 'inputProps'
  | 'inputRef'
  | 'label'
  | 'maxRows'
  | 'minRows'
  | 'multiline'
  | 'onBlur'
  | 'onChange'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'placeholder'
  | 'ref'
  | 'size'
  | 'sx'
> {
  id?: string;
  register?: UseFormRegisterReturn;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  uppercase?: boolean;
  required?: boolean;
  labelTop?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  maxWidth?: number | string;
  value?: string;
  children?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  EndIcon?: ReactNode;
  StartIcon?: ReactNode;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onFocus?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onFocusOut?: () => void;
}

export const LabelInput: FC<LabelInputProps> = ({
  register,
  label,
  children,
  maxWidth,
  handleChange,
  sx,
  autoComplete,
  required,
  labelTop,
  ...props
}) => {
  const getElement = (): ReactNode => {
    if (children) return children;

    const InputProps = {
      ...props.InputProps,
      autoComplete,
      endAdornment: props.EndIcon ? (
        props.EndIcon
      ) : props.error ? (
        <ErrorOutline color={'error'} />
      ) : null,
      startAdornment: props.StartIcon ? props.StartIcon : null,
    };

    const getPadding = (): string => {
      if (props.variant === 'filled' || props.variant === 'standard')
        return '14px 2px';

      if (props.multiline) return '3px';

      return '10px 0px';
    };

    const inputProps: InputBaseComponentProps = {
      ...props.inputProps,
      style: {
        padding: getPadding(),
        textTransform: props.uppercase ? 'uppercase' : 'none',
      },
    };

    return (
      <TextField
        {...register}
        {...props}
        // InputLabelProps={{ shrink: !!props.value }}
        InputProps={InputProps}
        disabled={props.disabled}
        error={props.error}
        inputProps={inputProps}
        label={
          label ? (
            <span>
              {label}
              {required ? <span className={'text-[#ff4747]'}> *</span> : ''}
            </span>
          ) : null
        }
        onBlur={props.onFocusOut}
        onChange={(event): void => {
          // if (props.type === 'number')
          //   Object.assign(event.target, { value: event.target.value.replace('.', ',') });

          if (props.onChange) props.onChange(event);
          else if (register?.onChange) register?.onChange(event);

          if (handleChange) handleChange(event);
        }}
        onFocus={props.onFocus}
        onKeyDown={(event): void => {
          if (props.onKeyDown) props.onKeyDown(event);

          if (props.inputMode === 'decimal') {
            const allowedKeys = [
              'Backspace',
              'Tab',
              'ArrowLeft',
              'ArrowRight',
              'Delete',
            ];
            const isNumber = /^[0-9]$/u.test(event.key);
            const isDotOrComma = event.key === '.' || event.key === ',';

            const currentValue = props?.value ?? '';

            const alreadyHasDot = currentValue.includes('.');
            const alreadyHasComma = currentValue.includes(',');

            if (!isNumber && !isDotOrComma && !allowedKeys.includes(event.key))
              event.preventDefault();

            if (
              (event.key === '.' || event.key === ',') &&
              (alreadyHasDot || alreadyHasComma)
            )
              event.preventDefault();
          }
        }}
        placeholder={props.placeholder}
        sx={{ width: '100%', ...sx }}
        type={props.type}
        value={props.value}
      />
    );
  };

  return (
    <div
      className={'flex flex-col gap-1 w-full text-start no-break'}
      style={{
        maxWidth,
      }}
    >
      {labelTop ? (
        <span
          className={`font-medium ${props.disabled ? 'text-gray-500' : ''}`}
        >
          {labelTop}
          {required ? <span className={'text-[#ff4747]'}> *</span> : ''}
        </span>
      ) : null}

      <div className={'flex w-full'}>{getElement()}</div>

      {props.error && props.errorMessage ? (
        <span className={'flex gap-1 mb-1 text-red'}>
          <WarningOutlined /> {props.errorMessage}
        </span>
      ) : null}
    </div>
  );
};
