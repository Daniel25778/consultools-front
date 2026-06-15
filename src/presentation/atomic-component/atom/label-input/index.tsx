import { ErrorOutline, WarningOutlined } from '@mui/icons-material';
import type { InputBaseComponentProps, TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import { MaskInput } from 'presentation/atomic-component/atom/mask-input';
import { colors } from 'presentation/style';
import type {
  ChangeEventHandler,
  ClipboardEvent,
  FC,
  FocusEventHandler,
  KeyboardEvent,
  ReactNode
} from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface LabelInputProps extends Pick<
  TextFieldProps,
  | 'defaultValue'
  | 'InputLabelProps'
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
  | 'value'
> {
  id?: string;
  register?: UseFormRegisterReturn;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  uppercase?: boolean;
  required?: boolean;
  labelTop?: string;
  autoComplete?: string;
  mask?: string;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  maxWidth?: number | string;
  children?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  EndIcon?: ReactNode;
  shrink?: boolean;
  StartIcon?: ReactNode;
  handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onFocusOut?: () => void;
}

export const LabelInput: FC<LabelInputProps> = ({
  register,
  label,
  children,
  maxLength,
  maxWidth,
  mask,
  handleChange,
  shrink,
  sx,
  autoComplete,
  required,
  labelTop,
  ...props
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (props.type === 'number')
      if (['e', 'E', '+', '-'].includes(event.key)) event.preventDefault();
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>): void => {
    if (props.type === 'number') {
      const clipboardData = event.clipboardData.getData('text');

      if (/[eE+-]/gu.test(clipboardData)) event.preventDefault();
    }
  };

  const getElement = (): ReactNode => {
    if (children) return children;

    const InputProps = {
      ...props.InputProps,
      autoComplete,
      endAdornment: ((): ReactNode => {
        if (props.EndIcon) return props.EndIcon;

        if (props.error && props.type !== 'number' && !props.disabled)
          return <ErrorOutline color={'error'} />;

        if (maxLength) {
          const length = (props.value as string)?.length || 0;

          return (
            <span
              style={{
                bottom: 4,
                color: length >= maxLength ? 'red' : colors.gray[500],
                fontSize: '0.75rem',
                pointerEvents: 'none',
                position: 'absolute',
                right: 16
              }}
            >
              {length}/{maxLength}
            </span>
          );
        }

        return null;
      })(),
      startAdornment: props.StartIcon ? props.StartIcon : null,
      style: maxLength ? { paddingBottom: '28px' } : undefined
    };

    const getPadding = (): string => {
      if (props.variant === 'filled' || props.variant === 'standard') return '14px 2px';

      if (props.multiline) return '3px';

      return '';
    };

    const inputProps: InputBaseComponentProps = {
      ...props.inputProps,
      maxLength,
      onKeyDown: handleKeyDown,
      onPaste: handlePaste,
      style: {
        padding: getPadding(),
        textTransform: props.uppercase ? 'uppercase' : 'none'
      }
    };

    if (mask)
      return (
        <MaskInput
          {...props}
          InputLabelProps={{ shrink }}
          InputProps={InputProps}
          error={props.error}
          handleChange={handleChange}
          inputProps={inputProps}
          label={
            label ? (
              <span>
                {label}
                {required ? <span className={'text-[#ff4747]'}> *</span> : ''}
              </span>
            ) : null
          }
          mask={mask}
          onBlur={props.onFocusOut}
          onFocus={props.onFocus}
          register={register}
          sx={{
            width: '100%',
            ...sx
          }}
          value={props.value}
        />
      );

    return (
      <TextField
        {...register}
        {...props}
        InputLabelProps={{ shrink }}
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
          if (props.onChange) props.onChange(event);
          else if (register?.onChange) register?.onChange(event);

          if (handleChange) handleChange(event);
        }}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        sx={{ width: '100%', ...sx }}
        type={props.type}
        value={props.value}
      />
    );
  };

  return (
    <div
      className={'flex flex-col gap-1 w-full text-start'}
      style={{
        maxWidth
      }}
    >
      {labelTop ? (
        <span>
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
