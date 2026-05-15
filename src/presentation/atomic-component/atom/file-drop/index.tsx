import { UploadFile } from '@mui/icons-material';
import { colors } from 'presentation/style';
import type { ChangeEvent, DragEvent, FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

interface FileDropProps {
  isMultiple?: boolean;
  subtitle?: ReactNode | string;
  accept?: string[];
  onChange: (newValue: File[]) => void;
  max?: number;
  hasError: boolean;
}

export const FileDrop: FC<FileDropProps> = ({
  onChange,
  subtitle,
  accept,
  isMultiple,
  max,
  hasError
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleChange = (
    dropEvent?: DragEvent<HTMLDivElement>,
    changeEvent?: ChangeEvent<HTMLInputElement>
  ): void => {
    const newFiles = [];

    if (dropEvent) {
      if (dropEvent.dataTransfer?.files) newFiles.push(...dropEvent.dataTransfer.files);
    } else if (changeEvent)
      if (changeEvent.target?.files) newFiles.push(...changeEvent.target.files);

    const acceptedFiles = accept
      ? newFiles.filter(
          (file) =>
            accept.includes(file.type) ||
            (file.type.startsWith('image/') && accept.includes('image/*'))
        )
      : newFiles;

    setIsDragging(false);
    onChange(acceptedFiles);

    if (changeEvent) changeEvent.target.value = '';
  };

  const onDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    handleChange(event, undefined);
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    handleChange(undefined, event);
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) setIsDragging(false);
  };

  return (
    <div
      className={`border-2 border-[#00000040] gap-6 border-dashed flex justify-between text-gray-600 hover:border-primary hover:text-primary
        flex-col tablet:flex-row items-center p-6 rounded-md cursor-pointer
        dark:border-gray-300 dark:text-gray-300 dark:hover:border-primary dark:hover:text-primary 
        ${hasError && 'border-red text-red hover:border-[#d15151] hover:text-[#d15151]'}
        `}
      onClick={(): void => {
        inputRef.current?.click();
      }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      style={{
        backgroundColor: isDragging ? colors.gray[150] : undefined,
        borderColor: isDragging ? colors.blue.semiLight : undefined
      }}
    >
      <UploadFile color={'inherit'} sx={{ fontSize: 42 }} />

      <div className={'w-full text-center tablet:text-left'}>
        <h2>Selecione os arquivos</h2>
        <p className={'text-sm text-gray-550'}>{subtitle}</p>
      </div>
      <input
        accept={accept?.join(',')}
        className={'hidden'}
        multiple={isMultiple}
        max={max}
        onChange={onChangeInput}
        ref={inputRef}
        type={'file'}
      />
    </div>
  );
};
