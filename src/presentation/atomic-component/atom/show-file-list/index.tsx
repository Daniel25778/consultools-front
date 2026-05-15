import {
  Close,
  Description,
  Difference,
  PermMedia,
  PictureAsPdf,
  TextSnippet,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ShowFileListProps {
  fileList: File[] | string[];
  onDelete?: (index: number) => void;
  className?: string;
}

export const ShowFileList: FC<ShowFileListProps> = ({
  fileList,
  className,
  onDelete,
}) => {
  const openFile = (file: File): void => {
    const fileURL = URL.createObjectURL(file);

    window.open(fileURL, '_blank');
  };

  const getFileIcon = (file: File | string): ReactNode => {
    if (typeof file === 'string') {
      if (file.endsWith('.pdf'))
        return <PictureAsPdf style={{ fontSize: 30 }} />;

      if (file.endsWith('.xlsx') || file.endsWith('.xls'))
        return <Difference style={{ fontSize: 30 }} />;

      if (file.endsWith('.docx') || file.endsWith('.doc'))
        return <Difference style={{ fontSize: 30 }} />;

      if (file.endsWith('.pptx') || file.endsWith('.ppt'))
        return <PermMedia style={{ fontSize: 30 }} />;

      if (file.endsWith('.txt'))
        return <TextSnippet style={{ fontSize: 30 }} />;

      return (
        <img alt={'file'} className={'h-[30px] object-contain'} src={file} />
      );
    }

    const fileType = file.type;

    if (fileType.includes('image'))
      return (
        <img
          alt={'file'}
          className={'h-[30px] object-contain'}
          src={URL.createObjectURL(file)}
        />
      );

    if (fileType.includes('pdf'))
      return <PictureAsPdf style={{ fontSize: 30 }} />;

    return <Description style={{ fontSize: 30 }} />;
  };

  if (fileList?.length) {
    if (typeof fileList[0] === 'string')
      return (
        <div className={'file-list mt-4 flex flex-col gap-2'}>
          <h3>Arquivos enviados:</h3>

          <ul className={`w-full flex flex-col gap-1 ${className}`}>
            {(fileList as string[]).map((file, index) => (
              <Link
                key={index}
                className={
                  'border p-1 px-3 text-blue-semiLight cursor-pointer underline underline-offset-1 rounded-md flex gap-4 items-center hover:bg-gray-150'
                }
                target={'_blank'}
                to={file}
              >
                {getFileIcon(file)}

                <span className={'truncate'}>
                  Arquivo {index + 1}.
                  {String(file).split('.')[String(file).split('.').length - 1]}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      );

    return (
      <div className={'file-list mt-4 flex flex-col gap-2'}>
        <h3>Arquivos selecionados:</h3>

        <ul className={`w-full flex flex-col gap-1 ${className}`}>
          {Array.from(fileList as File[]).map((file, index) => (
            <li
              key={index}
              className={
                'border p-1 px-3 text-blue-semiLight cursor-pointer underline underline-offset-1 rounded-md flex justify-between items-center hover:bg-gray-150'
              }
              onClick={(): void => {
                openFile(file);
              }}
            >
              <div className={'flex gap-4 items-center truncate'}>
                {getFileIcon(file)}
                <span>{file.name}</span>
              </div>

              {onDelete ? (
                <IconButton
                  color={'error'}
                  onClick={(event): void => {
                    event.stopPropagation();
                    onDelete(index);
                  }}
                  sx={{ padding: '4px' }}
                >
                  <Close />
                </IconButton>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};
