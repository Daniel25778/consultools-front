import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import type { ChangeEvent, ChangeEventHandler, FC } from 'react';
import { useEffect } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useIMask } from 'react-imask';

type MaskInputProps = TextFieldProps & {
  mask: string;
  register?: UseFormRegisterReturn;
  handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
};

export const MaskInput: FC<MaskInputProps> = ({
  mask,
  register,
  value,
  handleChange,
  ...props
}) => {
  const maskRef = useIMask({
    mask
  });

  useEffect(() => {
    maskRef.setValue(value ? String(value) : '');
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (props.onChange) props.onChange(event);
    else if (register?.onChange) register.onChange(event);

    if (handleChange) handleChange(event);
  };

  return (
    <TextField
      {...props}
      {...register}
      inputRef={maskRef.ref}
      onChange={handleInputChange}
      ref={register?.ref}
      type={'tel'}
    />
  );
};
