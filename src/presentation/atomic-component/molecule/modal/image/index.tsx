import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useModal } from 'data/hooks';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useEffect, type FC, type ReactNode } from 'react';

interface ImageModalProps {
  index: number | null;
  imageList: string[];
  openModalElement?: ReactNode;
  className?: string;
  onClose: () => void;
  updateIndex: (newIndex: number) => void;
}

export const ImageModal: FC<ImageModalProps> = ({
  className,
  imageList,
  index,
  openModalElement,
  onClose,
  updateIndex
}) => {
  const { closeModal: close, isOpen, openModal } = useModal();

  const closeModal = () => {
    onClose();
    close();
  };

  useEffect(() => {
    if (index !== null) openModal();
  }, [index, openModal]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (index === null) return;

      if (e.key === 'ArrowRight') {
        updateIndex((index + 1) % imageList.length);
      }

      if (e.key === 'ArrowLeft') {
        updateIndex((index - 1 + imageList.length) % imageList.length);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [index, imageList?.length, updateIndex]);

  if (index === null) return null;

  const url = imageList?.[index];

  return (
    <Modal
      closeModal={closeModal}
      hideBackground
      hideCloseButton
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        openModalElement !== undefined ? (
          openModalElement
        ) : (
          <img
            alt={url}
            className={className}
            onClick={openModal}
            src={url ?? ''}
            style={{ cursor: 'pointer' }}
          />
        )
      }
      size={'medium'}
    >
      <div className={'flex flex-col relative'}>
        <span
          onClick={() => updateIndex((index + 1) % imageList.length)}
          className={
            'right-3 bg-gray-350/70 hover:bg-gray-400/50 absolute top-1/2 rounded-full cursor-pointer p-1.5'
          }
        >
          <NavigateNext />
        </span>

        <img alt={url} className={'bg-white max-h-[80vh]'} src={url ?? ''} />

        <span
          onClick={() => updateIndex((index - 1 + imageList.length) % imageList.length)}
          className={
            'left-3 bg-gray-350/70 hover:bg-gray-400/50 absolute top-1/2 rounded-full cursor-pointer p-1.5'
          }
        >
          <NavigateBefore />
        </span>
      </div>
    </Modal>
  );
};
