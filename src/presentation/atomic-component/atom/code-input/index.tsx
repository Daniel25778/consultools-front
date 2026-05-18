import React, { useRef } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { LabelInput } from '../label-input';

type BaseProps = {
  length?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  autoFocus?: boolean;
};

type ControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  labelTop?: string;
  required?: boolean;
  disabled?: boolean;
  showMessage?: boolean;
  autoFocus?: boolean;
};

type StandaloneProps = {
  value?: string;
  onChange?: (v: string) => void;
  onBlur?: () => void;
};

type CodeInputProps<T extends FieldValues = FieldValues> = BaseProps &
  (ControllerProps<T> | StandaloneProps);

export const CodeInput = <T extends FieldValues = FieldValues>({
  length = 6,
  inputRef,
  className,
  ...props
}: CodeInputProps<T>) => {
  const refs = useRef<HTMLInputElement[]>([]);

  const focusIndex = (i: number) => {
    const el = refs.current[i];
    if (el) el.focus();
  };

  const renderBoxes = (
    value = '',
    onChange?: (v: string) => void,
    onBlur?: () => void,
    externalRef?: React.Ref<HTMLInputElement>
  ) => {
    const handleSet = (i: number, char: string) => {
      const chars = value.split('');
      chars[i] = char;
      const newVal = chars.slice(0, length).join('').padEnd(length, '');
      onChange?.(newVal);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const val = e.target.value || '';
      if (val.length > 1) {
        const pasted = val.slice(0, length - i);
        const chars = value.split('');
        for (let k = 0; k < pasted.length; k++) chars[i + k] = pasted[k];
        const newVal = chars.slice(0, length).join('').padEnd(length, '');
        onChange?.(newVal);
        const next = Math.min(i + pasted.length, length - 1);
        focusIndex(next);
        return;
      }

      const char = val;
      handleSet(i, char);
      if (char !== '') focusIndex(Math.min(i + 1, length - 1));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        const chars = value.split('');
        chars[i] = '';
        onChange?.(chars.slice(0, length).join('').padEnd(length, ''));
        focusIndex(Math.max(0, i - 1));
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, i: number) => {
      e.preventDefault();
      const paste = e.clipboardData.getData('text').replace(/\s+/g, '');
      const chars = value.split('');
      for (let k = 0; k < paste.length && i + k < length; k++) chars[i + k] = paste[k];
      const newVal = chars.slice(0, length).join('').padEnd(length, '');
      onChange?.(newVal);
    };

    const items: React.ReactNode[] = [];
    for (let i = 0; i < length; i++) {
      const ch = (value || '')[i] ?? '';
      items.push(
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el as HTMLInputElement;
            if (i === 0 && externalRef) {
              if (typeof externalRef === 'function') {
                (externalRef as (instance: HTMLInputElement | null) => void)(
                  el as HTMLInputElement
                );
              } else if (
                typeof externalRef === 'object' &&
                externalRef !== null &&
                'current' in externalRef
              ) {
                (externalRef as React.MutableRefObject<HTMLInputElement | null>).current =
                  el as HTMLInputElement;
              }
            }
          }}
          value={ch}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={(e) => handlePaste(e, i)}
          onBlur={onBlur}
          inputMode={'numeric'}
          maxLength={length}
          className={'w-full h-[50px] text-2xl text-center border rounded-md tablet:h-[60px]'}
          style={{ width: '100%', fontSize: 24 }}
        />
      );
    }

    return <div className={`flex gap-1 tablet:gap-3 ${className ?? ''}`}>{items}</div>;
  };

  const isControllerProps = (p: CodeInputProps<T>): p is ControllerProps<T> =>
    (p as ControllerProps<T>).control !== undefined && (p as ControllerProps<T>).name !== undefined;

  if (isControllerProps(props as CodeInputProps<T>)) {
    const { control, name, labelTop, required, disabled, showMessage } =
      props as ControllerProps<T>;

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <div className={'gap-2 w-full text-primary'}>
            <LabelInput
              disabled={disabled}
              error={!!error}
              inputRef={ref}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              labelTop={labelTop}
              required={required}
            >
              {renderBoxes(value ?? '', onChange, onBlur, ref)}
            </LabelInput>

            {error?.message && showMessage ? (
              <p className={'text-red-1'}>* {error.message}</p>
            ) : null}
          </div>
        )}
      />
    );
  }

  // fallback: standalone usage
  const standalone = props as StandaloneProps;
  return renderBoxes(standalone.value ?? '', standalone.onChange, standalone.onBlur, inputRef);
};
