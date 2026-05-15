import { DeleteOutlineOutlined } from '@mui/icons-material';
import { Button, CircularProgress, IconButton } from '@mui/material';
import type { useModalProps } from 'data/hooks';
import { useModal } from 'data/hooks';
import { useDelete } from 'data/use-case';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { type FC, type ReactNode, useState } from 'react';

interface DeleteConfirmationModalProps {
  text: ReactNode | string;
  title: string;
  id: number | string;
  route: unknown;
  modal?: useModalProps;
  queryName: string;
  successMessage: string;
  deleteText?: string;
  onClose?: () => void;
  onOpen?: () => void;
  afterDelete?: () => void;
  openElement?: ReactNode;
  hideOpenElement?: boolean;
  isPatch?: boolean;
  hideCancelButton?: boolean;
  color?: 'error' | 'primary' | 'secondary' | 'success';
}

export const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  text,
  id,
  title,
  route,
  onOpen,
  onClose,
  deleteText,
  modal,
  hideOpenElement,
  afterDelete,
  hideCancelButton,
  queryName,
  color = 'error',
  successMessage,
  openElement,
  isPatch,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { closeModal: close, openModal: open, isOpen } = useModal();

  const openModal = (): void => {
    if (onOpen) onOpen();

    if (modal) modal.openModal();
    else open();
  };

  const closeModal = (): void => {
    if (onClose) onClose();

    if (modal) modal.closeModal();
    else close();
  };

  const { handleDelete } = useDelete({
    afterDelete,
    closeModal,
    id,
    isLoading,
    isPatch,
    queryName,
    route,
    setIsLoading,
    successMessage,
  });

  return (
    <Modal
      closeModal={closeModal}
      isOpen={modal ? modal.isOpen : isOpen}
      openModal={openModal}
      openModalElement={
        hideOpenElement ? null : openElement ? (
          <div className={'flex flex-col'} onClick={openModal}>
            {openElement}
          </div>
        ) : (
          <IconButton onClick={openModal}>
            <DeleteOutlineOutlined color={'error'} fontSize={'small'} />
          </IconButton>
        )
      }
      size={'small'}
    >
      <div className={'w-full h-full flex flex-col gap-6'}>
        <h3 className={'text-xl font-semibold'}>{title}</h3>
        <p>{text}</p>

        <div
          className={
            'flex flex-col mt-3 tablet:flex-row gap-4 tablet:max-w-[65%] ml-auto w-full'
          }
        >
          {hideCancelButton ? null : (
            <Button
              className={'w-full'}
              color={'info'}
              disabled={isLoading}
              onClick={closeModal}
            >
              Cancelar
            </Button>
          )}

          <Button
            autoFocus
            className={'w-full'}
            color={color}
            onClick={handleDelete}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              deleteText || 'Remover'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
